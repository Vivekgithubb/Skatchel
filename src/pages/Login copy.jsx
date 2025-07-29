import styled, { keyframes } from "styled-components";
import Button from "../ui/Button";
import { useNavigate } from "react-router";
import axios from "axios";
import Typewriter from "typewriter-effect/dist/core";

// import { useContext, useState } from "react";
import { useAuthContext } from "../authContext/useAuthContext";
import React, { Suspense, useEffect, useRef, useState } from "react";

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
  font-family: Intel One Mono;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30vw;
  margin-top: 40px;
  /* background-color: #e0edf9; */
  /* gap: 20px; */
  box-shadow: 3px 2px 10px grey;
  padding-bottom: 10px;
  padding-top: 20px;
`;

const StyledInput = styled.input`
  border: 1px solid grey;
  border-radius: 10px;
  width: 25vw;
  height: 50px;
  padding-left: 10px;
  /* margin-top: 20px; */
  outline: none;
  cursor: pointer;
  &:focus {
    border: 1px solid blue;
    box-shadow: 0 0 0 2px rgba(0, 0, 255, 0.2); /* optional for focus ring */
  }

  &:active {
    border: 1px solid darkblue;
  }
`;
const Styledlabel = styled.label`
  margin-left: 10px;
  margin-bottom: 5px;
  margin-top: 15px;
`;

const moveUp = keyframes`
  to {
    transform: translateY(-80px);
  }
`;

const WelcomeWrapper = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
  transition: transform 1s ease-in-out;
  animation: ${({ animate }) => (animate ? moveUp : "none")} 1s forwards;
  position: relative;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoginFade = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

function Login() {
  const navigate = useNavigate();
  // const [showWelcome, setShowWelcome] = useState(true);
  const [animateUp, setAnimateUp] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const { setUser } = useAuthContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const typewriterRef = useRef();
  // const Typewriter = React.lazy(() => import("typewriter-effect"));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateUp(true);
      setTimeout(() => {
        setShowLogin(true);
      }, 1000);
    }, 3000);
    new Typewriter(typewriterRef.current, {
      strings: ["Welcome to,"],
      autoStart: true,
      loop: false,
      // cursor: "",
    });
    return () => clearTimeout(timer);
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
        // alert("Login successful!");
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/shop");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Login Failed");
    }
  };
  return (
    <StyledForm>
      <WelcomeWrapper>
        <div ref={typewriterRef} />
      </WelcomeWrapper>
      {showLogin && (
        <LoginFade>
          {" "}
          <StyledDiv>
            <h1 className="p-5 my-2 font-oxygen text-2xl">
              Login to Your Account
            </h1>
            <form className="flex flex-col p-10 " onSubmit={handleSubmit}>
              <Styledlabel htmlFor="email">Email</Styledlabel>
              <StyledInput
                type="text"
                placeholder=""
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <Styledlabel htmlFor="password">Password</Styledlabel>
              <StyledInput
                type="password"
                placeholder=""
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="flex w-full justify-center items-center">
                <Button type="submit">Login</Button>
              </div>
            </form>
            <a href="/register">Create new account...</a>
          </StyledDiv>
        </LoginFade>
      )}
    </StyledForm>
  );
}

export default Login;
