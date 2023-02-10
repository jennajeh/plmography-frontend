import styled from 'styled-components';

const Container = styled.article`
  display: flex;
  gap: 16px;
`;

const Title = styled.h2`
  font-size: ${((props) => props.theme.size.h4)};
  font-weight: bold;
  margin-top: 1em;
`;

const ImageWrapper = styled.div`
  margin: 1em 0 1em 0;
  display: inline-block;
  vertical-align: middle;

  img {
    border-radius: 0.6em;
    width: 7em;
    display: inline-block;
    vertical-align: middle;
  }

  p {
    font-size: ${((props) => props.theme.size.h6)};
    margin-left: 1em;
    display: inline-block;
    vertical-align: middle;
  }
`;

export default function HomeExpireContents() {
  const trumanShow = 'https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/movie_poster_images/movie_45823_1542678716.jpg';
  const yourName = 'https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/movie_poster_images/movie_1836_1624521438.jpg';
  const mammaMia = 'https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/movie_poster_images/movie_15882_1582091200.jpg';
  const benjaminButton = 'https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/movie_poster_images/movie_3601_1600320638.jpg';
  const identity = 'https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/movie_poster_images/movie_3997_1608690874.jpg';

  return (
    <>
      <Title>2월 넷플릭스 종료 예정작 ⏳ </Title>
      <Container>
        <ImageWrapper>
          <img src={trumanShow} alt="trumanShow" />
          <p>트루먼쇼</p>
        </ImageWrapper>
        <ImageWrapper>
          <img src={yourName} alt="yourName" />
          <p>너의 이름은</p>
        </ImageWrapper>
        <ImageWrapper>
          <img src={mammaMia} alt="mammaMia" />
          <p>맘마미아</p>
        </ImageWrapper>
        <ImageWrapper>
          <img src={benjaminButton} alt="benjaminButton" />
          <p>벤자민 버튼의 시간은 거꾸로 간다</p>
        </ImageWrapper>
        <ImageWrapper>
          <img src={identity} alt="identity" />
          <p>23 아이덴티티</p>
        </ImageWrapper>
      </Container>
    </>
  );
}
