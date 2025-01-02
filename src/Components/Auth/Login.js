import React, { useRef, useState } from "react";
import "./Auth.css";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import Swal from "sweetalert2";
import Modal from 'react-modal';
import { useLoader } from "../LoaderContext";
const Login = () => {
  const { setIsLoading } = useLoader();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showLogoutForm,setShowLogoutForm]= useState(false);
     const ref = useRef(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    company: "", // Add company field
    confirm_password: "",
  });
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };


  const sendEmail = async () => {
  
    const { value: email } = await Swal.fire({
      title: "Forgot Password",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      confirmButtonText: "Reset Password",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {

          return "You need to enter your email!";
          
        }
      },
    });

    if (email) {
      try {
        setIsLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/email`, { email });
        setIsLoading(false)
        Swal.fire({
          title: "Password Reset Requested",
          text: response.data.message,
          icon: "success",
        });
      } catch (error) {
        setIsLoading(false)
        // Handle error if the API request fails
        console.log('Error:', error);
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        });
      }
    }
  };


  const otpVerify = async (token) => {
    setIsLoading(false);
    await Swal.fire({
      title: "OTP Verification",
      html: `
        <div style="display: flex;">
          <input id="swal-input1" class="swal2-input" maxlength="1"  style="width: 3em; text-align: center; margin-right: 0.5em;">
          <input id="swal-input2" class="swal2-input" maxlength="1"  style="width: 3em; text-align: center; margin-right: 0.5em;">
          <input id="swal-input3" class="swal2-input" maxlength="1"   style="width: 3em; text-align: center; margin-right: 0.5em;">
          <input id="swal-input4" class="swal2-input" maxlength="1"  style="width: 3em; text-align: center;">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Verify",
      cancelButtonText: "Cancel",
      didOpen: () => {
        const inputs = Swal.getPopup().querySelectorAll("input");
        inputs.forEach((input, index) => {
          input.addEventListener("input", () => {
            if (input.value.length === 1 && index < inputs.length - 1) {
              inputs[index + 1].focus();
            }
          });
        });
      },
      preConfirm: async () => {
        const otp1 = Swal.getPopup().querySelector("#swal-input1").value;
        const otp2 = Swal.getPopup().querySelector("#swal-input2").value;
        const otp3 = Swal.getPopup().querySelector("#swal-input3").value;
        const otp4 = Swal.getPopup().querySelector("#swal-input4").value;
        const otp = otp1 + otp2 + otp3 + otp4;
        if (!otp1 || !otp2 || !otp3 || !otp4) {
          Swal.showValidationMessage(`Please enter all digits of the OTP!`);
          return false;
        }
        try {
          setIsLoading(true);
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/auth/user/otpVerify`,
            { otp: otp },
            {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status) {
            setIsLoading(false);
            const decoded = jwtDecode(response.data.token);
            const userDetails = response.data.user;
            setTimeout(() => {
                          setIsLoading(false);
                          if(decoded.isVerify){
                          localStorage.setItem('token', `Bearer ${token}`);
                          localStorage.setItem('userDetails',JSON.stringify(userDetails));
                          Swal.fire("Login", "Login Successfully", "success");
                          login();
                          navigate("/");
                          }
                        }, 1000);
          }
        } catch (error) {
          setIsLoading(false);
          Swal.showValidationMessage(error.response.data.message);
          return false;
        }
      },
    });
  };
  


  const handleSubmit = async(event) => {
    event.preventDefault();
    if(isRegistering){
      if (credentials.password !== credentials.confirm_password) {
      Swal.fire("Error","Password Mismatch","error")
        return false;
      }
    }
    setIsLoading(true);

    const baseURL = process.env.REACT_APP_API_URL + '/api/auth';
    const url = !isRegistering ? '/login' : '/register';
    const endpoint = `${baseURL}${url}`;
   try {
    const response = await axios.post(endpoint,
credentials,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const token = response.data.token;
    const decoded = jwtDecode(token);

    if(!decoded.isVerify){
     await otpVerify(token)
    }

       
    
   } catch (error) {
    setIsLoading(false);
    console.log(error);
    Swal.fire("Error", error.response.data.error, "error");
   }

  };
  const closeModal=() =>{
    setShowLogoutForm(false);
  }
  return (
    <>
  
    {!showLogoutForm && <div className="font-sans text-gray-900 antialiased">
      <div className="flex min-h-full">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600"
                alt="Your Company"
              />
              <h2 className="mt-20 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {isRegistering ? "Sign Up" : "Sign in"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                <span className="font-semibold text-black-600">
                  Please fill detail to access your account
                </span>
              </p>
            </div>

            <div className="mt-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={credentials.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {isRegistering && (
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        value={credentials.confirm_password}
                        onChange={handleInputChange}
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                )}
                {isRegistering && (
                  <div>
                    <label
                      htmlFor="Company"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Company
                    </label>
                    <div className="mt-2">
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={credentials.company}
                        onChange={handleInputChange}
                        autoComplete="company"
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm leading-6 text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>

                  {!isRegistering &&<div className="text-sm leading-6">
                    <a
                   onClick={sendEmail}
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>}
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                   {isRegistering ? "Sign up":"Sign in"}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-10">
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white pl-5 px-2 text-gray-900">
                  {!isRegistering ? "Don't have an account?" :"Already have account?"}
                  </span>

                  {isRegistering ? (
                    <a
                      onClick={() => {
                        setIsRegistering(false);
                      }}
                    >
                      <span className="bg-white text-indigo-600 text-gray-900">
                        Sign in
                      </span>
                    </a>
                  ) : (
                    <a
                      onClick={() => {
                        setIsRegistering(true);
                      }}
                    >
                      <span className="bg-white text-indigo-600 text-gray-900">
                        Sign up
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1908&amp;q=80"
            alt=""
          />
        </div>
      </div>
    </div>}
    {showLogoutForm&& 
    <div>
    <Modal
      isOpen={showLogoutForm}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Forgot Password"
    >

      <button onClick={closeModal}>x</button>
      
        <label>Email</label>
        <input type="email" ref={ref}/>
    <button onClick={sendEmail()} type="submit">Send Otp</button>
    
    </Modal>
  </div>
    }

    </>
  );
};

export default Login;
