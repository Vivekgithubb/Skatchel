import styled from "styled-components";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { GrLogout, GrUser } from "react-icons/gr";
import { useAuthContext } from "../authContext/useAuthContext";

const Navigation = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
  font-size: 10px;
  margin-right: 40px;
  color: white;
  @media (min-width: 1500px) {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    gap: 20px;
    font-size: 15px;
    margin-right: 40px;
    color: white;
  }
`;

const Button = styled.button`
  background-color: #fc3232;
  color: white;
  /* padding-left: 5px;
  padding-right: 5px; */
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 20px;
  @media (min-width: 1500px) {
    background-color: #fc3232;
    color: white;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 20px;
  }

  &:hover {
    background-color: #004cff;
    color: white;
    transition: 0.2s ease-in-out;
  }
`;

const Button1 = styled.button`
  background-color: grey;
  padding-left: 5px;
  padding-right: 5px;
  padding: 3px;
  border-radius: 50%;
  &:hover {
    background-color: #004cff;
    color: white;
    transition: 0.2s ease-in-out;
  }
`;

function Nav() {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  async function handleLogout() {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Navigation>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/shop">Shop</Link>
      </li>
      <li>
        <Link to="/cart">Cart</Link>
      </li>
      <li>
        <Link to="/account">
          <Button1>
            <GrUser size="20px" color="white" />
          </Button1>
        </Link>
      </li>
      <li>
        <Button onClick={handleLogout}>
          <GrLogout />
        </Button>
      </li>
    </Navigation>
  );
}

export default Nav;
