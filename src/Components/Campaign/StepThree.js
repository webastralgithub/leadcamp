import React, { useState } from 'react'

const StepThree = ({ formData, handleChange, handleStepCompletion ,nextStep, prevStep ,handleSubmit}) => {
    const [errors, setErrors] = useState({});
    const [type, setType] =useState(false);
    const validate = () => {
        const errors = {};
        if (!formData.front) {
          errors.front = "front image is required";
        }
        if (!formData.back) {
          errors.back = "back image is required.";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
      };
 
    const handleNext = () => {
        
      if(validate()){
        setType(true);
        handleStepCompletion(3, true); 

        
      }
        //   
         // Indicate step completion
        
      };
    return (
    <div>
      <div class="mt-10 mb-80 " id="step-3">
            <h3 class="pl-11 text-gray-900 font-semibold">Upload or Select Poster</h3>
           
            <div class="container mx-auto px-5 py-2 lg:px-10 lg:pt-12">
                <div class="cursor-pointer grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div id="imageSingle" class="border w-full rounded-lg dropzone single-dropzone">
                        <div class="m-7 dz-message" data-dz-message="">
                            <div class="pre-upload flex flex-col items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mx-auto text-gray-500 inline-block w-10 h-10 bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"></path>
                                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"></path>
                                </svg>
                                <div class="py-3">
                                    <span>Upload front of image</span>
                                </div>
                            </div>
                            <div class="pre-upload text-center">
                                <button type="button" class="py-1.5 campaing-lable px-3 inline-block text-center rounded leading-normal text-gray-800 bg-gray-100 border border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:ring-0 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 mr-2 dark:bg-gray-300">
                                    <label for="poster"  class="py-1.5 px-3 inline-block text-center rounded leading-normal text-gray-800 bg-gray-100 border border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:ring-0 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 mr-2 dark:bg-gray-300">
                                        Browse file
                                        <input name="front" onChange={handleChange}  type="file" id="front"  accept="image/*" />
                                    </label>
                                    <span id="file-name">{formData?.front?.name}</span>
                                </button>
                                <span class="text-red-400">{errors.front} </span>
                            </div>
                       

                        </div>
                    </div>
                    {/* <div class="">
                        <img alt="gallery" class="block h-full w-full rounded-lg object-cover object-center" src="https://feng.nyc3.digitaloceanspaces.com/feng/NotificationIcons/iScreen%20Shoter%20-%20Google%20Chrome%20-%2024022032124%20pm.jpg"/>
                    </div>
                    <div class="">
                        <img alt="gallery" class="block h-full w-full rounded-lg object-cover object-center" src="https://feng.nyc3.digitaloceanspaces.com/feng/NotificationIcons/iScreen%20Shoter%20-%20Google%20Chrome%20-%2024022032341%20pm.jpg"/>
                    </div> */}
                    
                    <div id="imageSingle" class="border w-full rounded-lg dropzone single-dropzone">
                        <div class="m-7 dz-message" data-dz-message="">
                            <div class="pre-upload flex flex-col items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mx-auto text-gray-500 inline-block w-10 h-10 bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"></path>
                                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"></path>
                                </svg>
                                <div class="py-3">
                                <span>Upload back of image</span>
                                </div>
                            </div>
                            <div class="pre-upload text-center">
                                <button type="button" class="py-1.5 px-3  campaing-lable inline-block text-center rounded leading-normal text-gray-800 bg-gray-100 border border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:ring-0 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 mr-2 dark:bg-gray-300">
                                    <label for="poster" class="py-1.5 px-3 inline-block text-center rounded leading-normal text-gray-800 bg-gray-100 border border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:ring-0 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 mr-2 dark:bg-gray-300">
                                        Browse file
                                        <input name="back" onChange={handleChange}  type="file" id="back"   accept="image/*" />
                                    </label>
                                    <span id="file-name">{formData?.back?.name}</span>
                                </button>
                              
                            </div>
                            <span class="text-red-400">{errors.back} </span>
                        </div>
                    </div>
                    
                </div>
                <div class="pt-2">
                    <button onClick={prevStep} type="button" class=" bg-gray-200 font-semibold text-indigo-600 py-2 px-4 rounded-lg leading-5 text-gray-800 bg-gray-100 border border-gray-100 hover:text-indigo-800 hover:bg-gray-200 hover:ring-0 hover:border-indigo-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0">
                        Back
                    </button>
                    <button  onClick={handleNext} type={type?"submit":"button"} class=" bg-gray-200 font-semibold text-indigo-600 py-2 px-4 rounded-lg leading-5 text-gray-800 bg-gray-100 border border-gray-100 hover:text-indigo-800 hover:bg-gray-200 hover:ring-0 hover:border-indigo-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0">
                        Next
                    </button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default StepThree
