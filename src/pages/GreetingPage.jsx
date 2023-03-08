import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin: 5em 0 2em 0;
`;

const StyledLink = styled(Link)`
  color: ${((props) => (props.theme.colors.white))};
  background-color: ${((props) => (props.theme.colors.first))};
  border-radius: 10px;
  border: none;
  font-size: 14px;
  padding: .5em 2em;

  :hover {
    color: ${((props) => props.theme.colors.first)}
  }
`;

export default function GreetingPage() {
  return (
    <Container>
      <Title>회원가입이 완료되었습니다.</Title>
      <StyledLink
        to="/"
      >
        홈화면으로 돌아가기
      </StyledLink>
    </Container>
  );
}
