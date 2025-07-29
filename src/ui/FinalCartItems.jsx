import axios from "axios";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useAuthContext } from "../authContext/useAuthContext";
import { useFilter } from "./useFilter";

const StyledItem = styled.div`
  grid-template-columns: 80% auto;
  display: grid;
  height: fit-content;
  align-items: center;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 15px;
`;
const StyledImg = styled.img`
  height: 65px;
  border-radius: 20px;
`;
const Styledh1 = styled.h1``;
const StyledhSpan = styled.span`
  background-color: #dbdbdb;
  padding: 1px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 50%;
`;

function FinalCartItems({ item, fetchCart }) {
  const { user } = useAuthContext();
  const { dispatch } = useFilter();

  async function handlePlus() {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          userEmail: user.email,
          productId: item.productId._id,
          price: item.productId.price,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("ADding to Cart");
      dispatch({ type: "AddToCart", payload: item._id });
      fetchCart();
    } catch (err) {
      console.log(err.message);
    }
  }
  async function handleMinus() {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/remove",
        {
          userEmail: user.email,
          productId: item.productId._id,
          price: item.productId.price,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Removing from Cart");
      dispatch({ type: "RemoveFromCart", payload: item._id });
      fetchCart();
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <StyledItem>
      {/* <button onClick={fetchCart}>Click</button> */}
      <div>
        <StyledImg src={item.productId.imageUrl} />
        <h1>{item.productId.name}</h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-5  ">
        <Styledh1>₹ {item.price}</Styledh1>
        <div className="flex gap-5">
          <button onClick={handleMinus}>-</button>
          <StyledhSpan>{item.quantity} </StyledhSpan>
          <button onClick={handlePlus}>+</button>
        </div>
      </div>
    </StyledItem>
  );
}

export default FinalCartItems;
