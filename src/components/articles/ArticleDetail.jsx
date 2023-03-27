import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useArticleStore from '../../hooks/useArticleStore';
import useTmdbYoutubeApiStore from '../../hooks/useTmdbYoutubeApiStore';

const Container = styled.article`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${((props) => props.theme.text.white)};
`;

const Title = styled.h2`
  font-size: 1.5em;
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
    height: 100%;
  }
`;

const Information = styled.div`
  margin: 1em;
  line-height: 2;
`;

const Video = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  position: relative;
  padding-top: 56%;
  width: 100%;
  height: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Link to={`/contents/${contentId}`}>
        <Title>{title}</Title>
      </Link>
      <ImageWrapper>
        <img src={image} alt={title} />
      </ImageWrapper>
      <Information>
        {articleBody}
      </Information>
      {videoUrl && videoUrl?.results?.length > 0 && (
        <>
          <Title>
            🎬
            관련 영상 구경하기
          </Title>
          <Video>
            <iframe
              title="video"
              src={`https://www.youtube-nocookie.com/embed/${videoUrl?.results[0]?.key}?autoplay=0&mute=1&loop=0`}
              width="420"
              height="280"
            />
          </Video>
        </>
      )}
    </Container>
  );
}
