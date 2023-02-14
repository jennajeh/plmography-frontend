/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useSubscribeStore from '../../hooks/useSubscribeStore';
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
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 40em;
  width: 30em;
  padding: 30px;
  background-color: ${((props) => props.theme.text.fourthGrey)};
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  img {
    width: 5em;
    height: 3em;
  }
`;

const FollowerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 30px;
`;

const FollowerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

li {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;

  div {
    display: flex;
    align-items: center;
  }
}
`;

const SubscriptionButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${((props) => props.theme.text.secondGrey)};
  padding: 0 3px 0 0;
`;

const Following = styled.div`
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
      <SubscriptionButton
        type="button"
        onClick={() => setIsOpen(true)}
      >
        {buttonName}
      </SubscriptionButton>
      {isOpen && followings?.length && (
        <Container>
          <Dialog ref={modalRef}>
            <FollowerBox>
              <Title>팔로잉</Title>
              {followings?.length === 0 ? (
                <div>팔로잉 내역이 없습니다</div>
              ) : (
                <FollowerList>
                  {followings?.map((following, idx) => (
                    <li key={idx}>
                      <div>
                        <img
                          src={following.profileImage}
                          alt="profile"
                        />
                        <span>{following.nickname}</span>
                      </div>
                      <Button
                        width={80}
                        height={30}
                        bgcolor="#afbaca"
                        type="button"
                        onClick={() => handleClickUnFollow(following.userId)}
                      >
                        unfollow
                      </Button>
                    </li>
                  ))}
                </FollowerList>
              )}
            </FollowerBox>
            <Button
              size={15}
              width={80}
              height={30}
              bgcolor="#afbaca"
              type="button"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              닫기

            </Button>
          </Dialog>
        </Container>
      )}
      {isOpen && followers?.length && (
        <Container>
          <Dialog ref={modalRef}>
            <FollowerBox>
              <Title size={20}>팔로워</Title>
              {followers?.length === 0 ? (
                <div>팔로워 내역이 없습니다</div>
              ) : (
                <FollowerList>
                  {followers?.map((follower, idx) => (
                    <li key={idx}>
                      <div>
                        <img src={follower.profileImage} alt="profile" />
                        <span>{follower.nickname}</span>
                      </div>
                      {follower.subscribeStatus === true ? (
                        <Button
                          width={80}
                          height={30}
                          bgcolor="#afbaca"
                          type="button"
                          onClick={() => handleClickUnFollow(follower.userId)}
                        >
                          unfollow
                        </Button>
                      ) : (
                        <Button
                          width={80}
                          height={30}
                          bgcolor="#afbaca"
                          type="button"
                          onClick={() => handleClickFollow(follower.userId)}
                        >
                          follow
                        </Button>
                      )}
                    </li>
                  ))}
                </FollowerList>
              )}
            </FollowerBox>
            <Button
              size={15}
              width={80}
              height={30}
              bgcolor="#afbaca"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              닫기
            </Button>
          </Dialog>
        </Container>
      )}
    </>
  );
}
