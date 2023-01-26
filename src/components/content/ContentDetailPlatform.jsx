/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import useContentStore from '../../hooks/useContentStore';

export default function ContentDetailPlatform() {
  const contentStore = useContentStore();

  const { content } = contentStore;

  const { platform } = content;

  const platformList = platform?.split(',');

  return (
    <div>
      <h3 style={{ color: 'red' }}>여기서 감상할 수 있어요</h3>
      <br />
      <div>
        <ul>
          <li>
            <a href="">
              {platformList?.[0]}
              {' '}
              바로가기
            </a>
          </li>
          <li>
            <a href="">
              {platformList?.[1]}
              {' '}
              바로가기
            </a>
          </li>
          <li>
            <a href="">
              {platformList?.[2]}
              {' '}
              바로가기
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
