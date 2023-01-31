/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useSubscribeStore from '../../hooks/useSubscribeStore';
import useUserStore from '../../hooks/useUserStore';

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

export default function SubscribeModal({
  buttonName, followings, followers,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const userStore = useUserStore();
  const subscribeStore = useSubscribeStore();
  const modalRef = useRef(null);
  const { user } = userStore;
  const { id: userId } = user;
  const page = searchParams.get('page') ?? 1;

  const handleClickBackground = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleClickUnFollow = async (followingUserId) => {
    await subscribeStore.unFollow(followingUserId);

    subscribeStore.fetchFollowingList({ userId, page, size: 10 });
    subscribeStore.fetchFollowerList({ userId, page, size: 10 });
  };

  const handleClickFollow = async (followerUserId) => {
    await subscribeStore.follow(followerUserId);

    subscribeStore.fetchFollowerList({ userId, page, size: 10 });
    subscribeStore.fetchFollowingList({ userId, page, size: 10 });
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
      <button
        type="button"
        onClick={() => setIsOpen(true)}
      >
        {buttonName}
      </button>
      {isOpen && followings?.length && (
        <Container>
          <Dialog ref={modalRef}>
            <div>
              <div>팔로잉</div>
              {followings?.length === 0 ? (
                <div>팔로잉 내역이 없습니다</div>
              ) : (
                <ul>
                  {followings?.map((following, idx) => (
                    <li key={idx}>
                      <img src={following.profileImage} alt="profile" />
                      {following.nickname}
                      <button type="button" onClick={() => handleClickUnFollow(following.userId)}>팔로우 취소</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="button" onClick={() => setIsOpen(false)}>닫기</button>
          </Dialog>
        </Container>
      )}
      {isOpen && followers?.length && (
        <Container>
          <Dialog ref={modalRef}>
            <div>
              <div>팔로워</div>
              {followers?.length === 0 ? (
                <div>팔로워 내역이 없습니다</div>
              ) : (
                <ul>
                  {followers?.map((follower, idx) => (
                    <li key={idx}>
                      <img src={follower.profileImage} alt="profile" />
                      {follower.nickname}
                      {follower.subscribeStatus === true ? (
                        <button type="button" onClick={() => handleClickUnFollow(follower.userId)}>팔로우 취소</button>
                      ) : (
                        <button type="button" onClick={() => handleClickFollow(follower.userId)}>팔로우</button>
                      )}

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
