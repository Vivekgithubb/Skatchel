import { useEffect } from "react";
import { useNavigate } from "react-router";
import Typewriter from "typewriter-effect";

function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 4000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center text-3xl">
      <Typewriter
        options={{
          strings: ["Skatchel"],
          autoStart: true,
          loop: true,
          // delay: 60,
          cursor: "/",
        }}
      />
    </div>
  );
}

export default Landing;
