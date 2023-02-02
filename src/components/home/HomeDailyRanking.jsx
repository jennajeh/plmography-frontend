import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';

const Title = styled.h2`
  font-size: ${((props) => props.theme.size.h4)};
  font-weight: bold;
  margin-top: 1em;
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 1em;
`;

const ImageWrapper = styled.div`
  img {
    width: 4em;
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
  const count = 0;

  return (
    <div>
      <Title>오늘의 랭킹 🏅</Title>
      {contents.length ? (
        <List>
          {contents.map((content) => (
            <li key={content.id}>
              <span>{count + 1}</span>
              <Link to={`/contents/${content.tmdbId}`}>
                <ImageWrapper>
                  <img src={content.imageUrl} alt="imageUrl" />
                  {content.korTitle}
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
