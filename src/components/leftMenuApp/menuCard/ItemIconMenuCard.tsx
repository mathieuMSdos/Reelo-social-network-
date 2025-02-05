import GenericIcon from '../../UI/lordIcons/GenericIcon';
import Link from 'next/link';

interface ItemIconMenuCardProps {
  href: string;
  icon: unknown;
  text: string;
  size: number;
  isHovered: boolean;
  onHover: () => void;
}

const ItemIconMenuCard = ({ href, icon, text, size, isHovered, onHover }: ItemIconMenuCardProps) => {
  return (
    <div 
      className="h-10 w-full" 
      onMouseEnter={onHover}
    >
      <Link
        className={`w-full h-full flex justify-start items-center text-textGrey font-semibold gap-1.5 px-4 rounded-lg z-10 relative ${isHovered ? "text-darkPurpleBtn" : "text-textGrey"}`}
        href={href}
      >
        <GenericIcon 
          icon={icon} 
          colorize={isHovered ? "var(--darkPurpleBtn)" : "var(--textGrey)"} 
          size={size} 
        />
        <p>
          {text}
        </p>
      </Link>
    </div>
  );
};

export default ItemIconMenuCard;
