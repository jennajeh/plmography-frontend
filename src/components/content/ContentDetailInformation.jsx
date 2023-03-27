/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';
import useTmdbYoutubeApiStore from '../../hooks/useTmdbYoutubeApiStore';
import useTmdbCreditsApiStore from '../../hooks/useTmdbCreditsApiStore';
import Title from '../common/Title';

const Container = styled.article`
  color: ${((props) => props.theme.text.white)};
  margin: 20px 0;
`;

const DescriptionBox = styled.div`
  margin: 20px 0;
  font-size: 16px;
  line-height: 25px;
`;

const Credits = styled.div`
  margin: 20px 0;
  font-size: 16px;
  line-height: 25px;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;

  p:first-child {
    font-size: 15px;
    text-align: center;
    width: 150px;
    border-bottom: 1px solid ${((props) => props.theme.text.fourthGrey)};
  }

  p:nth-of-type(2) {
    font-size: 14px;
    text-align: center;
    width: 150px;
    color: ${((props) => props.theme.text.fifthGrey)};
  }
`;

const VideoFrame = styled.div`
  display: flex;
  justify-content: center;
`;

export default function ContentDetailInformation() {
  const contentStore = useContentStore();
  const tmdbYoutubeApiStore = useTmdbYoutubeApiStore();
  const tmdbCreditsApiStore = useTmdbCreditsApiStore();

  const { content } = contentStore;
  // const { tmdbId, type, description } = content;
  const { description } = content;

  const { videoUrl } = tmdbYoutubeApiStore;
  const { credits, actors } = tmdbCreditsApiStore;

  // useEffect(() => {
  //   if (tmdbId) {
  //     tmdbYoutubeApiStore.fetchVideo(tmdbId, type);
  //     tmdbCreditsApiStore.fetchCredits(tmdbId, type);
  //   }
  // }, [tmdbId]);

  // useEffect(() => {
  //   tmdbCreditsApiStore.fetchActors();
  // }, [credits]);

  if (!credits || !actors || !content || !videoUrl) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Title>작품 정보</Title>
      <DescriptionBox>
        <p>{description}</p>
      </DescriptionBox>
      <Title>출연</Title>
      <Credits>
        {credits ? (
          <List>
            {actors.map((actor) => (
              <li key={actor.id}>
                <p>{actor.name}</p>
                <p>{actor.character}</p>
              </li>
            ))}
          </List>
        ) : (
          <p>정보가 존재하지 않습니다.</p>
        )}
      </Credits>
      <br />
      <div>
        <Title>관련 영상</Title>
      </div>
      <VideoFrame>
        {videoUrl && videoUrl?.results?.length > 0
          ? (
            <iframe
              title="video"
              src={`https://www.youtube-nocookie.com/embed/${videoUrl?.results[0]?.key}?autoplay=0&mute=1&loop=0`}
              width="900"
              height="506.25"
            />
          )
          : (
            <p>영상이 존재하지 않습니다.</p>
          )}
      </VideoFrame>
    </Container>
  );
}
