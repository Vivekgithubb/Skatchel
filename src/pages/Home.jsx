import { useAuthContext } from "../authContext/useAuthContext";
import TextType from "../ui/TextType";
import GridMotion from "../ui/GridMotion";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  /* gap: 1rem; */
  width: 100vw;
  height: 100vh;
  @media (min-width: 1520px) {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
  }
`;

const TextGrid = styled.div`
  display: grid;
  height: 40vh;
  justify-items: start;
  align-items: start;

  @media (min-width: 1520px) {
    width: 40vw;
    height: 100vh;
    display: flex;

    flex-direction: column;
    align-items: start;
    justify-content: center;
  }
`;

const Heading = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  font-family: Figtree;
  width: 200px;
  word-break: break-word;
  /* display: flex;
  justify-content: start;
  align-items: start; */

  @media (min-width: 1520px) {
    font-family: figtree;
    font-weight: 400;
    line-height: 70px;
    font-size: 3rem;
    width: 430px;

    height: 100%;
  }
`;
const Heading1 = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  font-family: Figtree;
  width: 200px;
  word-break: break-word;

  @media (min-width: 1520px) {
    font-family: figtree;
    font-weight: 400;
    line-height: 70px;

    line-height: 30px;
    font-size: 1.5rem;
    width: 200px;
    height: 100%;
  }
`;
function Home() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  console.log(user);
  const items = [
    <img src="/bags/bag1.png" onClick={() => navigate("/shop")} />,
    <img src="/shirts/shirt4.png" onClick={() => navigate("/shop")} />,
    <img src="/pants/pant7.png" onClick={() => navigate("/shop")} />,
    <img src="/bags/bag1.png" onClick={() => navigate("/shop")} />,
    <img src="/shirts/shirt4.png" onClick={() => navigate("/shop")} />,
    <img src="/pants/pant7.png" onClick={() => navigate("/shop")} />,
    <img src="/bags/bag1.png" onClick={() => navigate("/shop")} />,
    <img src="/shirts/shirt4.png" onClick={() => navigate("/shop")} />,
    <img src="/pants/pant7.png" onClick={() => navigate("/shop")} />,
    <img src="/bags/bag1.png" onClick={() => navigate("/shop")} />,
    <img src="/shirts/shirt4.png" onClick={() => navigate("/shop")} />,
    <img src="/pants/pant7.png" onClick={() => navigate("/shop")} />,
    <img src="/bags/bag1.png" onClick={() => navigate("/shop")} />,
    <img src="/shirts/shirt4.png" onClick={() => navigate("/shop")} />,
    <img src="/pants/pant7.png" onClick={() => navigate("/shop")} />,
    <img src="/bags/bag1.png" onClick={() => navigate("/shop")} />,
    <img src="/shirts/shirt4.png" onClick={() => navigate("/shop")} />,
    <img src="/pants/pant7.png" onClick={() => navigate("/shop")} />,
    <img src="/bags/bag1.png" onClick={() => navigate("/shop")} />,
    <img src="/shirts/shirt4.png" onClick={() => navigate("/shop")} />,
    <img src="/pants/pant7.png" onClick={() => navigate("/shop")} />,
    <img src="/bags/bag1.png" onClick={() => navigate("/shop")} />,
    <img src="/shirts/shirt4.png" onClick={() => navigate("/shop")} />,
    <img src="/pants/pant7.png" onClick={() => navigate("/shop")} />,
    <img src="/bags/bag1.png" onClick={() => navigate("/shop")} />,
    <img src="/shirts/shirt4.png" onClick={() => navigate("/shop")} />,
    <img src="/pants/pant7.png" onClick={() => navigate("/shop")} />,
  ];

  return (
    // <div className="flex flex-row justify-start gap-20 items-start w-[100vw] h-[100vh]">
    //   <div className="grid grid-rows-2 h-full  3xl:w-[26.2vw] ">
    //     <div className="text-2xl 3xl:text-7xl bold w-[200px] 3xl:w-[430px] break-words font-figtree flex justify-between items-center">
    //       <TextType
    //         text={[`Welcome,\n${user ? user.name : " "}`]}
    //         typingSpeed={160}
    //         pauseDuration={1500}
    //         showCursor={false}
    //         cursorCharacter="_"
    //         textColors="black"
    //       />
    //     </div>
    //     <div className="text-2xl 3xl:text-7xl bold w-[430px] break-words font-figtree flex justify-between items-center">
    //       <TextType
    //         text={[
    //           "To, \nThe place\nwhere\nyour Clothing\ndreams\nbecome a\nreality",
    //         ]}
    //         typingSpeed={30}
    //         pauseDuration={500}
    //         showCursor={false}
    //         cursorCharacter="_"
    //         textColors="black"
    //       />
    //     </div>
    //   </div>

    //   <GridMotion items={items} />
    // </div>
    <Container>
      <TextGrid>
        <Heading>
          <TextType
            text={[`Welcome,\n${user ? user.name : " "}`]}
            typingSpeed={160}
            pauseDuration={1500}
            showCursor={false}
            cursorCharacter="_"
            textColors="black"
          />
        </Heading>
        <Heading1>
          <TextType
            text={[
              "To,\nThe place where your Clothing dreams become a reality",
            ]}
            typingSpeed={30}
            pauseDuration={500}
            showCursor={false}
            cursorCharacter="_"
            textColors="black"
          />
        </Heading1>
      </TextGrid>

      <GridMotion items={items} />
    </Container>
  );
}

export default Home;
