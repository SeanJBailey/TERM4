import styled from "styled-components";

const AccessibilityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoutButton = styled.button`
  display: inline-block;
  border: 0;
  padding: 8px 1rem;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;
  background-color: #e74c3c;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  margin-right: 3em;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #c0392b;
  }
`;

export default function Accessibility({ onLogout }) {
  return (
    <AccessibilityContainer>
      <LogoutButton onClick={onLogout}>Logout</LogoutButton>
    </AccessibilityContainer>
  );
}