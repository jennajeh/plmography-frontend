import styled from 'styled-components';
import { ReviewStar } from '../../assets/contents';

const Title = styled.h1`
  color: ${((props) => props.theme.text.white)};
  font-size: 26px;
  font-weight: bold;
  margin: 5px 0 25px 0;
`;

const Container = styled.article`
  display: flex;
  gap: 16px;
`;

const ContentsWrapper = styled.article`
  display: flex;
  flex-direction: column;
  background-color: ${((props) => props.theme.colors.second)};
  border-radius: 0.6em;
  margin: 0 0 100px 0;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  img {
    display: inline-block;
    border-radius: 0.6em;
    width: 203px;
    height: 280px;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: ${((props) => props.theme.text.white)};
    font-size: 18px;
    margin: 20px;
  }
`;

const RateBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 7px 20px;

  img {
    width: 20px;
  }

  span {
    color: ${((props) => props.theme.text.white)};
    font-size: 18px;
    margin: 0 0 0 5px;
  }
`;

export default function HomeExpireContents() {
  const trumanShow = 'https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/movie_poster_images/movie_45823_1542678716.jpg';
  const yourName = 'https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/movie_poster_images/movie_1836_1624521438.jpg';
  const mammaMia = 'https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/movie_poster_images/movie_15882_1582091200.jpg';
  const flipped = 'https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/movie_poster_images/280x400/movie_1609_1582255545.jpg';
  const identity = 'https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/movie_poster_images/movie_3997_1608690874.jpg';

  return (
    <>
      <Title>2월 넷플릭스 종료 예정작</Title>
      <Container>
        <ContentsWrapper>
          <ImageBox>
            <img src={trumanShow} alt="trumanShow" />
          </ImageBox>
          <InfoBox>
            <p>트루먼쇼</p>
            <RateBox>
              <img src={ReviewStar} alt="review-star" />
              <span>9.9</span>
            </RateBox>
          </InfoBox>
        </ContentsWrapper>
        <ContentsWrapper>
          <ImageBox>
            <img src={yourName} alt="yourName" />
          </ImageBox>
          <InfoBox>
            <p>너의 이름은</p>
            <RateBox>
              <img src={ReviewStar} alt="review-star" />
              <span>9.9</span>
            </RateBox>
          </InfoBox>
        </ContentsWrapper>
        <ContentsWrapper>
          <ImageBox>
            <img src={mammaMia} alt="mammaMia" />
          </ImageBox>
          <InfoBox>
            <p>맘마미아</p>
            <RateBox>
              <img src={ReviewStar} alt="review-star" />
              <span>9.9</span>
            </RateBox>
          </InfoBox>
        </ContentsWrapper>
        <ContentsWrapper>
          <ImageBox>
            <img src={flipped} alt="benjaminButton" />
          </ImageBox>
          <InfoBox>
            <p>플립</p>
            <RateBox>
              <img src={ReviewStar} alt="review-star" />
              <span>9.9</span>
            </RateBox>
          </InfoBox>
        </ContentsWrapper>
        <ContentsWrapper>
          <ImageBox>
            <img src={identity} alt="identity" />
          </ImageBox>
          <InfoBox>
            <p>23 아이덴티티</p>
            <RateBox>
              <img src={ReviewStar} alt="review-star" />
              <span>9.9</span>
            </RateBox>
          </InfoBox>
        </ContentsWrapper>
      </Container>
    </>
  );
}
