import TextareaAutosize from "react-textarea-autosize";

const TextArea = () => {
  return (
    <div>
      <TextareaAutosize className=" resize-none border-none w-full text-md focus:outline-none py-2 px-4 bg-inputLightBG rounded-md" maxLength={1080}   autoFocus  />
    </div>
  );
};

export default TextArea;
