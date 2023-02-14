import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useArticleStore from '../../hooks/useArticleStore';
import useContentStore from '../../hooks/useContentStore';
import Title from '../common/Title';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SmallPosterBox = styled.div`
  width: 99px;
  height: 143px;
  z-index: 3;
  right: 16px;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    height: 143px;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 6px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1em;

  p {
    line-height: 1.3em;
  }
`;

export default function ContentDetailArticle() {
  const contentStore = useContentStore();
  const articleStore = useArticleStore();
  const { content } = contentStore;
  const { articles } = articleStore;

  const existArticle = articles.filter((article) => article.contentId === content.tmdbId);

  if (!content || !articles) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div>
      {existArticle.length !== 0 && (
        <ul>
          {existArticle.map((article) => (
            <li key={article.id}>
              <Title>이 작품이 담긴 이야기</Title>
              <Link to={`/articles/${article.contentId}`}>
                <ContentWrapper>
                  <SmallPosterBox>
                    <img
                      src={article.image}
                      alt={article.title}
                    />
                  </SmallPosterBox>
                  <TitleBox>
                    <p>
                      {content.korTitle}
                    </p>
                    <p>
                      {article.title}
                    </p>
                  </TitleBox>
                </ContentWrapper>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
