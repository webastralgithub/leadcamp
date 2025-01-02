import React, { useState } from 'react'
import { useLoader } from '../LoaderContext';
import { useAuth } from '../Auth/AuthContext';
import axios from 'axios';
import PaymentForm from '../PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
const StepFour = ({ formData, handleChange, handleStepCompletion ,nextStep, prevStep ,price,campaign }) => {
  const { setIsLoading } = useLoader();
  const { token } = useAuth();
  const [showPaymentForm,setShowPaymentForm] =useState(false);

  const handleNext = async() => {
    try {

      setIsLoading(true);
      
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/payment`,
        {price:price},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    
    } catch (error) {
      console.error("Error creating lead:", error);
      setIsLoading(false);
    }
    //   nextStep();
      handleStepCompletion(4, true); // Indicate step completion
    
  };
  const buyCredits = async () => {

    try {
      setIsLoading(true);
        const stripe = loadStripe('pk_test_51J7HEBSHFjZnaGPk6SlmuLnMU1mIi3Jn5m1z2S1jb3mVb93ikKfN40KrzmpxGZDBlglYAAnp3XGrMjXAK63t5Ym5004uEHi7xn');

        const data = {
          campId:campaign.id,
            success_url :'http://143.198.229.253/campaign-management',
            cancel_url : 'http://143.198.229.253/campaign-management',
        }
    
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/payment`, data,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
                }
        });
        setIsLoading(false);
        window.location = response.data.url;
    } catch (error) {
        console.log(error);
        setIsLoading(false);
    }
}
 
  return (<>
    {!showPaymentForm ?
    <div class="mt-10 mb-80 " id="step-4">
 
  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
    <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
          </svg>
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <div className="mt-2">
            <p className="text-sm text-gray-500">This campaign is going to be <span className="text-green-500">${price}</span>, would you like to continue?</p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button onClick={() => buyCredits()} type="button" className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2">
          Yes, Continue
        </button>
        <button type="button" onClick={()=>prevStep()} className="bg-gray-200 font-semibold text-indigo-600 py-2 px-4 rounded-lg leading-5 text-gray-800 bg-gray-100 border border-gray-100 hover:text-indigo-800 hover:bg-gray-200 hover:ring-0 hover:border-indigo-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0">
          Go Back
        </button>
      </div>
    </div>
  </div>
  

</div>
:
  <PaymentForm campaign={campaign} />}
  </>
  )
}

export default StepFour
