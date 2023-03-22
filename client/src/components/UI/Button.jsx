import styled from "styled-components";

const Button = ({
  name,
  icon,
  onClick,
  background,
  bradious,
  color,
  bpadding,
}) => {
  return (
    <ButtonStyle
      background={background}
      padding={bpadding}
      borderRadius={bradious}
      color={color}
      onClick={onClick}
    >
      {icon}
      {name}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button`
  outline: none;
  border: none;
  font-family: inherit;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  box-shadow: var(--theme-box-shadow);
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};

  &:hover {
    background-color: ${(props) => props.color};
    color: ${(props) => props.background};
  }
`;

export default Button;
