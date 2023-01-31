import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';
import useReviewStore from '../../hooks/useReviewStore';
import useSubscribeStore from '../../hooks/useSubscribeStore';
import useUserStore from '../../hooks/useUserStore';
import SubscribeModal from '../common/SubscribeModal';

const Container = styled.div`
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  width: 100%;
  margin-block: 1em;
`;

export default function Profile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userStore = useUserStore();
  const reviewStore = useReviewStore();
  const contentStore = useContentStore();
  const subscribeStore = useSubscribeStore();

  const { followings, followers } = subscribeStore;
  const { user } = userStore;
  const { id: userId } = user;
  const page = searchParams.get('page') ?? 1;

  console.log(followers);

  return (
    <Container>
      <Wrapper>
        <h1>마이 페이지</h1>
        <div>
          <Link to="/myProfile/edit">
            정보 수정하기
          </Link>
          <div>
            이미지:
            <img src={user.profileImage} alt="profile" />
            <div>
              닉네임:
              {' '}
              {user.nickname}
            </div>
            <br />
            <div>
              <SubscribeModal
                buttonName={`팔로워: ${followers.length}`}
                followers={followers}
              />
            </div>
            <div>
              <SubscribeModal
                buttonName={`팔로잉: ${followings.length}`}
                followings={followings}
              />
            </div>
            <br />
          </div>
          <div>
            <Link to={`/users/${user.id}/wishes`}>
              <span>찜했어요</span>
            </Link>
            <br />
            <Link to={`/users/${user.id}/watched`}>
              <span>봤어요</span>
            </Link>
            <br />
            <Link to={`/users/${user.id}/reviews`}>
              <span>작성한 리뷰</span>
            </Link>
          </div>
          <br />
          <div>
            <h3>인생작품</h3>
          </div>
          <br />
          <div>
            <h3>찜한 리스트작품</h3>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
}
