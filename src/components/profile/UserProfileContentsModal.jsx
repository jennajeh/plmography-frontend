/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useContentStore from '../../hooks/useContentStore';
import useUserStore from '../../hooks/useUserStore';
import Button from '../common/Button';
import Title from '../common/Title';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.479);
  z-index: 999;
`;

const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40em;
  width: 30em;
  color: white;
  background-color: ${((props) => props.theme.text.fourthGrey)};
  padding-inline: 2rem;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  img {
    width: 5em;
    height: 3em;
  }
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex ;
  justify-content: center;
  padding-block: 20px;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;

  img {
    border-radius: 10px;
    width: 5em;
    height: 6em;
  }

  span {
    padding-inline: 1em;
  }
`;

const ButtonName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${((props) => props.theme.text.white)};

  span:first-child {
    font-size: 20px;
  }
`;

export default function UserProfileContentsModal({
  buttonName,
  count,
  userId,
  watchedContentIds,
  watchedContents,
  wishContentIds,
  wishContents,
}) {
  const [isWishOpen, setIsWishOpen] = useState(false);
  const [isWatchedOpen, setIsWatchedOpen] = useState(false);
  const wishModalRef = useRef(null);
  const watchedModalRef = useRef(null);
  const [accessToken] = useLocalStorage('accessToken', '');
  const userStore = useUserStore();
  const contentStore = useContentStore();
  const navigate = useNavigate();

  const watchedContentId = watchedContentIds?.join(',');
  const wishContentId = wishContentIds?.join(',');

  const handleClickBackground = (event) => {
    if (wishModalRef.current && !wishModalRef.current.contains(event.target)) {
      setIsWishOpen(false);
    }

    if (watchedModalRef.current && !watchedModalRef.current.contains(event.target)) {
      setIsWatchedOpen(false);
    }
  };

  const handleClickOpen = () => {
    if (buttonName === '찜했어요') {
      setIsWishOpen(true);

      return;
    }

    setIsWatchedOpen(true);
  };

  const handleClickWatched = async (id) => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    await contentStore.toggleWatched(id);

    userStore.fetchMe();
    contentStore.fetchWatchedContents({ userId, watchedContentId });
  };

  const handleClickWish = async (id) => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    await contentStore.toggleWish(id);

    userStore.fetchMe();
    contentStore.fetchWishContents({ userId, wishContentId });
  };

  useEffect(() => {
    if (isWishOpen || isWatchedOpen) {
      document.addEventListener('mousedown', handleClickBackground);
    }

    if (!isWishOpen || !isWatchedOpen) {
      document.removeEventListener('mousedown', handleClickBackground);
    }

    return () => {
      document.addEventListener('mousedown', handleClickBackground);
    };
  }, [isWishOpen, isWatchedOpen]);

  return (
    <>
      <StyledButton
        type="button"
        onClick={handleClickOpen}
      >
        <ButtonName>
          <span>{count}</span>
          <span>{buttonName}</span>
        </ButtonName>
      </StyledButton>
      {isWatchedOpen && (
        <Container>
          <Dialog ref={watchedModalRef}>
            <div>
              <Title size={25}>봤어요</Title>
              {watchedContents?.length === 0 ? (
                <div>내역이 없습니다</div>
              ) : (
                <ul>
                  {watchedContents?.map((watched, idx) => (
                    <li key={idx}>
                      <ContentBox>
                        <div>
                          <StyledLink to={`/contents/${watched.contentId}`}>
                            <img src={watched.imageUrl} alt="contentImage" />
                            <span>{watched.korTitle}</span>
                          </StyledLink>
                        </div>
                        <div>
                          <Button
                            width={70}
                            height={30}
                            bgcolor="#5e677c"
                            type="button"
                            onClick={() => handleClickWatched(watched.contentId)}
                          >
                            삭제
                          </Button>
                        </div>
                      </ContentBox>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ButtonBox>
              <Button
                width={70}
                height={30}
                bgcolor="#5e677c"
                type="button"
                onClick={() => setIsWatchedOpen(false)}
              >
                닫기
              </Button>
            </ButtonBox>
          </Dialog>
        </Container>
      )}
      {isWishOpen && (
        <Container>
          <Dialog ref={wishModalRef}>
            <div>
              <Title size={25}>찜했어요</Title>
              {wishContents?.length === 0 ? (
                <div>내역이 없습니다</div>
              ) : (
                <ul>
                  {wishContents?.map((wish, idx) => (
                    <li key={idx}>
                      <ContentBox>
                        <div>
                          <StyledLink to={`/contents/${wish.contentId}`}>
                            <img src={wish.imageUrl} alt="contentImage" />
                            <span>{wish.korTitle}</span>
                          </StyledLink>
                        </div>
                        <div>
                          <Button
                            width={70}
                            height={30}
                            bgcolor="#5e677c"
                            type="button"
                            onClick={() => handleClickWish(wish.contentId)}
                          >
                            삭제
                          </Button>
                        </div>
                      </ContentBox>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ButtonBox>
              <Button
                width={70}
                height={30}
                bgcolor="#5e677c"
                type="button"
                onClick={() => setIsWishOpen(false)}
              >
                닫기
              </Button>
            </ButtonBox>
          </Dialog>
        </Container>
      )}
    </>
  );
}
