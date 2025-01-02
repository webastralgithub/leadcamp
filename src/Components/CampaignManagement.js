import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoader } from "./LoaderContext";
import { useAuth } from "./Auth/AuthContext";
import axios from "axios";
const Pagination = ({ totalrecord,currentCampaigns ,currentPage, totalPages, onPageChange }) => {
    return (
        
      <div className="pagination">
        <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                    <span class="text-2xl sm:text-sm text-gray-900">
                        Showing <span class="text-blue-600 font-semibold font-medium"> {currentCampaigns.length}</span> to  <span class="text-blue-600 font-semibold font-medium">{currentPage}</span> of <span class="text-green-600 font-semibold font-medium">{totalrecord}</span> Entries
                    </span>
                    <div class="inline-flex mt-4 sm:mt-0">
                                                                    </div>
                </div>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  };
 const CampaignManagement =()=>{
    const { setIsLoading } = useLoader();
    const { token } = useAuth();
    const [campaign,setCampaign]= useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const campaignsPerPage = 10; 
    useEffect(() => {
        const fetchLeads = async () => {
          try {
            setIsLoading(true);
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/api/auth/campaign`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            setCampaign(response.data.updatedLeads); // Assuming the response.data is an array of leads
            setIsLoading(false);
            console.log(response.data.updatedLeads);
          } catch (error) {
            console.error("Error fetching leads:", error);
            setIsLoading(false);
          }
        };
    
        fetchLeads();
      
      }, [token, setIsLoading]);

      const dayLeftCounter=(dateString)=>{
        const currentDate = new Date();
        const targetDate = new Date(dateString);
        const differenceInTime = targetDate.getTime() - currentDate.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return differenceInDays
      }
      const indexOfLastCampaign = currentPage * campaignsPerPage;
      const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
      const currentCampaigns = campaign.slice(indexOfFirstCampaign, indexOfLastCampaign);
      const totalPages = Math.ceil(campaign.length / campaignsPerPage);
    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
return(
<>
<main>
<div class="top-0 z-40 flex flex-col sm:flex-row justify-between h-16 items-center gap-x-4 border-b bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-10">
        <div class="flex flex-col sm:flex-row gap-x-1 mt-2 sm:ml-16 sm:mt-0 sm:flex-none">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight mb-2 sm:mb-0">
                Create New Campaign
            </h2>
        </div>
        <Link to="/add-campaign"><a href="#" >
            <button type="submit" class="bg-gray-200 font-semibold text-indigo-600 py-2 px-4 rounded-lg leading-5 text-gray-800 bg-gray-100 border border-gray-100 hover:text-indigo-800 hover:bg-gray-200 hover:ring-0 hover:border-indigo-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0">
                New Campaign
            </button>
        </a></Link>
    </div>
    <div class="py-8">
        <div class="m-2 flex sm:flex-row flex-col">
            <div class="flex flex-row mb-1 sm:mb-0">
                <div class="relative">
                    <form action="#" method="GET"> 
                        <select name="status" onchange="this.form.submit()" class="appearance-none h-full rounded border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                            <option value="">All</option>
                            <option value="0">Draft</option>
                            <option value="1">Active</option>
                            <option value="2">In Progress</option>
                            <option value="3">Completed</option>
                            <option value="4">Cancelled</option>
                        </select>
                    </form>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="block relative">
                <form action="https://leads.testcamp.uk/campaign" method="GET"> 
                    <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
            </svg>
        </span>
                    <input name="keyword" placeholder="Search by name" class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"/>
                </form>
            </div>
        </div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="shadow rounded-lg overflow-hidden">
                <table class="min-w-full leading-normal">
                    <thead>
                    <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Batch Id
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Name
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            amount
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Days LEFT
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date To Launch
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {currentCampaigns.map((camp,index)=>(
                                            <tr>

                            <td class="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                                <div class="flex items-center">
                                    <div class="ml-3">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                            {camp.lead.batchID}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-3 py-5 border-b border-gray-200 bg-white text-sm">
                                <div class="flex items-center">
                                    <div class="ml-3">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                            {camp.lead.name}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap"> {camp.lead.price}</p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">{dayLeftCounter(camp.lead.start_date)}</p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">{camp.lead.start_date}</p>
                            </td>
                                                                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span class="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
                                        <span class="absolute inset-0 bg-green-600 opacity-50 rounded-full"></span>
                                        <span class="relative">{camp.status}</span>
                                    </span>
                                </td>
                                                                                                                                        </tr>

                                          
))}
                                        </tbody>
                </table>
                <Pagination totalrecord={campaign.length} currentCampaigns ={currentCampaigns}currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    </div>
    </main>
    </>
)
  }

export default CampaignManagement;