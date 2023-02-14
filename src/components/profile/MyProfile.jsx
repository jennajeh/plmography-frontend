/* eslint-disable react/no-array-index-key */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';
import useReviewStore from '../../hooks/useReviewStore';
import useSubscribeStore from '../../hooks/useSubscribeStore';
import useUserStore from '../../hooks/useUserStore';
import UserProfileSubscribeModal from './UserProfileSubscribeModal';
import UserProfileInfoModal from './UserProfileInfoModal';
import Title from '../common/Title';
import { EditProfile } from '../../assets/profile';
import StyledLink from '../common/StyledLink';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${((props) => props.theme.text.white)};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInfoBox = styled.div`
  display: flex;
  padding: 15px 0 15px 0;
  gap: 20px;

  img {
    width: 70px;
    border-radius: 50%;
  }
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 2px;
`;

const SubscriptionBox = styled.div`
    display: flex;
`;

const FavoriteContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1em;
  justify-content: center;
  align-items: center;
  
  img {
    width: 8em;
  }
`;

const ContentsInfoBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100px;
  border-radius: 10px;
  background-color: ${((props) => props.theme.colors.third)};
`;

const NoFavoriteContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  p {
    font-size: 16px;
  }
`;

// const StyledLink = styled(Link)`
//   display: flex;
//   background-color: ${((props) => props.theme.text.blue)};
//   width: 150px;
//   height: 50px;
//   justify-content: center;
//   align-items: center;
//   border-radius: 5px;
// `;

export default function MyProfile() {
  const userStore = useUserStore();
  const reviewStore = useReviewStore();
  const contentStore = useContentStore();
  const subscribeStore = useSubscribeStore();

  const { user } = userStore;
  const { myReviews } = reviewStore;
  const { followings, followers } = subscribeStore;
  const { favoriteContents, watchedContents, wishContents } = contentStore;

  const {
    id: userId, nickname, profileImage, favoriteContentIds, watchedContentIds, wishContentIds,
  } = user;

  const notDeletedMyReviews = reviewStore.isDeletedMyReviews(myReviews);

  return (
    <Container>
      <Wrapper>
        <HeaderBox>
          <Title>마이 플모그래피</Title>
          <Link to="/profile/edit">
            <img
              src={EditProfile}
              alt="editProfile"
            />
          </Link>
        </HeaderBox>
        <UserInfoBox>
          <img src={profileImage} alt="profile" />
          <UserInfo>
            <span>{nickname}</span>
            <SubscriptionBox>
              <UserProfileSubscribeModal
                buttonName={`팔로워 ${followers.length}`}
                followers={followers}
              />
              <UserProfileSubscribeModal
                buttonName={`팔로잉 ${followings.length}`}
                followings={followings}
              />
            </SubscriptionBox>
          </UserInfo>
        </UserInfoBox>
        <ContentsInfoBox>
          <UserProfileInfoModal
            buttonName="찜했어요"
            count={`${wishContentIds?.length}`}
            userId={userId}
            wishContentIds={wishContentIds}
            wishContents={wishContents}
          />
          <UserProfileInfoModal
            buttonName="봤어요"
            count={`${watchedContentIds?.length}`}
            userId={userId}
            watchedContentIds={watchedContentIds}
            watchedContents={watchedContents}
          />
          <UserProfileInfoModal
            buttonName="작성한 리뷰"
            count={`${notDeletedMyReviews?.length}`}
            notDeletedMyReviews={notDeletedMyReviews}
          />
        </ContentsInfoBox>
        <div>
          <Title>
            인생작품
            {' '}
            {favoriteContentIds?.length}
          </Title>
          {favoriteContents.length ? (
            <>
              <ul>
                {favoriteContents.map((content, idx) => (
                  <li key={idx}>
                    <FavoriteContent>
                      <Link to={`/contents/${content.contentId}`}>
                        <img src={content.imageUrl} alt="contentImage" />
                      </Link>
                    </FavoriteContent>
                  </li>
                ))}
              </ul>
              <Link to="/profile/search">
                추가하기 버튼
              </Link>
            </>
          ) : (
            <NoFavoriteContents>
              <p>등록된 작품이 아직 없습니다.</p>
              <StyledLink width={140} height={50} to="/profile/search">
                인생작품 등록하기
              </StyledLink>
            </NoFavoriteContents>
          )}
        </div>
        <Title>찜한 리스트작품</Title>
        <NoFavoriteContents>
          <p>내역이 없습니다.</p>
        </NoFavoriteContents>
      </Wrapper>
    </Container>
  );
}
