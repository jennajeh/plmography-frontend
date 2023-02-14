/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useContentStore from '../../hooks/useContentStore';
import dateFormat from '../../utils/dateFormat';

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
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const Dialog = styled.div`
  height: 40em;
  width: 30em;
  background-color: white;
  border-radius: 3px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  img {
    width: 5em;
    height: 3em;
  }
`;

const Content = styled.div`
  display: flex;
  margin: 1em;
  
  img {
    width: 6em;
    height: 6em;
  }
`;

const ButtonName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: ${((props) => props.theme.text.white)};

  span:first-child {
    font-size: 20px;
  }
`;

export default function UserProfileInfoModal({
  buttonName,
  count,
  userId,
  watchedContentIds,
  watchedContents,
  wishContentIds,
  wishContents,
  notDeletedMyReviews,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const [accessToken] = useLocalStorage('accessToken', '');
  const contentStore = useContentStore();
  const navigate = useNavigate();

  const watchedContentId = watchedContentIds?.join(',');
  const wishContentId = wishContentIds?.join(',');

  const handleClickBackground = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleClickWatched = async (id) => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    await contentStore.toggleWatched(id);

    contentStore.fetchWatchedContents({ userId, watchedContentId });
  };

  const handleClickWish = async (id) => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    await contentStore.toggleWish(id);

    contentStore.fetchWishContents({ userId, wishContentId });
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickBackground);
    }

    if (!isOpen) {
      document.removeEventListener('mousedown', handleClickBackground);
    }

    return () => {
      document.addEventListener('mousedown', handleClickBackground);
    };
  }, [isOpen]);

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <ButtonName>
          <span>{count}</span>
          <span>{buttonName}</span>
        </ButtonName>
      </Button>
      {isOpen && watchedContentIds?.length && (
        <Container>
          <Dialog ref={modalRef}>
            <div>
              <span>봤어요</span>
              {watchedContents?.length === 0 ? (
                <div>내역이 없습니다</div>
              ) : (
                <ul>
                  {watchedContents?.map((watched, idx) => (
                    <li key={idx}>
                      <Content>
                        <Link to={`/contents/${watched.contentId}`}>
                          <img src={watched.imageUrl} alt="contentImage" />
                        </Link>
                      </Content>
                      <button
                        type="button"
                        onClick={() => handleClickWatched(watched.contentId)}
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="button" onClick={() => setIsOpen(false)}>닫기</button>
          </Dialog>
        </Container>
      )}
      {isOpen && wishContentIds?.length && (
        <Container>
          <Dialog ref={modalRef}>
            <div>
              <h3>찜했어요</h3>
              {wishContents?.length === 0 ? (
                <div>내역이 없습니다</div>
              ) : (
                <ul>
                  {wishContents?.map((wish, idx) => (
                    <li key={idx}>
                      <Content>
                        <Link to={`/contents/${wish.contentId}`}>
                          <img src={wish.imageUrl} alt="contentImage" />
                        </Link>
                      </Content>
                      <button
                        type="button"
                        onClick={() => handleClickWish(wish.contentId)}
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="button" onClick={() => setIsOpen(false)}>닫기</button>
          </Dialog>
        </Container>
      )}
      {isOpen && notDeletedMyReviews?.length && (
        <Container>
          <Dialog ref={modalRef}>
            <div>
              <h3>작성한 리뷰</h3>
              {notDeletedMyReviews?.length === 0 ? (
                <div>내역이 없습니다</div>
              ) : (
                <ul>
                  {notDeletedMyReviews?.map((review, idx) => (
                    <li key={idx}>
                      <div>
                        <Link to={`/contents/${review.contentId}`}>
                          <p>{review.starRate}</p>
                          <p>{review.reviewBody}</p>
                          <p>{dateFormat(review.createdAt)}</p>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="button" onClick={() => setIsOpen(false)}>닫기</button>
          </Dialog>
        </Container>
      )}
    </>
  );
}
