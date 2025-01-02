import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PaymentForm.css'; // Import CSS file for styling
import { useAuth } from './Auth/AuthContext';
import { useLoader } from './LoaderContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import CreditCard from './CreditCard';

const PaymentForm = ({ campaign }) => {
    const { setIsLoading } = useLoader();
    
        const { token } = useAuth();
    const [errors, setErrors] = useState({});
    const [countries, setCountry] = useState([]);
    const [cities, setCity] = useState([]);
    const [states, setState] = useState([]);
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    exp_year: '',
    exp_month: '',
    cvc: '',
      line1: '',
      postal_code: '',
      city: '',
      state: '',
      country:'',
    campaign_id: 0
  });

  useEffect(() => {
    // If price prop changes, update the price in formData
    setFormData(prevFormData => ({
      ...prevFormData,
      campaign_id: campaign.id
    }));
  }, [campaign]);
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/payment/getAllCountries`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCountry(response.data.countries); // Assuming the response.data is an array of leads
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching leads:", error);
        setIsLoading(false);
      }
    };

    fetchCountry();
  }, [token, setIsLoading]);
console.log(countries);
  // Update form data
  const handleChange = (e) => {

    const { name, value } = e.target;

      setFormData({
        ...formData,
        [name]: value
      });

  };
  const countryOnChange = async(e)=>{
    const country_id = e.target.value;
    setFormData({
      ...formData,
      ["country"]: country_id
    });
    try {

      const state = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/payment/getAllStates/${country_id}`,{
        headers: {
          Authorization: token,
        },
      })
      setState(state.data.states);
    } catch (error) {
      
    }
  }
  const stateOnChange = async(e)=>{
    const state_id = e.target.value;

    setFormData({
      ...formData,
      ["state"]: state_id
    });
    try {

      const state = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/payment/getAllCities/${state_id}`,{
        headers: {
          Authorization: token,
        },
      })
      setCity(state.data.cities);
    } catch (error) {
      
    }


  }

  // Handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();
//     for (const key in formData) {
//   if (formData[key] === '') {
//     setErrors(prevErrors => ({
//       ...prevErrors,
//       [key]: `Please fill in the ${key.replace('_', ' ')}`
//     }));
//     return
//     // Stop further processing
//   }
// }
        
 
//       // Validate name field (only alphabets)
//       if (!/^[a-zA-Z]+$/.test(formData.name)) {
//         alert('Name field should contain only alphabets');
//         return false; // Stop further processing
//       }
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; // Adding 1 since getMonth returns 0-based index
        const { exp_year, exp_month } = formData;
        console.log(currentYear);
          if (
            parseInt(exp_year, 10) < currentYear ||
            (parseInt(exp_year, 10) === currentYear && parseInt(exp_month, 10) <= currentMonth)
          ) {
            alert('Please provide a future expiry date for the card');
            return false; // Stop further processing
          }
      if (!/^\d+$/.test(formData.number)) {
        alert('Card NO should contain only numbers');
        return false; // Stop further processing
      }
    
      // Validate postal code and number fields (only numbers)
      if (!/^\d+$/.test(formData.postal_code)) {
        alert('Postal code should contain only numbers');
        return false; // Stop further processing
      }
      if (!/^\d+$/.test(formData.number)) {
        alert('Number should contain only numbers');
        return false; // Stop further processing
      }
    
    

    try {
        setIsLoading(true)
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/payment`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if(response.data.charge.status =="succeeded"){
        setIsLoading(false)
   
        Swal.fire("Payment","Payment Succesfull","success")
        navigate('/campaign-management')
      }
      else{
        Swal.fire("!Error","Payment Failed","error")

        setIsLoading(false)
      }
     
  
      // Handle response data as needed
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Payment Details</h2>
        </div>
        <div className="modal-body">
          <div className="left-column">
          <div className="input-group">
              <label htmlFor="cardName">Name on Card:</label>
              <input type="text" id="cardName" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name on card" />
              <span style={{"color":"red"}}>{errors.name}</span>

            </div>
            <CreditCard handleChange={handleChange}/>
           
          </div>
          <div className="right-column">
            <div className="input-group">
              <label htmlFor="addressLine">Address Line 1:</label>
              <input type="text" id="addressLine" name="line1" value={formData.line1} onChange={handleChange} placeholder="Enter address line" />
              <span style={{"color":"red"}}>{errors.line1}</span>
            </div>
            <div className="input-group">
              <label htmlFor="postalCode">Postal Code:</label>
              <input type="text" id="postalCode" name="postal_code" value={formData.postal_code} onChange={handleChange} placeholder="Enter postal code" />
              <span style={{"color":"red"}}>{errors.postal_code}</span>
            </div>
            <div className="input-group">
              <label htmlFor="country">Country:</label>
              
                <select onChange={countryOnChange} id="country" name="country" value={formData.country} >
                  <option>Select Country</option>
                {countries && countries.map((country,index)=>(
                  <option value={country.id}>{country.name}</option>
                  ))}
                </select>
              <span style={{"color":"red"}}>{errors.country}</span>
            </div>
            <div className="input-group">
              <label htmlFor="state">State:</label>
              <select onChange={stateOnChange} id="state" name="state" value={formData.state}>
                  <option>Select State</option>
                {states && states.map((state,index)=>(
                  <option value={state.id}>{state.name}</option>
                  ))}
                </select>
              <span style={{"color":"red"}}>{errors.state}</span>
            </div>
            <div className="input-group">
              <label htmlFor="city">City:</label>
              <select onChange={handleChange} id="city" name="city" value={formData.city}>
                  <option>Select City</option>
                {cities && cities.map((city,index)=>(
                  <option value={city.id}>{city.name}</option>
                  ))}
                </select>              <span style={{"color":"red"}}>{errors.city}</span>
            </div>
            
          </div>
          <button className="pay-button" onClick={handleSubmit}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
