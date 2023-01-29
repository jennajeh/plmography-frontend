/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import useContentStore from '../../hooks/useContentStore';

export default function ContentDetailPlatform() {
  const contentStore = useContentStore();

  const { content } = contentStore;

  const { platform } = content;

  const platformList = platform?.split(',');

  const handleClickPlatform = (url) => {
    window.open(`http://www.${url}.com`, '_blank');
  };

  return (
    <div>
      <h3 style={{ color: 'red' }}>여기서 감상할 수 있어요</h3>
      <br />
      <div>
        <ul>
          <li>
            <button type="button" onClick={() => handleClickPlatform(platformList?.[0])}>
              {platformList?.[0]}
              {' '}
              바로가기
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleClickPlatform(platformList?.[1])}>
              {platformList?.[1]}
              {' '}
              바로가기
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleClickPlatform(platformList?.[2])}>
              {platformList?.[2]}
              {' '}
              바로가기
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
