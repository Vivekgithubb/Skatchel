import { useState } from "react";
import styled from "styled-components";
import { useFilter } from "./useFilter";

const FilterDiv = styled.div`
  padding: 5px;
  margin-left: 5px;
  margin-top: 20px;
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
`;

const FilterButton = styled.button`
  padding: 10px;
  margin: 5px;
  width: 90%;
  text-align: left;
  background: ${(props) => (props.isActiveFilter ? "#dbeafe" : "transparent")};
  color: ${(props) => (props.isActiveFilter ? "#1e40af" : "#000")};
  font-weight: ${(props) => (props.isActiveFilter ? "bold" : "normal")};
  font-size: ${(props) => (props.isActiveFilter ? "15px" : "12px")};
  transition: 0.2s;
  border-radius: 8px;
  cursor: pointer;

  /* &:hover {
    background-color: #f0f0f0;
  } */
`;

// const FilterSort = styled.div`
//   margin-top: 30px;
//   margin-left: 5px;
// `;
// const SortButton = styled.button`
//   padding: 10px;
//   margin: 5px;
//   width: 90%;
//   text-align: left;
//   background: ${(props) => (props.isActiveSort ? "#dbeafe" : "transparent")};
//   color: ${(props) => (props.isActiveSort ? "#1e40af" : "#000")};
//   font-weight: ${(props) => (props.isActiveSort ? "bold" : "normal")};
//   font-size: ${(props) => (props.isActiveSort ? "16px" : "14px")};
//   transition: 0.2s;
//   border-radius: 8px;
//   cursor: pointer;

/* &:hover {
    background-color: #f0f0f0;
  } */
// `;

function Sidebar() {
  const [isactiveFilter, setActiveFilter] = useState("bags");
  const { dispatch } = useFilter();
  // const [isactiveSort, setActiveSort] = useState("recommended");
  return (
    <div className="w-full bg-white h-full border-r-2 overflow-hidden border-zinc-500 s ">
      <FilterDiv>
        <h1 className="text-[15px] font-semibold font-figtree">Filters</h1>
        <div className="text-[10px] border-grey flex flex-col items-start w-[80%] rounded-lg ">
          <FilterButton
            isActiveFilter={isactiveFilter === "bags"}
            onClick={() => {
              dispatch({ type: "SetFilter", payload: "bag" });
              setActiveFilter("bags");
            }}
          >
            Bags
          </FilterButton>
          <FilterButton
            isActiveFilter={isactiveFilter === "shirts"}
            onClick={() => {
              dispatch({ type: "SetFilter", payload: "shirt" });
              setActiveFilter("shirts");
            }}
          >
            Shirts
          </FilterButton>
          <FilterButton
            isActiveFilter={isactiveFilter === "pants"}
            onClick={() => {
              dispatch({ type: "SetFilter", payload: "pant" });
              setActiveFilter("pants");
            }}
          >
            Pants
          </FilterButton>
        </div>
      </FilterDiv>

      {/* <FilterSort>
        <h1 className="font-figtree text-[18px]">Sort By</h1>
        <div>
          <SortButton
            isActiveSort={isactiveSort === "recommended"}
            onClick={() => setActiveSort("recommended")}
          >
            Relevance: Recommended
          </SortButton>

          <SortButton
            isActiveSort={isactiveSort === "lowToHigh"}
            onClick={() => setActiveSort("lowToHigh")}
          >
            Price: Low to High
          </SortButton>

          <SortButton
            isActiveSort={isactiveSort === "highToLow"}
            onClick={() => setActiveSort("highToLow")}
          >
            Price: High to Low
          </SortButton>
        </div>
      </FilterSort> */}
    </div>
  );
}

export default Sidebar;
