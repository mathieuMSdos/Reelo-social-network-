import React from 'react';

const BgFlickering = () => {
  return (
    <div>
      {/* BGflickering */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pattern-background"></div>
      
      {/* Bottom overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-72 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #FAFAFA, transparent)'
        }}
      ></div>
    </div>
  );
};

export default BgFlickering;