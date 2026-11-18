"use client"
<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> 5e0e30bb84cbbd8c5d1b04b7134352e31f6d482a
import { FaSquareWhatsapp } from "react-icons/fa6";

const Whatsapp = () => {
  const openWhatsApp = () => {
    window.open("https://wa.me/923151455522", "_blank");
  };

  return (
<<<<<<< HEAD
    <div className='bg-[#1a1a1a] cursor-pointer flex p-10' onClick={openWhatsApp}>
=======
    <div className='rounded-full bg-[#1a1a1a] cursor-pointer flex p-10' onClick={openWhatsApp}>
>>>>>>> 5e0e30bb84cbbd8c5d1b04b7134352e31f6d482a
      <FaSquareWhatsapp size={40} color="#25D366" className='m-auto justify-center'/>
    </div>
  );
};

export default Whatsapp;