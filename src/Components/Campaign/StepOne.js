import React, { useEffect, useState } from "react";

const StepOne = ({
  formData,
  handleChange,
  nextStep,
  handleStepCompletion,
  leads,
}) => {
  const [errors, setErrors] = useState({});
  const [maxDate, setMaxDate] = useState("");
  useEffect(() => {
    const dtToday = new Date();
    const dtTomorrow = new Date(dtToday);
    dtTomorrow.setDate(dtToday.getDate() + 1);
    const month = (dtTomorrow.getMonth() + 1).toString().padStart(2, "0");
    const day = dtTomorrow.getDate().toString().padStart(2, "0");
    const year = dtTomorrow.getFullYear();

    const maxDateValue = `${year}-${month}-${day}`;
    setMaxDate(maxDateValue);
  }, []);
  const validate = () => {
    console.log(formData);
    const errors = {};
    if (!formData.list_id) {
      errors.list = "Please Select";
    }
    if (!formData.start_date) {
      errors.start_date = "The start date field is required.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleNext = () => {
    if (validate()) {
      nextStep();
      handleStepCompletion(1, true); // Indicate step completion
    }
  };
  return (
    <div>
      <div class="mt-10 mb-80 " id="step-1">
        <h3 class="m-b2 text-gray-900 font-semibold">
          Campaign Specific Settings
        </h3>
        <div class="mt-5">
          <label
            for="list_id"
            class="block font-medium leading-6 text-gray-900"
          >
            List <small>(your uploaded lead)</small>
          </label>

          <select
            id="list_id"
            value={formData.list_id}
            name="list_id"
            onChange={handleChange}
            class="mt-2 block lg:w-72 sm:w-10 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">please select your uploaded lead</option>
            {leads.map((lead, index) => (
              <option key={index} value={lead.id}>
                {lead.fileName}
              </option>
            ))}
          </select>
        </div>
        <span class="text-red-400">{errors.list} </span>
        <div class="mb-6 mt-2 lg:w-72 sm:w-10">
          <label for="start_date" class="inline-block mb-2">
            Start Date
          </label>
          <small>(equal or more from today)</small>
          <div class="flex flex-row justify-between">
            <input
             type="date" id="txtDate" min={maxDate}
              value={formData.start_date}
              onChange={handleChange}
              class="startDate w-full leading-5 relative text-sm py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
              name="start_date"
            />
          </div>
          <span class="text-red-400">{errors.start_date} </span>
        </div>

        <button
          onClick={handleNext}
          type="button"
          class=" bg-gray-200 font-semibold text-indigo-600 py-2 px-4 rounded-lg leading-5 text-gray-800 bg-gray-100 border border-gray-100 hover:text-indigo-800 hover:bg-gray-200 hover:ring-0 hover:border-indigo-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepOne;
