import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  display: flex;
  background-color: ${((props) => props.theme.colors.first)};
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  :hover {
      color: ${((props) => props.theme.colors.first)};
    }
`;

export default StyledLink;
