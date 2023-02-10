import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';

const Title = styled.h1`
  color: ${((props) => props.theme.text.white)};
  font-size: 30px;
  font-weight: bold;
  margin-top: 1em;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ImageWrapper = styled.div`
  margin: 1em 0 1em 0;

  h4 {
    text-align: center;
    font-size: 24px;
    color: ${((props) => props.theme.text.primary)};
  }

  img {
    border-radius: 0.6em;
    width: 3em;
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

  return (
    <div>
      <Title>오늘의 랭킹 🏅</Title>
      {contents.length ? (
        <List>
          {contents.map((content) => (
            <li key={content.id}>
              <Link to={`/contents/${content.tmdbId}`}>
                <ImageWrapper>
                  <img src={content.imageUrl} alt="imageUrl" />
                  <h4>{content.korTitle}</h4>
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
