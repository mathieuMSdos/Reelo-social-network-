"use client";

import { searchUserDropDownMenu } from "@/app/actions/searchUserRightMenu.action";
import loadingIconLord from "@/src/assets/icons/system-solid-716-spinner-three-dots-hover-trapdoor.json";
import GenericIcon from "@/src/components/UI/lordIcons/GenericIcon";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import InputGeneric from "../../../UI/inputGeneric/InputGeneric";
import BentoContainer from "../../../bentoContainer/BentoContainer";

const InputSearchProfil = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue] = useDebounce(inputValue, 500);

  const { data, isFetching, error } = useQuery({
    queryKey: ["searchUser", debouncedValue],
    queryFn: () => searchUserDropDownMenu(debouncedValue),
    enabled: debouncedValue.length > 0,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

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
                            <li
                              className="w-full hover:bg-greyPurple hover:px-3 py-2 rounded-lg cursor-pointer transition-all duration-150"
                              key={item.username}
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
