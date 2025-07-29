import styled from "styled-components";
import Button from "../ui/Button";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
  font-family: figtree;
  padding-top: 60px;
  gap: 20px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 36vw;
  padding-bottom: 20px;
  padding-top: 20px;
  box-shadow: 1px 1px 3px grey;
  /* background-color: #e0edf9; */
  /* gap: 20px; */
`;

const StyledInput = styled.input`
  border: 1px solid grey;
  border-radius: 10px;
  width: 25vw;
  height: 50px;
  padding-left: 10px;
  margin-bottom: 15px;
  outline: none;
  cursor: pointer;
  &:focus {
    border: 1px solid blue;
    box-shadow: 0 0 0 2px rgba(0, 0, 255, 0.2);
  }
`;

const Styledlabel = styled.label`
  margin-bottom: 5px;
  font-weight: 400;
  font-size: 12px;
`;

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      // alert("Signup successful!");
      toast.success("Registered Succesfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <StyledForm>
      <h1 className="font-oxygen text-3xl">Create Your Account</h1>
      <StyledDiv>
        <form className="flex flex-col p-10 " onSubmit={handleSubmit}>
          <Styledlabel htmlFor="name">Name</Styledlabel>
          <StyledInput
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Styledlabel htmlFor="email">Email</Styledlabel>
          <StyledInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Styledlabel htmlFor="password">Password</Styledlabel>
          <StyledInput
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Styledlabel htmlFor="age">Age</Styledlabel>
          <StyledInput
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <Styledlabel htmlFor="city">City</Styledlabel>
          <StyledInput
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <div className="flex w-full justify-center items-center font-figtree text-xl">
            <Button type="submit">Register</Button>
          </div>
        </form>

        <a href="/login" className="text-xs">
          Already have an account? <span className="italic">Login</span>
        </a>
      </StyledDiv>
    </StyledForm>
  );
}

export default Register;
