import styled, { keyframes } from "styled-components";
import Button from "../ui/Button";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuthContext } from "../authContext/useAuthContext";
import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import toast from "react-hot-toast";

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
  font-family: figtree;
  overflow: hidden;
`;

const moveUp = keyframes`
  from {
    transform: translateY(210px);
  }
  to {
    transform: translateY(-50px);
  }
`;

const TypewriterContainer = styled.div`
  font-size: 1.5rem;
  margin-top: 200px;
  display: flex;
  gap: 20px;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.$animate ? "" : "100%")};
  width: 100%;
  animation: ${(props) => (props.$animate ? moveUp : "none")} 1s ease forwards;
`;

const StyledDiv = styled.div`
  display: ${(props) => (props.$show ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  width: 30vw;
  /* margin-top: 60px; */
  box-shadow: 3px 2px 10px grey;
  padding: 20px;
  animation: fadeIn 1s ease forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
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

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [animateTitle, setAnimateTitle] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setAnimateTitle(true), 3000);
    const t2 = setTimeout(() => setShowForm(true), 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      if (res.data.message === "Login successful") {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/landing");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Inavlid Credentials");
    }
  };

  return (
    <StyledForm>
      <TypewriterContainer $animate={animateTitle}>
        <div className="font-figtree">
          <Typewriter
            options={{
              strings: ["Welcome to, "],
              autoStart: true,
              loop: false,
              // delay: 60,
              cursor: "",
            }}
          />
        </div>
        <h1 className="text-6xl font-figtree  tracking-tight">Skatchel.</h1>
      </TypewriterContainer>

      <StyledDiv $show={showForm}>
        <h1 className=" font-oxygen text-xl">Login to Your Account</h1>

        <div className="mt-1">
          <form className="flex flex-col " onSubmit={handleSubmit}>
            <Styledlabel htmlFor="email">Email</Styledlabel>
            <StyledInput
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <Styledlabel htmlFor="password">Password</Styledlabel>
            <StyledInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="flex w-full justify-center items-center ">
              <Button type="submit">Login</Button>
            </div>
          </form>
        </div>
        <a href="/register" className="text-xs">
          Create new account...
        </a>
      </StyledDiv>
    </StyledForm>
  );
}

export default Login;
