import { Outlet } from "react-router-dom"; // ✅ Correct import
import Header from "../ui/Header";

import styled from "styled-components";

const StyledAppLayout = styled.div`
  height: 100vh;
  font-family: figtree;
`;
const HeaderContainer = styled.header`
  grid-area: header;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 1rem 3.8rem 5.4rem;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function Applayout() {
  return (
    <StyledAppLayout>
      <HeaderContainer>
        <Header />
      </HeaderContainer>

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default Applayout;
