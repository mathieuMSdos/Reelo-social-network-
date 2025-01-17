import BentoContainer from "../../bentoContainer/BentoContainer";

const PostItem = ({post}) => {


  return (
    <BentoContainer className="w-full">
      {/* post header */}
      <div>{post.content}</div>
    </BentoContainer>
  );
};

export default PostItem;
