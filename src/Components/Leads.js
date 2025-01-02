import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth/AuthContext";
import Papa from "papaparse";
import { useLoader } from "./LoaderContext";
import Swal from "sweetalert2";
const Lead = () => {
  const { setIsLoading } = useLoader();
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [leads, setLeads] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const fetchData = async (path) => {
    try {
      // console.log('sdsdfdsf');
      setIsOpen(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/${path}`,
        {
          headers: {
            "Content-Type": "text/csv; charset=UTF-8",
          },
        }
      ); // Replace '/api/getCsvData' with your API endpoint
      const parsedData = Papa.parse(response.data, { header: true }); // Parse CSV data
      const modifiedArray = parsedData.data.map((obj) =>
        removeSpacesFromKeys(obj)
      );

      setCsvData(modifiedArray);

      console.log(modifiedArray, "sdsdfdsf");
    } catch (error) {
      console.error("Error fetching CSV data:", error);
    }
  };

  const getCsvLength = async (path) => {
    try {

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/${path}`,
        {
          headers: {
            "Content-Type": "text/csv; charset=UTF-8",
          },
        }
      ); // Replace '/api/getCsvData' with your API endpoint
      const parsedData = Papa.parse(response.data, { header: true }); // Parse CSV data
      const modifiedArray = parsedData.data.map((obj) =>
        removeSpacesFromKeys(obj)
      );
        return modifiedArray.length;
    } catch (error) {
      console.error("Error fetching CSV data:", error);
    }
  };

   

  const removeSpacesFromKeys = (obj) => {
    const newObj = {};
    for (let key in obj) {
      const newKey = key.replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, ""); // Remove spaces and special characters from key
      newObj[newKey] = obj[key];
    }
    return newObj;
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
        const userLeads = response.data.userLeads;
await Promise.all(userLeads.map(async (lead, index) => {
  lead.leadcount = await getCsvLength(lead.filePath);
}));

        setLeads(userLeads); 
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching leads:", error);
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [token, setIsLoading]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/lead`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLeads([...leads,response.data.lead])

        setIsLoading(false);
      
    Swal.fire('Success',"Lead uploaded Successfully","success")
    } catch (error) {
      console.error("Error creating lead:", error);
      setIsLoading(false);
    }
  };
  return (
    <>
      <main>
        {!isOpen && (
          <div class="mx-auto max-w-8xl bg-white">
            <div class="top-0 z-40 flex flex-col sm:flex-row justify-between h-16 items-center gap-x-4 border-b bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-10">
              <div class="flex flex-col sm:flex-row gap-x-1 mt-2 sm:ml-16 sm:mt-0 sm:flex-none">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight mb-2 sm:mb-0">
                  Leads
                </h2>
              </div>
              <div class="flex flex-col sm:flex-row gap-x-4">
                <form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    required=""
                    accept=".csv"
                  />

                  <button
                    class="cursor-pointer text-sm py-2 px-4 mb-3 sm:mb-0 rounded-lg leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 bg-gradient-to-b from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-600 focus:from-indigo-400 focus:to-indigo-600 hover:text-white hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0"
                    type="submit"
                  >
                    upload
                  </button>
                  <a
                    href="/test_leads.csv"
                    class="ml-8 font-semibold text-indigo-600 py-2 px-4 rounded-lg leading-5 text-gray-800 bg-gray-100 border border-gray-100 hover:text-indigo-800 hover:bg-gray-200 hover:ring-0 hover:border-indigo-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0"
                  >
                    Download sample file
                  </a>
                </form>
              </div>
            </div>
          </div>
        )}

        {!isOpen &&
          leads.map((lead, index) => (
            <div
              key={index}
              className="mt-10 relative w-full max-w-full sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all"
            >
              {/* Render lead information */}
              <div className="absolute bg-gray-500 opacity-25"></div>
              <div className="flex justify-between items-center mb-3">
                <div className="text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                  <div className="text-left sm:mt-2 lg:pl-8">
                    <table className="min-w-full border-separate border-spacing-0">
                      <tbody>
                        <tr>
                          <td className="border-gray-200 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                            {lead.fileName}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            {lead.leadcount>0 &&
                            <a
                              href="#"
                              onClick={() => fetchData(lead.filePath)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View Details
                            </a>
                            }
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              href={`${process.env.REACT_APP_API_URL}/${lead.filePath}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Export
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {isOpen && (
          <div class="pt-5 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full " style={{"width": "100% !important","display": "block",
            "max-width": "unset"}}>
            <div class="bg-white px-4 pt-5 pb-4">
              <div class="flex justify-between items-center items-center">
                <h3 class="mb-6 text-lg font-medium text-gray-900">
                  Detailed Information
                </h3>
                <a
                  href="#"
                  onClick={() => setIsOpen(false)}
                  class="mb-5 text-left text-sm font-semibold text-gray-900"
                >
                  X
                </a>
              </div>
              <div class="overflow-x-auto" style={{"height":"800px"}}>
                <table class="table-auto w-full">
                  <thead class="bg-gray-100 border-t border-l border-r dark:bg-gray-900 dark:bg-opacity-40 dark:border-gray-700">
                    <tr>
                      <th class="px-4 py-3">Address</th>
                      <th class="px-4 py-3">City</th>
                      <th class="px-4 py-3">FirstName</th>
                      <th class="px-4 py-3">LastName</th>
                      <th class="px-4 py-3">State</th>
                      <th class="px-4 py-3">Unit#</th>
                      <th class="px-4 py-3">Zip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {csvData?.map((csv, index) => (
                      <tr>
                        <td class="border border-gray-200 px-4 py-3 dark:border-gray-700 font-medium whitespace-nowrap">
                          {csv.Address}
                        </td>
                        <td class="border border-gray-200 px-4 py-3 dark:border-gray-700 font-medium whitespace-nowrap">
                          {csv.City}
                        </td>
                        <td class="border border-gray-200 px-4 py-3 dark:border-gray-700 font-medium">
                          {csv.FirstName}
                        </td>
                        <td class="border border-gray-200 px-4 py-3 dark:border-gray-700 font-medium whitespace-nowrap">
                          {csv.LastName}
                        </td>
                        <td class="border border-gray-200 px-4 py-3 dark:border-gray-700 font-medium whitespace-nowrap">
                          {csv.State}
                        </td>
                        <td class="border border-gray-200 px-4 py-3 dark:border-gray-700 font-medium whitespace-nowrap">
                          {csv.Unit}
                        </td>
                        <td class="border border-gray-200 px-4 py-3 dark:border-gray-700 font-medium whitespace-nowrap">
                          {csv.Zip}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Lead;
