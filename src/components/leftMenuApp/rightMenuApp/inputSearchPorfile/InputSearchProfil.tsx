"use client";

import { searchEngineUsersAction } from "@/app/actions/searchEngineUser/searchEngineUsers.action";
import { searchUserInfoProfileAction } from "@/app/actions/searchEngineUser/searchUserInfoProfile.action";
import { useStore } from "@/lib/store/index.store";
import loadingIconLord from "@/src/assets/icons/system-solid-716-spinner-three-dots-hover-trapdoor.json";
import GenericIcon from "@/src/components/UI/lordIcons/GenericIcon";
import { UserPublicDataType } from "@/src/types/user.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import InputGeneric from "../../../UI/inputGeneric/InputGeneric";
import BentoContainer from "../../../bentoContainer/BentoContainer";

const InputSearchProfil = () => {
  // TANSTACK init
  const queryClient = useQueryClient();

  // ZUSTAND store
  const userId = useStore((state) => state.userId);
  // State local
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue] = useDebounce(inputValue, 500);

  // TANSTACK Moteur de recherche d'utilisateur
  const { data, isFetching, error } = useQuery({
    queryKey: ["searchUser", debouncedValue],
    queryFn: () => searchEngineUsersAction(debouncedValue, userId),
    enabled: debouncedValue.length > 0,
  });


  //PREFETCH des données du profil à consulté pour limité le temps de chargement quand on consulte la page profil
  const handleResultClick = (data: UserPublicDataType) => {
    queryClient.prefetchQuery({
      queryKey: ["userProfile", data.username],
      queryFn: () => searchUserInfoProfileAction(userId, data.id),
    });
  };

  return (
    <>
      <BentoContainer className="w-full p-4 flex flex-col justify-center items-center gap-4 transition-all duration-150">
        <InputGeneric
          className="text-textGrey w-full"
          type="text"
          showSearchIcon={true}
          showDeleteIcon={true}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          setInputValue={setInputValue}
        />
        <AnimatePresence mode="wait">
          {(isFetching || data) && (
            <motion.div
              key={isFetching ? "loading" : "data"}
              className="w-full h-auto flex flex-col gap-3 rounded-lg overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                  opacity: { duration: 0.25 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.15 },
                  opacity: { duration: 0.2 },
                },
              }}
            >
              {isFetching ? (
                <div className="w-full flex justify-center items-center">
                  <GenericIcon icon={loadingIconLord} size={18} />
                </div>
              ) : (
                data && (
                  <>
                    {data.length > 0 ? (
                      <>
                        <h3 className="text-darkLine font-bold">Results</h3>
                        <ul className="w-full flex flex-col">
                          {data.map((item) => (
                            <Link
                              key={item.username}
                              href={`/protected/${item.username}`}
                            >
                              <li
                                className="w-full hover:bg-greyPurple py-2 px-2 rounded-lg cursor-pointer transition-all duration-150"
                                onClick={() => handleResultClick(item)}
                              >
                                <div className="flex gap-2">
                                  <Image
                                    className="rounded-full"
                                    src={
                                      item.image ||
                                      "/default_avatar/default_avatar.png"
                                    }
                                    width={38}
                                    height={38}
                                    alt="profil-picture"
                                  />
                                  <div className="hidden md:flex justify-center flex-col">
                                    <p className="text-sm font-bold">
                                      {item.displayName}
                                    </p>
                                    <p className="text-xs text-textGrey">
                                      {item.username}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            </Link>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="text-textGrey text-center">No result</p>
                    )}
                  </>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </BentoContainer>
    </>
  );
};

export default InputSearchProfil;
