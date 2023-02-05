import { useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useThemeStore from '../../hooks/useThemeStore';
import Pagination from '../page/Pagination';
import Theme from './Theme';

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

export default function ThemeList() {
  const themeStore = useThemeStore();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { themes } = themeStore;
  const page = searchParams.get('page') ?? 1;

  if (!themes) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div>
      <SubTitle>테마 리스트</SubTitle>
      {themes.length ? (
        <>
          <List>
            {themes.map((theme) => (
              <Theme
                key={theme.id}
                theme={theme}
              />
            ))}
          </List>
          <Pagination
            url={location.pathname}
            total={themeStore.totalPages}
            current={searchParams.get('page') ?? 1}
          />
        </>
      ) : (
        <Error>작품이 존재하지 않습니다.</Error>
      )}
    </div>
  );
}
