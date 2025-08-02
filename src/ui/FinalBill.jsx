import { useNavigate } from "react-router";
import styled from "styled-components";

const StyledBill = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 80% auto;
  margin-top: 20px;
  padding: 10px 0;
  font-family: figtree;
  border: 1px solid grey;
  margin-right: 10px;
  border-radius: 10px;
  padding-left: 9px;
  background-color: #f3f3f3;
`;

const BillLabel = styled.div`
  font-size: 1.2rem; /* Tailwind's text-xl */
  color: #000022;
`;

const BillRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem; /* Tailwind's gap-5 */
  height: 100%;
  /* margin-right: 20px; */
  align-items: flex-end;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 8px;
`;

const TotalAmount = styled.div`
  font-size: 1.55rem;
  font-weight: 600;
  color: #e90000; /* Tailwind's text-red-600 */
`;

const CheckoutButton = styled.button`
  background-color: #046ae7; /* Tailwind's bg-blue-400 */
  color: white;
  padding: 0.5rem 0.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 5px;
  font-weight: 500;
  font-size: 15px;

  &:hover {
    background-color: #3b82f6; /* Slightly darker on hover */
  }
`;
function FinalBill({ total }) {
  const navigate = useNavigate();
  function handleClick() {
    console.log(total);
    navigate("/cart/checkout");
  }
  return (
    <StyledBill>
      <div className="flex justify-start items-center gap-4">
        <BillLabel>Total : </BillLabel>
        <TotalAmount>₹{total}</TotalAmount>
      </div>

      <BillRight>
        <p>Shipping: ₹0.00</p>
        <p>Platform Fee: ₹0.00</p>
        <CheckoutButton onClick={handleClick}>CheckOut</CheckoutButton>
      </BillRight>
    </StyledBill>
  );
}

export default FinalBill;
