import styled from "styled-components";
import { FaCross, FaCrosshairs, FaPlus } from "react-icons/fa6";
import { FaHeart, FaMinusCircle } from "react-icons/fa";
import { useState } from "react";
import { useFilter } from "./useFilter";
import axios from "axios";
import { useAuthContext } from "../authContext/useAuthContext";
import Loding from "./Loding";
import toast from "react-hot-toast";

const ProductCard = styled.div`
  width: 210px;
  height: 300px;
  display: grid;
  grid-template-rows: 75% 25%;
  border-radius: 16px;
  background-color: #002655ce;
  &:hover {
    box-shadow: 1px 1px 10px #398cf1ed;
    background-color: #1c1c1c59;
    transition: 0.2s ease-in-out;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  /* Header styling can be added here */
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-top: 10px;
  font-size: 12px;
  padding-left: 0.3rem;
  /*padding-right: 1rem; */
  position: relative;
  border: 1px solid gray;
  /* gap: 0.5rem; */
  height: 100%;
  background-color: #ffffff;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;
const ProductName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  /* Product name styling can be added here */
`;

const ProductPrice = styled.h3`
  /* Product price styling can be added here */
  padding-left: 8px;
`;
const Div1 = styled.div`
  background-color: white;
  /* padding-left: 10px; */
  /* margin-top: 5px; */
`;
const Button = styled.button`
  &:hover {
    background-color: #2a2a2a;
    color: white;
  }
  color: black;
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
      <HeaderSection>
        <img
          src={onn ? item.productId?.imageUrl : item.imageUrl}
          className="h-[150px]"
          alt="image"
        />
        <div className="relative left-[0px] top-[-90px] overflow-hidden">
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
        </div>
      </HeaderSection>
      <ProductDetails>
        <ProductName>
          <h1 className="w-20px">{onn ? item.productId?.name : item.name}</h1>
        </ProductName>
        <ProductPrice>
          ₹ {onn ? item.productId?.price : item.price}
        </ProductPrice>
        <Div1>
          {InCart ? (
            <Button onClick={handleCartremove}>Remove</Button>
          ) : (
            <Button onClick={handleCartAdd}>Add To Cart</Button>
          )}
        </Div1>
      </ProductDetails>
    </ProductCard>
  );
}

export default Card;
