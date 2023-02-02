import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useArticleStore from '../../hooks/useArticleStore';
import useContentStore from '../../hooks/useContentStore';

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
`;

export default function ContentDetailArticle() {
  const contentStore = useContentStore();
  const articleStore = useArticleStore();
  const { content } = contentStore;
  const { articles } = articleStore;

  const isArticleExist = articles.filter((article) => article.contentId === content.tmdbId);

  return (
    <div>
      {isArticleExist.length ? (
        <ul>
          {isArticleExist.map((article) => (
            <li key={article.id}>
              <h1 style={{ color: 'red' }}>이 작품이 담긴 이야기</h1>
              <Link to={`/articles/${article.contentId}`}>
                <ContentWrapper>
                  <SmallPosterBox>
                    <img src={article.image} alt={article.title} />
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
            </li>,
          ))}
        </ul>
      ) : null}
    </div>
  );
}
