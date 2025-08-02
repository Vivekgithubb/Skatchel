import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAuthContext } from "../authContext/useAuthContext";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useFilter } from "../ui/useFilter";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function Checkout() {
  const { user } = useAuthContext();
  const email = user.email;
  const [cart, setCart] = useState([]);
  const { state, dispatch } = useFilter();
  const navigate = useNavigate();

  const fetchCart = useCallback(() => {
    axios
      .get(`http://localhost:5000/api/cart/users/${email}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCart(res.data[0].items);
      })
      .catch((err) => console.log(err.message));
  }, [email]);
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);
  const formattedTotal = state.bill.toLocaleString("en-IN");

  useEffect(() => {
    if (
      user?.email &&
      user?.name &&
      cart?.length > 0 &&
      formattedTotal !== undefined
    ) {
      const timer = setTimeout(() => {
        navigate("/shop");
        toast.success("Bill has been sent to Your Mail");
        dispatch({ type: "ClearCart" });
      }, 2800);
      axios.post(
        "http://localhost:5000/api/order/confirm",
        {
          email: user.email,
          name: user.name,
          cart: cart,
          total: formattedTotal,
        },
        {
          withCredentials: true,
        }
      );

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [navigate, cart, formattedTotal, dispatch, user.name, user.email]);

  return (
    <div className="flex flex-col w-full h-[90vh] justify-top items-center ">
      <h1 className="font-normal text-3xl mt-10 mb-4 text-zinc-700">
        🎉 Congratuations! {user.name},
        <span className="italic text-3xl">Your order was confirmed</span> 🎉
      </h1>
      <div className="w-[10vw] mb-5 ">
        <DotLottieReact
          src="https://lottie.host/8d90a4cb-aca8-4551-b8a1-9ade2031dc32/lz5KJUrRDZ.lottie"
          loop
          autoplay
        />
      </div>
      <div className=" w-[50%] h-[60%] overflow-y-auto border-1 px-6 py-2 rounded-md flex flex-col justify-between ">
        <div className="flex flex-col gap-5">
          {cart.map((item, i) => (
            <div key={i} className="flex flex-row justify-between items-center">
              <div className="grid grid-cols-[15%_auto] w-[50%] justify-start items-end gap-2">
                <img
                  src={item.productId?.imageUrl}
                  alt="image"
                  className="h-[43px]"
                />
                <h1 className="text-zinc-700">{item.productId?.name}</h1>
              </div>
              <div className="flex flex-row gap-4 justify-center items-center">
                <h1 className="flex flex-row justify-start items-center">
                  ₹ <span className="text-red-600">{item?.price}</span>
                </h1>
                <h1 className="bg-zinc-300 text-zinc-700 not-[]: p-1 rounded-xl px-2">
                  x {item?.quantity}
                </h1>
              </div>
            </div>
          ))}
        </div>
        <div className=" mt-15 flex flex-row justify-between items-center bg-zinc-100 w-full py-5 px-1 rounded-md">
          <h1 className="text-xl text-zinc-700">Total</h1>
          <h1>
            ₹ <span className="text-red-600 text-xl">{formattedTotal}</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
