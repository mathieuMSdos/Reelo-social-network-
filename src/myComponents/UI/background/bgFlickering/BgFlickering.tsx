const BgFlickering = () => {
  return (
    <div>
      {/* BGflickering */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pattern-background"></div>
      {/* overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(
            to top,
            #FAFAFA 30%,
            transparent 70%,

          )`,
        }}
      ></div>
    </div>
  );
};

export default BgFlickering;
