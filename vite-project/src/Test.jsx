import React, { useState } from 'react';
import Test2 from './Test2';

const Homepage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <button onClick={openLoginModal}>Login</button>

      {/* Render the Login component as a modal */}
      <Test2 isOpen={isLoginOpen} onRequestClose={closeLoginModal} />
    </div>
  );
};

export default Homepage;