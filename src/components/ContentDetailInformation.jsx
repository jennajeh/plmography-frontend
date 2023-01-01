/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import useContentStore from '../hooks/useContentStore';
import useYoutubeApiStore from '../hooks/useYoutubeApiStore';

export default function ContentDetailInformation() {
  const contentStore = useContentStore();

  const { content } = contentStore;

  const { tmdbId, type, description } = content;

  const youtubeApiStore = useYoutubeApiStore();

  const { videoUrl } = youtubeApiStore;

  useEffect(() => {
    if (tmdbId) {
      youtubeApiStore.fetchVideo(tmdbId, type);
    }
  }, [tmdbId]);

  return (
    <>
      <div>
        <h3>작품 정보</h3>
        <br />
        <p>{description}</p>
      </div>
      <br />
      <div>
        <h3>감독/출연</h3>
        {/* 출연진 */}
      </div>
      <br />
      <div>
        <h3>관련 영상</h3>
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
