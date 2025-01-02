import React from 'react';
import { useLoader } from './LoaderContext';
import { DNA } from 'react-loader-spinner';

const Loader = () => {
  const { isLoading } = useLoader();
console.log(isLoading);
  return( 
    <>
    {isLoading ? 
  <div className="spinner">
  <DNA
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/>
 </div> : null}
 </>
 )
};

export default Loader;
