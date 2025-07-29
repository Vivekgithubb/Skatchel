import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #2e2e2e;
  /* border: none; */
  width: 150px;
  border-radius: 10px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  color: white;
  font-weight: 600;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  box-sizing: border-box; /* ✅ Prevent size change when adding border */

  &:hover {
    background-color: #282828; /* More visible blue for focus */
    box-shadow: 1px 1px 10px rgb(42, 49, 66); /* Optional focus ring */
    outline: none; /* 🔥 Removes default browser outline */
  }
`;
function Button({ onClick, children }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default Button;
