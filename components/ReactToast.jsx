import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReactToast = () => {
  return (
    <div>
      <ToastContainer autoClose={2000} className={'max-w-[250px] lg:w-full'} />
    </div>
  );
};

export default ReactToast;
