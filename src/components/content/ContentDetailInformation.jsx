/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import useContentStore from '../../hooks/useContentStore';
import useTmdbYoutubeApiStore from '../../hooks/useTmdbYoutubeApiStore';
import useTmdbCreditsApiStore from '../../hooks/useTmdbCreditsApiStore';

export default function ContentDetailInformation() {
  const contentStore = useContentStore();

  const { content } = contentStore;

  const { tmdbId, type, description } = content;

  const tmdbYoutubeApiStore = useTmdbYoutubeApiStore();

  const { videoUrl } = tmdbYoutubeApiStore;

  const tmdbCreditsApiStore = useTmdbCreditsApiStore();

  const { credits, actors } = tmdbCreditsApiStore;

  useEffect(() => {
    if (tmdbId) {
      tmdbYoutubeApiStore.fetchVideo(tmdbId, type);
      tmdbCreditsApiStore.fetchCredits(tmdbId, type);
    }
  }, [tmdbId]);

  useEffect(() => {
    tmdbCreditsApiStore.fetchActors();
  }, [credits]);

  if (!credits) {
    <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <h3 style={{ color: 'red' }}>작품 정보</h3>
        <br />
        <p>{description}</p>
      </div>
      <br />
      <div>
        <h3 style={{ color: 'red' }}>출연</h3>
        <ul>
          {credits ? (
            <li>
              {actors.map((element) => (
                <div key={element.id}>
                  <p>
                    {element.character}
                    {' '}
                    역 -
                    {' '}
                    {element.name}
                  </p>
                </div>
              ))}
            </li>
          ) : (
            <p>정보가 존재하지 않습니다.</p>
          )}
        </ul>
      </div>
      <br />
      <div>
        <h3 style={{ color: 'red' }}>관련 영상</h3>
      </div>
      <div>
        {videoUrl && videoUrl.results.length > 0
          ? (
            <iframe
              title="video"
              src={`https://www.youtube-nocookie.com/embed/${videoUrl.results[0].key}?autoplay=0&mute=1&loop=0`}
              width="420"
              height="280"
            />
          )
          : (
            <p>영상이 존재하지 않습니다.</p>
          )}
      </div>
    </>
  );
}
