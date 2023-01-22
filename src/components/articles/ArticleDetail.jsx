import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useArticleStore from '../../hooks/useArticleStore';
import useTmdbYoutubeApiStore from '../../hooks/useTmdbYoutubeApiStore';

const Container = styled.article`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: ${((props) => props.theme.size.h4)};
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin: 1em;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1em;

  img {
    width: 20em;
    height: 20em;
  }
`;

const Information = styled.div`
  margin: 1em;
`;

const Video = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 1em;

  p {
    font-size: ${((props) => props.theme.size.h6)};
    font-weight: bold;
    margin: 1em;
  }
`;

export default function ArticleDetail() {
  const articleStore = useArticleStore();
  const tmdbYoutubeApiStore = useTmdbYoutubeApiStore();
  const { article } = articleStore;
  const { videoUrl } = tmdbYoutubeApiStore;

  const {
    articleBody, title, image, contentId,
  } = article;

  if (!article) {
    <p>Loading...</p>;
  }

  return (
    <Container>
      <Title>{title}</Title>
      <ImageWrapper>
        <img src={image} alt={title} />
      </ImageWrapper>
      <Information>
        {articleBody}
      </Information>
      <Title>
        <Link to={`/contents/${contentId}`}>
          {title}
          {' '}
          👉🏻 클릭!
        </Link>
      </Title>
      <Video>
        {videoUrl && videoUrl.results.length > 0 ? (
          <>
            <p>
              🎬
              관련 영상 구경하기
            </p>
            <iframe
              title="video"
              src={`https://www.youtube-nocookie.com/embed/${videoUrl.results[0].key}?autoplay=0&mute=1&loop=0`}
              width="420"
              height="280"
            />
          </>
        ) : null}
      </Video>
    </Container>
  );
}
