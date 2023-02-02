import styled from 'styled-components';

const Title = styled.h2`
  font-size: ${((props) => props.theme.size.h4)};
  font-weight: bold;
  margin-top: 1em;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  
  img {
    width: 4em;
  }
`;

export default function HomeExpireContents() {
  const trumanShow = 'https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/movie_poster_images/movie_45823_1542678716.jpg';
  const yourName = 'https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/movie_poster_images/movie_1836_1624521438.jpg';
  const mammaMia = 'https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/movie_poster_images/movie_15882_1582091200.jpg';
  const benjaminButton = 'https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/movie_poster_images/movie_3601_1600320638.jpg';
  const identity = 'https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/movie_poster_images/movie_3997_1608690874.jpg';

  return (
    <div>
      <Title>2월 넷플릭스 종료 예정작 ⏳ </Title>
      <ImageWrapper>
        <p>트루먼쇼</p>
        <img src={trumanShow} alt="trumanShow" />
      </ImageWrapper>
      <ImageWrapper>
        <p>너의 이름은</p>
        <img src={yourName} alt="yourName" />
      </ImageWrapper>
      <ImageWrapper>
        <p>맘마미아</p>
        <img src={mammaMia} alt="mammaMia" />
      </ImageWrapper>
      <ImageWrapper>
        <p>벤자민 버튼의 시간은 거꾸로 간다</p>
        <img src={benjaminButton} alt="benjaminButton" />
      </ImageWrapper>
      <ImageWrapper>
        <p>23 아이덴티티</p>
        <img src={identity} alt="identity" />
      </ImageWrapper>
    </div>
  );
}
