import styled from 'styled-components';

const Button = styled.button`
  display: block;

  width: ${(props) => `${props.width}` || 35}px;
  height: ${(props) => `${props.height}` || 35}px;

  border: none;
  border-radius: 5px;
  cursor: ${(props) => `${props.cursor}` || 'pointer'};

  color: ${((props) => props.theme.text.white)};
  background-color: ${(props) => `${props.bgcolor}` || props.theme.colors.primary};

  :hover {
      color: ${((props) => props.theme.colors.first)};
    }

  font-size: ${(props) => `${props.size}` || 16}px;
  font-weight: 700;
`;

export default Button;
