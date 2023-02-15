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
  background-color: rgba(0, 0, 0, 0.479);
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

const FollowButton = styled.button`
  display: block;
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 5px;
  color: ${((props) => props.theme.text.white)};
  background-color: ${((props) => props.theme.colors.first)};
  font-size: 16px;
  font-weight: 700;

  :hover {
    color: ${((props) => props.theme.colors.first)};
    background-color: ${((props) => props.theme.colors.fourth)};
  }
`;

export default function SubscribeModal({
  buttonName, followings, followers,
}) {
  const [isFollowingsOpen, setIsFollowingsOpen] = useState(false);
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const userStore = useUserStore();
  const subscribeStore = useSubscribeStore();
  const followingsModalRef = useRef(null);
  const followersModalRef = useRef(null);
  const { user } = userStore;
  const { id: userId } = user;
  const page = searchParams.get('page') ?? 1;

  const handleClickBackground = (event) => {
    if (followingsModalRef.current && !followingsModalRef.current.contains(event.target)) {
      setIsFollowingsOpen(false);
    }

    if (followersModalRef.current && !followersModalRef.current.contains(event.target)) {
      setIsFollowersOpen(false);
    }
  };

  const handleClickOpen = () => {
    if (buttonName === `팔로워 ${followers?.length}`) {
      setIsFollowersOpen(true);

      return;
    }

    setIsFollowingsOpen(true);
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
    if (isFollowingsOpen || isFollowersOpen) {
      document.addEventListener('mousedown', handleClickBackground);
    }

    if (!isFollowingsOpen || !isFollowersOpen) {
      document.removeEventListener('mousedown', handleClickBackground);
    }

    return () => {
      document.addEventListener('mousedown', handleClickBackground);
    };
  }, [isFollowingsOpen, isFollowersOpen]);

  return (
    <>
      <SubscriptionButton
        type="button"
        onClick={handleClickOpen}
      >
        {buttonName}
      </SubscriptionButton>
      {isFollowingsOpen && (
        <Container>
          <Dialog ref={followingsModalRef}>
            <FollowerBox>
              <Title size={20}>팔로잉</Title>
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
                      <FollowButton
                        type="button"
                        onClick={() => handleClickUnFollow(following.userId)}
                      >
                        unfollow
                      </FollowButton>
                    </li>
                  ))}
                </FollowerList>
              )}
            </FollowerBox>
            <FollowButton
              type="button"
              onClick={() => setIsFollowingsOpen(false)}
            >
              닫기
            </FollowButton>
          </Dialog>
        </Container>
      )}
      {isFollowersOpen && (
        <Container>
          <Dialog ref={followersModalRef}>
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
                        <FollowButton
                          type="button"
                          onClick={() => handleClickUnFollow(follower.userId)}
                        >
                          unfollow
                        </FollowButton>
                      ) : (
                        <FollowButton
                          type="button"
                          onClick={() => handleClickFollow(follower.userId)}
                        >
                          follow
                        </FollowButton>
                      )}
                    </li>
                  ))}
                </FollowerList>
              )}
            </FollowerBox>
            <Button
              width={70}
              height={30}
              bgcolor="#5e677c"
              type="button"
              onClick={() => setIsFollowersOpen(false)}
            >
              닫기
            </Button>
          </Dialog>
        </Container>
      )}
    </>
  );
}
