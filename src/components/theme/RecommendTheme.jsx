import styled from 'styled-components';
import useThemeStore from '../../hooks/useThemeStore';
import HitTheme from './HitTheme';

const SubTitle = styled.h3`
  font-size: ${((props) => props.theme.size.h5)};
  font-weight: bold;
  margin-top: 1em;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1em;
`;

const Error = styled.p`
  margin: 80px;
  font-weight: 700;
  font-size: ${((props) => props.theme.size.h4)};
  text-align: center;
`;

export default function RecommendTheme() {
  const themeStore = useThemeStore();

  const { hitThemes } = themeStore;

  if (!hitThemes) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div>
      <SubTitle>추천 큐레이션</SubTitle>
      {hitThemes.length ? (
        <List>
          {hitThemes.map((hitTheme) => (
            <HitTheme
              key={hitTheme.id}
              hitTheme={hitTheme}
            />
          ))}
        </List>
      ) : (
        <Error>작품이 존재하지 않습니다.</Error>
      )}
    </div>
  );
}
