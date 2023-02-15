import { useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useThemeStore from '../../hooks/useThemeStore';
import Title from '../common/Title';
import Pagination from '../page/Pagination';
import Theme from './Theme';

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

  if (!themes) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Title size={20} weight="bold">테마 리스트</Title>
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
