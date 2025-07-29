import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuthContext } from "../authContext/useAuthContext";
import { toast } from "react-hot-toast";

const StyledInput = styled.input`
  border: 1px solid grey;
  border-radius: 10px;
  width: 25vw;
  height: 50px;
  padding-left: 10px;
  margin-bottom: 10px;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => (props.disabled ? "#D3D3D3" : "white")};
  &:focus {
    border: 1px solid blue;
    box-shadow: 0 0 0 2px rgba(0, 0, 255, 0.2);
  }
`;

const Styledlabel = styled.label`
  margin-bottom: 5px;
  font-weight: 500;
`;

const FormDiv = styled.div`
  padding: 40px;
`;
const StyledButton = styled.button`
  background-color: #252525; /* Tailwind's bg-blue-500 */
  color: white;
  font-size: 12px;
  border-radius: 0.5rem; /* Tailwind's rounded-lg */
  padding: 0.5rem 1rem;
  font-weight: 500;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563eb; /* Slightly darker blue */
  }

  &:active {
    background-color: #1d4ed8;
  }
`;

const StyledMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding-left: 11%;
  width: 100%;
  align-items: end;
  gap: 10px;
`;

function Account() {
  const [formData, setformData] = useState({
    email: "",
    name: "",
    age: "",
    city: "",
    oldpassword: "",
    newpassword: "",
  });
  const { user } = useAuthContext();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/getinfo", {
        withCredentials: true,
        params: { email: user.email },
      })
      .then((res) => {
        console.log(res.data);
        setformData(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [user.email]);

  async function HandleSubmit(e) {
    e.preventDefault();
    console.log("🔥 HandleSubmit triggered");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/update",
        {
          email: formData.email,
          newData: {
            name: formData.name,
            city: formData.city,
            age: formData.age,
          },
        },
        { withCredentials: true }
      );
      console.log("Success response:", res.data);
      toast.success("User Information changed successfully!");
      setformData((prev) => ({ ...prev, name: res.data.name }));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, name: res.data.name })
      );
    } catch (err) {
      console.log(err.message);
    }
  }
  const handleChange = (e) => {
    setformData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function handlePassword(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/auth/password",
        {
          email: formData.email,
          oldPass: formData.oldpassword,
          newPass: formData.newpassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Password changed successfully!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <StyledMain>
        <h1 className="text-xl  ">Hello there, </h1>
        <h1 className="text-5xl font-figtree italic ">{formData.name}</h1>
      </StyledMain>
      <div className="grid grid-cols-2 w-full justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <FormDiv className="flex flex-col gap-4">
            <div className="text-2xl w-fullfont-light font-figtree">
              Your Details,
            </div>
            <form className="flex flex-col " onSubmit={HandleSubmit}>
              <Styledlabel htmlFor="email">Name</Styledlabel>
              <StyledInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Styledlabel htmlFor="email">
                Email{" "}
                <span className="font-light text-[12px]">
                  (cannot be changed)
                </span>
              </Styledlabel>
              <StyledInput
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled="disabled"
              />

              <Styledlabel htmlFor="age">Age</Styledlabel>
              <StyledInput
                type="Number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
              <Styledlabel htmlFor="city">City</Styledlabel>
              <StyledInput
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />

              <div className="flex w-full justify-center items-center mt-4">
                <StyledButton type="submit">Boom!</StyledButton>
              </div>
            </form>
          </FormDiv>
        </div>
        <div className="flex flex-col justify-center items-center">
          <FormDiv className="flex flex-col gap-4 ">
            <h1 className="text-2xl font-light font-figtree">
              Change Password,
            </h1>
            <form onSubmit={handlePassword}>
              <Styledlabel htmlFor="oldpassword">Past Password</Styledlabel>
              <br />
              <StyledInput
                type="password"
                name="oldpassword"
                placeholder="Old"
                onChange={handleChange}
              />
              <Styledlabel htmlFor="newpassword">
                <br />
                Latest Password
              </Styledlabel>
              <br />
              <StyledInput
                type="password"
                name="newpassword"
                placeholder="New"
                onChange={handleChange}
              />

              <div className="flex w-full justify-center items-center mt-4">
                <StyledButton type="submit">Boom!</StyledButton>
              </div>
            </form>
          </FormDiv>
        </div>
      </div>
    </div>
  );
}

export default Account;
