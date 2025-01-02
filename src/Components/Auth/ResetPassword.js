import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  margin-top: 135px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Error = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const Success = styled.div`
  color: green;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ResetPassword = () => {
    const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // You should replace this URL with your actual backend API endpoint
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, {
        password,
        resetToken: token, // Replace "token" with the actual token
      });
      Swal.fire('Paassword Reset',"Password Reset Successfully","success");
      navigate("/");
      
    } catch (error) {
      Swal.fire('Error',error.response.data.message,"error")
    }
  };

  return (
    <Container>
      <Title>Reset Password</Title>
      <Input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      {error && <Error>{error}</Error>}
      {success && <Success>Password reset successfully!</Success>}
      <Button onClick={handleResetPassword}>Reset Password</Button>
    </Container>
  );
};

export default ResetPassword;
