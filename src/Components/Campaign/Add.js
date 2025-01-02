import React, { useEffect, useState } from 'react'

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import axios from 'axios';
import { useLoader } from '../LoaderContext';
import { useAuth } from '../Auth/AuthContext';
import { Link } from 'react-router-dom';

function Add() {
    const { setIsLoading } = useLoader();
    const { token } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [leads, setLeads] = useState([]);
    const [formData, setFormData] = useState({});
    const [campaign, setCampaign] = useState({});
    const [price,setPrice]=useState();
      const [stepsCompleted, setStepsCompleted] = useState({
        1: false,
        2: false,
        3: false,
        4: false
      })
      const handleStepCompletion = (stepNumber, isComplete) => {
        setStepsCompleted({ ...stepsCompleted, [stepNumber]: isComplete });
      };
      useEffect(() => {
        const fetchLeads = async () => {
          try {
            setIsLoading(true);
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/api/auth/lead`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            setLeads(response.data.userLeads); // Assuming the response.data is an array of leads
            setIsLoading(false);
          } catch (error) {
            console.error("Error fetching leads:", error);
            setIsLoading(false);
          }
        };
    
        fetchLeads();
      }, [token, setIsLoading]);
      const handleChange = (e) => {
        const { name, value,files } = e.target;
        console.log(e.target);
        if (files) {
            // If it's a file input, set the value to the selected file
            setFormData({ ...formData, [name]: files[0] });
          } else {
            // If it's a regular input, set the value to the input value
            setFormData({ ...formData, [name]: value });
          }
      };
   
      const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/auth/campaign`,
              formData,
              {
                headers: {
                  Authorization: token,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            const price = response?.data?.campaign?.price
            const campaign =response?.data?.campaign
            setCampaign(campaign);
            setPrice(price)
            nextStep()
            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
          
          } catch (error) {
            console.error("Error creating lead:", error);
            setIsLoading(false);
          }
      };
    const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);
  return (
    <main>
         <div class="top-0 z-40 flex flex-col sm:flex-row justify-between h-16 items-center gap-x-4 border-b bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-10">
        <div class="flex flex-col sm:flex-row gap-x-1 mt-2 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link to="/campaign-management">
          <svg class="h-5 w-5 m-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
          </Link>
         
            <h2 class="font-semibold text-xl text-gray-800 leading-tight mb-2 sm:mb-0">
                Create new campaign
            </h2>
        </div>
    </div>
        <div class="flex items-center justify-center mt-10 bg">
            <nav aria-label="Progress">
                <ol role="list" class="flex items-center">
                    <li class="relative pr-8 sm:pr-20">
                 
                        <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        {stepsCompleted[1]?<div class="h-0.5 w-full bg-indigo-600"></div>:<div class="h-0.5 w-full bg-gray-200"></div>}
                        </div>
                        <a href="#step-1" className={currentStep==1?"relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white":"relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900"}>
                            {stepsCompleted[1] ?<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path>
                            </svg>:<span class="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true"></span>}
                            <span class="sr-only">Step 1</span>
                        </a>
                    </li>
                    <li class="relative pr-8 sm:pr-20">
                
                        <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        {stepsCompleted[2]?<div class="h-0.5 w-full bg-indigo-600"></div>:<div class="h-0.5 w-full bg-gray-200"></div>}
                        </div>
                        <a href="#step-2" className={currentStep==2?"relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white": stepsCompleted[2]?"relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900":"group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"}>
                        {stepsCompleted[2] ?<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path>
                            </svg>:""}
                            {/* {currentStep == 2 && <span class="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true"></span>} */}

                            <span class="sr-only">Step 2</span  >
                        </a>
                    </li>
                    <li class="relative pr-8 sm:pr-20">
                        
                        <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        {stepsCompleted[3]?<div class="h-0.5 w-full bg-indigo-600"></div>:<div class="h-0.5 w-full bg-gray-200"></div>}
                            
                        </div>
                        <a href="#step-1" className={currentStep==3?"relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white":stepsCompleted[3]?"relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900":"group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"}>
                            {stepsCompleted[3]?<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path>
                            </svg>:""}
                           {/* {currentStep == 3 && <span class="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true"></span>} */}
                            <span class="sr-only">Step 3</span>
                        </a>
                    </li>
                    <li class="relative pr-8 sm:pr-20">
                       
                        <div class="absolute flex items-center" aria-hidden="true">
                        {stepsCompleted[4]?<div class="h-0.5 w-full bg-indigo-600"></div>:<div class="h-0.5 w-full bg-gray-200"></div>}
                        </div>
                        <a href="#step-1" className={currentStep==4?"relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white":"group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"}>
                            {stepsCompleted[4] ?<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path>
                            </svg>:""}
                            {/* {currentStep==4?<span class="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true"></span>:""} */}

                            <span class="sr-only">Step 4</span>
                        </a>
                    </li>
                </ol>
            </nav>
        </div>
        <form onSubmit={handleSubmit}>
      {currentStep === 1 && (
        <StepOne
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          leads={leads}
          handleStepCompletion={handleStepCompletion}

        />
      )}
      {currentStep === 2 && (
        <StepTwo
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
          handleStepCompletion={handleStepCompletion}

        />
      )}
      {currentStep === 3 && (
        <StepThree
          formData={formData}
          handleChange={handleChange}
          prevStep={prevStep}
          handleStepCompletion={handleStepCompletion}
          handleSubmit={handleSubmit}
        />
      )}
       {currentStep === 4 && (
        <StepFour
          formData={formData}
          handleChange={handleChange}
          prevStep={prevStep}
          handleStepCompletion={handleStepCompletion}
          price={price}
          campaign={campaign}

        />
      )}
    </form>
    </main>
  )
}

export default Add
