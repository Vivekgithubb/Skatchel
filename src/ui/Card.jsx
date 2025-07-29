import styled from "styled-components";
import { FaCross, FaCrosshairs, FaPlus } from "react-icons/fa6";
import { FaHeart, FaMinusCircle } from "react-icons/fa";
import { useState } from "react";
import { useFilter } from "./useFilter";
import axios from "axios";
import { useAuthContext } from "../authContext/useAuthContext";
import Loding from "./Loding";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const ProductCard = styled.div`
  width: 220px;
  height: 310px;
  display: grid;
  grid-template-rows: 80% auto;
  border-radius: 12px;
  background-color: #f7f7f7;
  border: 1px solid lightgray;
  &:hover {
    box-shadow: 1px 1px 6px #d1e6ffeb;
    background-color: #263d5f;
    transition: 0.1s ease-in;
    color: #ffffff;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: relative;
  &:hover {
    color: antiquewhite;
  }

  /* Header styling can be added here */
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 3px;
  /* margin-top: 1px; */
  font-size: 12px;
  padding-left: 0.3rem;
  padding-right: 0.4rem;
  position: relative;
  /* border: 1px solid gray; */
  gap: 0.1rem;
  height: 100%;
  border-top: 1px solid #cdcdcd;
  background-color: #363636;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const ProductName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  /* Product name styling can be added here */
`;

const ProductPrice = styled.h3`
  /* Product price styling can be added here */
  color: #5f5f5f;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* padding-left: 1px; */
`;
const Div1 = styled.div`
  /* background-color: white; */
`;
const Button = styled.button`
  &:hover {
    background-color: #ffffff;
    color: #000000;
    transition: 0.2s ease-in;
  }
  color: #ffffff;
  font-family: oxygen;
  font-weight: 400;
  padding: 3px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 30px;
  font-size: 12px;
`;

function Card({ item, onn, email, setFav }) {
  const [color, setColor] = useState(false);
  const { state, dispatch } = useFilter();
  const { user } = useAuthContext();
  const productId = item._id;
  const navigate = useNavigate();
  const InCart = state.cart.some(
    (Cartitem) =>
      Cartitem && (Cartitem.id === productId || Cartitem._id === productId)
  );
  async function handleIcon() {
    const fav = color;
    setColor((prev) => !prev);
    if (!fav) {
      try {
        await axios.post(
          "http://localhost:5000/api/fav/add",
          {
            email: user.email,
            productId: item._id,
          },
          { withCredentials: true }
        );
      } catch (err) {
        console.log(err.message);
      }
    } else {
      try {
        await axios.post(
          "http://localhost:5000/api/fav/delete",

          {
            email: user.email,
            productId: item._id,
          },

          { withCredentials: true }
        );
      } catch (err) {
        console.log(err.message);
      }
    }
  }
  async function handleCartAdd() {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          userEmail: user.email,
          productId: onn ? item.productId._id : item._id,
          price: onn ? item.productId.price : item.price,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Added to Cart");
      dispatch({ type: "AddToCart", payload: item });
    } catch (err) {
      console.log(err.message);
    }
  }
  async function handleCartremove() {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/remove",
        {
          userEmail: user.email,
          productId: onn ? item.productId._id : item._id,
          price: onn ? item.productId.price : item.price,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Removed from Cart");
      dispatch({ type: "RemoveFromCart", payload: item._id });
    } catch (err) {
      console.log(err.message);
    }
  }
  const HandleFavRemove = async () => {
    try {
      await axios
        .post(
          "http://localhost:5000/api/fav/delete",
          {
            email: user.email,
            productId: item.productId._id,
          },
          { withCredentials: true }
        )
        .then(() => toast.success("Removed from favourites"));
      axios
        .get(`http://localhost:5000/api/fav/get/${email}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.items);
          setFav(res.data || []);
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  if (!item) return <Loding />;
  // if (!fav) return <Loding />;
  if (Array.isArray(item) && item.length === 0)
    return <h1>Oops! Seems like you have no items in Favourites</h1>;

  return (
    <ProductCard>
      <HeaderSection
        onClick={() => navigate(`cart/${item.productId?._id || item._id}`)}
      >
        <h1 className="w-full  mt-2 mb-4 px-4 wrap-break-word text-[14px] font-normal">
          {onn ? item.productId?.name : item.name}{" "}
        </h1>
        <img
          src={onn ? item.productId?.imageUrl : item.imageUrl}
          className="h-[170px] drop-shadow-white-500/75 "
          alt="image"
        />
      </HeaderSection>
      <ProductDetails>
        <ProductName>
          {" "}
          <span className="text-zinc-200 text-[15px]">
            ₹ {onn ? item.productId?.price : item.price}
          </span>
          <button>
            {onn ? (
              <FaMinusCircle
                size="20px"
                color="white"
                onClick={HandleFavRemove}
              />
            ) : (
              <FaHeart
                size="14px"
                color={color ? "red" : "white"}
                onClick={handleIcon}
              />
            )}
          </button>
        </ProductName>
        <ProductPrice>
          <Div1>
            {InCart ? (
              <Button onClick={handleCartremove}>Remove</Button>
            ) : (
              <Button onClick={handleCartAdd}>Add To Cart</Button>
            )}
          </Div1>
        </ProductPrice>
      </ProductDetails>
    </ProductCard>
  );
}

export default Card;
