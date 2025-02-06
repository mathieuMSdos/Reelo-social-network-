import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import GenericIcon from "../../UI/lordIcons/GenericIcon";
import SoonInfo from "../../UI/SoonInfo/SoonInfo";

interface ItemIconMenuCardProps {
  href: string;
  icon: unknown;
  text: string;
  size: number;
  enableSoon: boolean;
  isHovered: boolean;
  onHover: () => void;
}

const ItemIconMenuCard = ({
  href,
  icon,
  text,
  size,
  enableSoon,
  isHovered,
  onHover,
}: ItemIconMenuCardProps) => {
  // afficher le lien actif :
  const pathname = usePathname();
  console.log(pathname)

  const isActiveMemo = useMemo(() => href === pathname, [href, pathname]);

  return (
    <div className="h-10 w-full " onMouseEnter={onHover}>
      {!enableSoon ? (
        <>
          <Link
            className={`w-full h-full flex justify-start items-center text-textGrey font-semibold gap-1.5 px-4 rounded-lg z-10 relative`}
            href={href}
          >
            <GenericIcon
              icon={icon}
              colorize={
                isHovered || isActiveMemo
                  ? "var(--darkPurpleBtn)"
                  : "var(--textGrey)"
              }
              size={size}
            />
            <div className="flex justify-between items-center gap-1">
              <p
                className={
                  isHovered || isActiveMemo
                    ? "text-darkPurpleBtn"
                    : "text-textGrey"
                }
              >
                {text}
              </p>{" "}
            </div>
          </Link>
        </>
      ) : (
        <>
          <div
            className={`w-full h-full flex justify-start items-center text-textGrey font-semibold gap-1.5 px-4 rounded-lg z-10 relative`}
          >
            <GenericIcon
              icon={icon}
              colorize={isHovered ? "var(--darkPurpleBtn)" : "var(--textGrey)"}
              size={size}
            />
            <div className="flex justify-between items-center gap-1">
              <p>{text}</p>
              {/* soon info label */}
              <SoonInfo className="rotate-6 opacity-80" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemIconMenuCard;
