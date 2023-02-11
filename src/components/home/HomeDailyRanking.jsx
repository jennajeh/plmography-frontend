/* eslint-disable no-plusplus */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';

const Title = styled.h1`
  color: ${((props) => props.theme.text.white)};
  font-size: 26px;
  font-weight: bold;
  margin: 5px 0 20px 0;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0 0 100px 0;
  gap: 1em;
`;

const ImageWrapper = styled.div`
  display: flex;
  margin: 5px 0 5px 0;
  width: 500px;
  height: 50px;
  background-color: ${((props) => props.theme.colors.second)};
  border-radius: 10px;

  p {
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-size: 27px;
    font-weight: 800;
  }

  span {
    display: flex;
    align-items: center;
    padding-left: 17px;
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    color: ${((props) => props.theme.text.primary)};
  }

  img {
    object-fit: cover;
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
`;

const Error = styled.p`
  margin: 80px;
  font-weight: 700;
  font-size: ${((props) => props.theme.size.h4)};
  text-align: center;
`;

export default function HomeDailyRanking() {
  const contentStore = useContentStore();
  const { contents } = contentStore;
  let count = 1;

  return (
    <div>
      <Title>오늘의 TOP 6</Title>
      {contents.length ? (
        <List>
          {contents.map((content) => (
            <li key={content.id}>
              <Link to={`/contents/${content.tmdbId}`}>
                <ImageWrapper>
                  <img src={content.imageUrl} alt="imageUrl" />
                  <p>{count++}</p>
                  <span>{content.korTitle}</span>
                </ImageWrapper>
              </Link>
            </li>
          ))}
        </List>
      ) : (
        <Error>작품이 존재하지 않습니다.</Error>
      )}
    </div>
  );
}
