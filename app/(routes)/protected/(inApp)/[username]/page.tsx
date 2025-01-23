import React from 'react';

interface PageProps {
  paramas: {
    username: string
  }
}

const page = ({params}) => {
const {username} = params


  return (
    <div>
      page profil de {username}
    </div>
  );
};

export default page;