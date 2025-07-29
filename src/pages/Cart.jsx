import styled from "styled-components";
import FinalCartItems from "../ui/FinalCartItems";
import FinalBill from "../ui/FinalBill";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../authContext/useAuthContext";
import Loding from "../ui/Loding";
import { useFilter } from "../ui/useFilter";
import { useNavigate } from "react-router";
const StyledCart = styled.div`
  width: 100%;
  padding: 20px;
  padding-bottom: 100px;
  height: 80vh;
  border-radius: 10px;
`;
const StyledEmptyCart = styled.div`
  width: 100%;
  height: 83vh;
  padding: 20px;
  padding-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid grey;
  border-radius: 10px;
  font-size: 20px;
`;

const ItemsContainer = styled.div`
  flex: 1; /* Take available space */
  height: 50vh;
  overflow-y: auto; /* 🔥 Scroll only this */
`;
const Button = styled.button`
  background-color: #2267fd;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
  margin-top: 15px;
  font-size: 16px;
  border-radius: 20px;
  font-family: figtree;
`;

function Cart() {
  const { user } = useAuthContext();
  const email = user.email;
  const navigate = useNavigate();
  // const [items, setItems] = useState([]);
  const { state, dispatch } = useFilter();
  const [cart, setCart] = useState([]);

  const fetchCart = useCallback(() => {
    axios
      .get(`http://localhost:5000/api/cart/users/${email}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setCart(res.data[0].items);
      })
      .catch((err) => console.log(err.message));
  }, [email]);
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);
  useEffect(() => {
    if (!email) return <Loding />;
    axios
      .get(`http://localhost:5000/api/cart/users/${email}`, {
        withCredentials: true,
      })
      // .then((res) => {
      //   console.log(res.data);
      //   setItems(res.data[0].items);
      // })
      .catch((err) => console.log(err.message));
  }, [email]);

  useEffect(() => {
    const total = cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    dispatch({ type: "SetTotalBill", payload: total });
  }, [cart, dispatch]);

  const formattedTotal = state.bill.toLocaleString("en-IN");
  console.log(formattedTotal);

  if (cart.length === 0 || !cart)
    return (
      <StyledEmptyCart>
        <h1>Oops no Items in Your cart right Now..</h1>
        <h1>Add some right now</h1>
        <Button onClick={() => navigate("/shop")}>Shop Now</Button>
      </StyledEmptyCart>
    );

  return (
    <StyledCart>
      <ItemsContainer>
        {cart.map((item, i) => (
          <FinalCartItems item={item} key={i} fetchCart={fetchCart} />
        ))}
      </ItemsContainer>

      <FinalBill total={formattedTotal} />
    </StyledCart>
  );
}

export default Cart;
