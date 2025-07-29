import Dither from "./Dither";
import styled from "styled-components";
import Nav from "./Nav";
import { useNavigate } from "react-router";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  position: relative;
  z-index: 10;
`;
const StyledDiv1 = styled.div`
  position: relative;
`;
const HeaderContainer = styled.div`
  position: relative;
  /* height: 100px; */
  width: 100%;
  overflow: hidden;
  box-shadow: 1px 5px 5px grey;
`;
const DarkVeil = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0; /* sits behind the content */
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

function Header() {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <DarkVeil>
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </DarkVeil>
      <StyledDiv1>
        <StyledDiv className="w-full h-20 bg-transparent backdrop-blur-[1px]  border-zinc-500 shadow-xl/10">
          <div className="flex flex-row justify-center items-center">
            {/* <img
              src="logo-skatchel.png"
              className="w-30"
              onClick={() => navigate("/home")}
            /> */}
            <h1
              className="text-4xl font-semibold font-figtree text-white"
              onClick={() => navigate("/home")}
            >
              Skatchel
            </h1>
          </div>
          <Nav />
        </StyledDiv>
      </StyledDiv1>
    </HeaderContainer>
  );
}

export default Header;
