import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';
import useThemeStore from '../../hooks/useThemeStore';
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

export default function ContentDetailCollection() {
  const contentStore = useContentStore();
  const themeStore = useThemeStore();

  const { content } = contentStore;
  const { themes } = themeStore;

  const existTheme = themes.filter((theme) => theme.id === content.themeId);

  if (!content || !themes) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div>
      {existTheme.length !== 0 && (
        <ul>
          {existTheme.map((theme) => (
            <li key={theme.id}>
              <Title>이 작품이 담긴 컬렉션</Title>
              <Link to={`/themes/${theme.id}`}>
                <ContentWrapper>
                  <SmallPosterBox>
                    <img src={theme.image} alt={theme.title} />
                  </SmallPosterBox>
                  <TitleBox>
                    <p>
                      {theme.title}
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
