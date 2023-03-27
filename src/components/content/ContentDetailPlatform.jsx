/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';
import { Arrow } from '../../assets/common';
import PLATFORMS from '../../constants/platforms';

const Container = styled.article`
  height: 100%;
  color: ${((props) => props.theme.text.white)};
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: ${((props) => props.theme.text.white)};
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 30px;
`;

const PlatformButton = styled.button`
  display: flex;
  border: none;
  border-radius: 5px;
  justify-content: space-between;
  background-color: ${((props) => props.theme.colors.second)};
  color: ${((props) => props.theme.text.white)};
  width: 100%;
  height: 43px;
  padding: 10px;

  p {
    text-transform: uppercase;
    font-weight: 400;
  }

  img {
    width: 27px;
    margin-right: 10px;
  }
`;

const ArrowWrapper = styled.div`
  display: flex;

  span {
    font-size: 12px;
    padding: 5px;
    color: ${((props) => props.theme.colors.first)};
  }
  
  img {
    width: 8px;
    padding-left: 1px;
  }
`;

const PlatformInfo = styled.div`
  display: flex;
  align-items: center;
`;

const NoPlatform = styled.div`
  display: flex;
  justify-content: center;
`;

export default function ContentDetailPlatform() {
  const contentStore = useContentStore();

  const { content } = contentStore;

  const { platform } = content;

  const platformList = platform?.split(', ');

  const handleClickPlatform = (url) => {
    window.open(`https://${url}.com`, '_blank');
  };

  const getImage = (name) => {
    const [a] = PLATFORMS.filter((i) => i.name === name);

    return a.image;
  };

  const getTitle = (name) => {
    const [a] = PLATFORMS.filter((i) => i.name === name);

    return a.title;
  };

  if (!content) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Title>여기서 감상할 수 있어요</Title>
      <br />
      <div>
        {platformList?.length > 0 ? (
          <List>
            {platformList.map((item, idx) => (
              <li key={idx}>
                <PlatformButton
                  type="button"
                  onClick={() => handleClickPlatform(item)}
                >
                  <PlatformInfo>
                    <img
                      src={getImage(item)}
                      alt={item}
                    />
                    <p>{getTitle(item)}</p>
                  </PlatformInfo>
                  <ArrowWrapper>
                    <span>
                      정액제 보러가기
                    </span>
                    <img src={Arrow} alt="arrow" />
                  </ArrowWrapper>
                </PlatformButton>
              </li>
            ))}
          </List>
        ) : (
          <NoPlatform>
            <p>시청 가능한 플랫폼이 없습니다.</p>
          </NoPlatform>
        )}
      </div>
    </Container>
  );
}
