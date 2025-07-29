import styled from "styled-components";
import Card from "../ui/Card";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Sidebar from "../ui/Sidebar";
import { useFilter } from "../ui/useFilter";
import Loding from "../ui/Loding";

import { useAuthContext } from "../authContext/useAuthContext";

const BagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const BagGridContainer = styled.div`
  width: 100%;
  height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: figtree;
  padding: 1rem;
  box-sizing: border-box;
  /* border: 1px solid black; */
  border-radius: 10px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
`;

const H1 = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 90px;
  width: 100%;
  font-size: 14px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-family: marcellus;
`;

const Button = styled.button`
  background-color: ${(props) => (props.onn ? "red" : "transparent")};
  color: ${(props) => (props.onn ? "white" : "black")};
  border-radius: 26px;
  padding: 8px;
  border: ${(props) => (props.onn ? "none" : "1px solid white")};
  backdrop-filter: ${(props) => (props.onn ? "none" : "blur(4px)")};
  transition: all 0.3s ease;
`;

const Select = styled.select`
  background-color: #454545;
  border-radius: 10px;
  border: none;
  border-radius: 20px;
  color: white;
  padding: 10px;
  font-size: 10px;
  padding-right: 10px;
`;
const SidebarContainer = styled.aside`
  grid-area: sidebar;
  background-color: #f3f4f6;
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: auto 90%;
  grid-template-areas: "sidebar  div";
  gap: 12px;

  @media (min-width: 1500px) {
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-areas: "sidebar  div";
    gap: 12px;
  }
`;
const ScrollWrapper = styled.div`
  /* height: 500px; */
  /* overflow-y: auto; */
  /* position: relative; */

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* Firefox support */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
`;

function Shop() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");

  const { state } = useFilter();
  const { user } = useAuthContext();
  const [fav, setFav] = useState([]);
  const [onn, setOnn] = useState(false);

  const email = user.email;
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/products",
        { params: { type: state.type } },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [state.type]);
  const encodedEmail = useMemo(() => encodeURIComponent(email), [email]);
  useEffect(() => {
    if (onn) {
      axios
        .get(`http://localhost:5000/api/fav/get/${encodedEmail}`, {
          withCredentials: true,
        })
        .then((res) => {
          setFav(res.data || []);
        })
        .catch((err) => console.log(err.message));
    }
  }, [onn, encodedEmail]);

  if (!products) return <Loding />;
  const SortedData = [...products].sort((a, b) => {
    if (sort === "lowtohigh") return a.price - b.price;
    if (sort === "hightolow") return b.price - a.price;
  });
  function HandleFavButton() {
    setOnn((onn) => !onn);
  }

  return (
    <StyledDiv>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <ScrollWrapper>
        <H1>
          <Button onClick={HandleFavButton} onn={onn}>
            Favourites
          </Button>
          <div className="flex flex-row gap-3 items-center justify-center">
            <span>Sort By:</span>
            <Select onChange={(e) => setSort(e.target.value)}>
              <option value="lowtohigh" className="bg-white text-black">
                Price low to high{" "}
              </option>
              <option selected value="rec">
                Recommended
              </option>
              <option value="hightolow">Price high to low</option>
            </Select>
          </div>
        </H1>
        <BagGridContainer>
          <BagGrid>
            {onn ? (
              !fav.items || fav?.items.length === 0 ? (
                <div className="flex justify-center items-center w-full h-[80vh]">
                  <h1> No favourites, go on Add some..</h1>
                </div>
              ) : (
                fav?.items
                  ?.filter((item) => item !== null)
                  .map((item) => (
                    <Card
                      item={item}
                      key={item._id}
                      onn={onn}
                      setFav={setFav}
                      fav={fav}
                      email={encodedEmail}
                      removeLocally={(id) => {
                        setFav((prev) =>
                          prev?.filter(
                            (item) => (item.productId?._id || item._id) !== id
                          )
                        );
                      }}
                    />
                  ))
              )
            ) : (
              SortedData.map((item, i) => (
                <Card item={item} key={item._id} onn={onn} />
              ))
            )}
          </BagGrid>
        </BagGridContainer>
      </ScrollWrapper>
    </StyledDiv>
  );
}

export default Shop;
