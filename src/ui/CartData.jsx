import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IoIosColorFilter } from "react-icons/io";
import { TbWashTemperature4 } from "react-icons/tb";
import { SiMaterialdesignicons } from "react-icons/si";
import { useAuthContext } from "../authContext/useAuthContext";
import toast from "react-hot-toast";
import { useFilter } from "./useFilter";
import { IoIosArrowRoundBack } from "react-icons/io";

const Button1 = styled.div`
  background-color: #242424;
  text-align: center;
  /* color: #ffffff; */
  height: fit-content;
  width: 40%;
  padding: 5px;
  border-radius: 20px;
  padding-right: 20px;
  padding-left: 20px;

  cursor: pointer;
  &:hover {
    background-color: #727272;
    color: #070707;

    transition: 0.2s ease-in;
  }
`;

const Li = styled.div``;

function CartData() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuthContext();
  const { state, dispatch } = useFilter();
  const [fav, setFav] = useState(false);
  const [isFav, setisFav] = useState(fav);
  const navigate = useNavigate();

  const email = user.email;
  const encodedEmail = useMemo(() => encodeURIComponent(email), [email]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product with id:", id); // ✅ Debug log
        //getting products
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const prod = res.data;
        console.log("Fetched product:", res.data);
        setProduct(prod);

        //geting favourites and checking if it is alreadyfav , setting fav state
        const favRes = await axios.get(
          `http://localhost:5000/api/fav/get/${encodedEmail}`
        );
        const favData = favRes.data;
        console.log("Fetched fav data:", favData);
        if (Array.isArray(favData)) {
          const found = favData.items.some(
            (item) => item[0].productId?._id === prod._id
          );
          setFav(found);
          setisFav(found);
        } else {
          console.warn("Expected array but got:", favData);
          setFav(false);
          setisFav(false);
        }
        console.log("Fetched Fav:");
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProduct();
  }, [id, encodedEmail]);

  const InCart =
    product?._id &&
    state?.cart.some(
      (Cartitem) =>
        Cartitem &&
        (Cartitem.productId === product._id || Cartitem._id === product._id)
    );

  async function handleCartAdd() {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          userEmail: user.email,
          productId: product._id,
          price: product.price,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Added to Cart");
      dispatch({ type: "AddToCart", payload: product });
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
          productId: product._id,
          price: product.price,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Removed from Cart");
      dispatch({ type: "RemoveFromCart", payload: product._id });
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleToggle() {
    try {
      if (isFav) {
        await axios
          .post(
            "http://localhost:5000/api/fav/delete",
            {
              email: user.email,
              productId: product._id,
            },
            { withCredentials: true }
          )
          .then(() => toast.success("Removed from favourites"));
        setisFav(false);
      } else {
        await axios
          .post(
            "http://localhost:5000/api/fav/add",
            {
              email: user.email,
              productId: product._id,
            },
            { withCredentials: true }
          )
          .then(() => toast.success("Added to favourites"));
        setisFav(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-[40%_60%] h-[89vh] overflow-auto ">
        <div className=" h-[70vh] relative w-full mt-10 ">
          <div
            onClick={() => navigate(-1)}
            className="flex flex-row items-center cursor-pointer"
          >
            <IoIosArrowRoundBack />
            Back
          </div>
          <img
            src={product?.imageUrl}
            alt="image"
            className="h-[80vh] object-contain"
          />
        </div>

        <div className="mx-10 pt-15">
          <div className="flex flex-row w-full gap-4  items-center">
            <Li className="text-3xl font-semibold">{product?.name}</Li>
            <Li className="bg-zinc-500 text-md text-white rounded-xl px-6 font-mono  text-center">
              {product?.type}
            </Li>
          </div>
          <Li className="mt-3 text-xl text-zinc-700 font-oxygen">
            Price: <span className="text-red-600">₹{product?.price}</span>
          </Li>
          <div className="flex flex-row gap-4 mt-15 mb-10 w-full h-fit">
            {InCart ? (
              <Button1 className="text-zinc-200" onClick={handleCartremove}>
                Remove
              </Button1>
            ) : (
              <Button1 className="text-zinc-200" onClick={handleCartAdd}>
                Add to Cart
              </Button1>
            )}
            <div>
              {isFav ? (
                <div
                  className="text-white bg-red-500 px-[50px] p-[5px] rounded-3xl cursor-pointer"
                  onClick={handleToggle}
                >
                  Favourites
                </div>
              ) : (
                <div
                  className="text-zinc-700 border-1 px-[50px] p-[5px] rounded-3xl cursor-pointer"
                  onClick={handleToggle}
                >
                  Favourites
                </div>
              )}
            </div>
          </div>

          <div className="text-[14px]">
            <Li className="font-semibold text-zinc-800 text-[16px]">
              About Product:
            </Li>
            <Li className="mt-2 text-zinc-700">
              {" "}
              {product?.description.short}
            </Li>
            <Li className="mt-2 text-zinc-700"> {product?.description.long}</Li>
          </div>
          <div className="mt-5 text-[14px]">
            <Li className="font-semibold text-zinc-800 text-[16px]">
              Features:
            </Li>
            <ul>
              {product?.description.features.map((item, i) => (
                <li
                  key={i}
                  className="  text-zinc-700 flex flex-row gap-1 items-center"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-7 text-[14px]">
            <Li className="font-semibold text-zinc-800 text-[16px]">
              Specifications:
            </Li>
            <ul>
              <li className="mt-1 text-zinc-700 flex flex-row gap-1 items-center">
                <SiMaterialdesignicons />{" "}
                <span> {product?.description.specifications?.material}</span>
              </li>
              <li className=" text-zinc-700 flex flex-row gap-1 items-center">
                <IoIosColorFilter />{" "}
                <span>{product?.description.specifications?.color}</span>
              </li>
              <li className=" text-zinc-700 flex flex-row gap-1 items-center">
                <TbWashTemperature4 color="black" />
                <span>{product?.description.specifications?.care}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartData;
