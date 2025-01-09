import React from 'react';
import BentoContainer from '../../bentoContainer/BentoContainer';
import Image from 'next/image';

const ProfilCard = () => {
  return (
      <BentoContainer className=' flex flex-col items-center w-full h-60 rounded-xl'>
        <Image className='object-cover h-20 w-full rounded-t-xl' src="/defaultCoverProfil/grainy_gradient_cover.jpg" width={300} height={60} alt='cover_image'/>
        <p>coucou</p>
      </BentoContainer>
  );
};

export default ProfilCard;