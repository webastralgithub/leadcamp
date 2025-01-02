import React, { useState } from 'react'

const StepTwo = ({ formData, handleChange, handleStepCompletion ,nextStep, prevStep }) => {
    const [errors, setErrors] = useState({});

    const validate = () => {
      const errors = {};
      if (!formData.name) {
        errors.name = 'The name field is required.';
      }
      if (!formData.description) {
        errors.description = 'The description field is required.';
      }
      setErrors(errors);
      return Object.keys(errors).length === 0;
    };
    const handleNext = () => {
        if (validate()) {
          nextStep();
          handleStepCompletion(2, true); 
        }
      };
  return (
    <div>
      <div class="mt-10 mb-80 " id="step-2">
            <h3 class="m-b2 text-gray-900 font-semibold">Input the detail campaign</h3>
            <div class="mt-5">
                <label for="name" class=" block font-medium leading-6 text-gray-900">Title</label>
                <input id="name" onChange={handleChange} value={formData.name} name="name" type="text" placeholder="Enter campaign name" required="" class="mt-2 block lg:w-72 sm:w-10 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
     
            </div>
            <span class="text-red-400">{errors.name} </span>
            <div class="mt-2 mb-4">
                <label for="description" class="inline-block mb-2">Description</label>
                <div id="description" class="flex flex-row justify-between">
            <textarea id="description" onChange={handleChange} value={formData.description} type="text" placeholder="Description"  name="description" class="startDate w-full leading-5 relative text-sm py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600" cols="80" rows="5"></textarea>
                </div>
                <span class="text-red-400">{errors.description} </span>
            </div>
         
            <button  onClick={prevStep} type="button" class=" bg-gray-200 font-semibold text-indigo-600 py-2 px-4 rounded-lg leading-5 text-gray-800 bg-gray-100 border border-gray-100 hover:text-indigo-800 hover:bg-gray-200 hover:ring-0 hover:border-indigo-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0">
                Back
            </button>
            <button  type="button" onClick={handleNext} class=" bg-gray-200 font-semibold text-indigo-600 py-2 px-4 rounded-lg leading-5 text-gray-800 bg-gray-100 border border-gray-100 hover:text-indigo-800 hover:bg-gray-200 hover:ring-0 hover:border-indigo-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0">
                Next
            </button>
        </div>
    </div>
  )
}

export default StepTwo
