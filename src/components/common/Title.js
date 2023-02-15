import styled from 'styled-components';

const Title = styled.h1`
  font-size: ${(props) => `${props.size}` || 18}px;
  font-weight: ${(props) => `${props.weight}` || 600};
  margin: 30px 0;
  color: ${((props) => props.theme.text.white)};
`;

export default Title;
