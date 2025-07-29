import Typewriter from "typewriter-effect";

function Loding() {
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

export default Loding;
