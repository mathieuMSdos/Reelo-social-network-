"use client";

import { searchUserDropDownMenu } from "@/app/actions/searchUserRightMenu.action";
import loadingIconLord from "@/src/assets/icons/system-solid-716-spinner-three-dots-hover-trapdoor.json";
import GenericIcon from "@/src/components/UI/lordIcons/GenericIcon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import InputGeneric from "../../../UI/inputGeneric/InputGeneric";
import BentoContainer from "../../../bentoContainer/BentoContainer";

const InputSearchPorfil = () => {
  const [inputValue, setInputValue] = useState("");

  // TANSTACK - requête pour récupérer résultat de recherche d'utilisateur

  // Debouncing pattern : on vérifie en direct si l'username choisi existe déjà mais on met un système de debounce pour pas surcharger le server en requête + on utilise tanstack aussi pour limiter les requêtes BDD.
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
      <BentoContainer className=" w-full p-4 flex flex-col justify-center items-center gap-4 ">
        <InputGeneric
          className="text-textGrey w-full"
          type="text"
          showSearchIcon
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        {/* afficher les résultats seulement si une recherche est effecuté */}
        
        {isFetching ? (
          <div className="w-full h-auto flex flex-col justify-center items-center gap-3 rounded-lg ">
            <GenericIcon icon={loadingIconLord} size={18} />
          </div>
        ) : (
          data && (
            <>
              {data.length > 0 ? (
                <div className="w-full h-auto flex flex-col gap-3 rounded-lg">
                  <h3 className="text-darkLine font-bold">Results</h3>
                  <ul className="w-full flex flex-col ">
                    {data.map((item) => (
                      <li
                        className="w-full hover:bg-greyPurple hover:px-3 py-2 rounded-lg cursor-pointer transition-all duration-150"
                        key={item.username}
                      >
                        <div className="flex gap-2">
                          <Image
                            className="rounded-full"
                            src={
                              item.image || "/default_avatar/default_avatar.png"
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
                </div>
              ) : (
                <p className=" text-textGrey text-center">No result</p>
              )}
            </>
          )
        )}
      </BentoContainer>
    </>
  );
};

export default InputSearchPorfil;
