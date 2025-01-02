import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useLoader } from "./LoaderContext";
import { useAuth } from "./Auth/AuthContext";
import axios from "axios";

const CampaignReminder = () => {
  const { setIsLoading } = useLoader();
  const { token } = useAuth();
  const [campaign,setCampaign]= useState([])
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
        console.log( response.data.updatedLeads);
        const eventsdata = response.data.updatedLeads.map((item) => ({
          id:item.lead.id,
          title: item.lead.name, // Use the desired property as the event title
          start: item.lead.start_date, // Convert the date string to a Date object
          // end: new Date(item.FollowupDate), // You can adjust the end date if needed
          // Add more event properties as needed
        }));
        console.log(eventsdata);
       
        setCampaign(eventsdata); // Assuming the response.data is an array of leads
        setIsLoading(false);
        console.log(response.data.userLeads);
      } catch (error) {
        console.error("Error fetching leads:", error);
        setIsLoading(false);
      }
    };

    fetchLeads();
  
  }, [token, setIsLoading]);
  return (
 
        <main>
        <FullCalendar 
      initialView="dayGridMonth"
      
      headerToolbar={{
        left: 'prevYear,prev,next today,nextYear',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      }}
      eventTimeFormat={{ 
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short'
      }}
      timeZone="local"
      buttonText=""
      dayHeaders={true}
      plugins={[ dayGridPlugin, interactionPlugin ]}
      events={campaign}
      dateClick=""
      eventClick=""
  
    />
   
    </main>
  )
}

export default CampaignReminder
