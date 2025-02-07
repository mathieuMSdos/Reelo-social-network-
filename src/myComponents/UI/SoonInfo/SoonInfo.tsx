interface SoonInfoPropsType {
  className?: string;
}

const SoonInfo = ({ className }: SoonInfoPropsType) => {
  return (
    <div className={`w-fit py-1 px-2 border rounded-lg whitespace-nowrap bg-gradient-to-r from-pink-500 to-darkPurpleBtn ${className}`}>
      <p className="text-greyPurple font-semibold text-[9px] ">Soon</p>
    </div>
  );
};

export default SoonInfo;
