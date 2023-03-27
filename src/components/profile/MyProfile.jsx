/* eslint-disable react/no-array-index-key */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';
import useReviewStore from '../../hooks/useReviewStore';
import useSubscribeStore from '../../hooks/useSubscribeStore';
import useUserStore from '../../hooks/useUserStore';
import UserProfileSubscribeModal from './UserProfileSubscribeModal';
import Title from '../common/Title';
import { EditProfile, UpdateButton } from '../../assets/profile';
import StyledLink from '../common/StyledLink';
import UserProfileContentsModal from './UserProfileContentsModal';
import UserProfileReviewsModal from './UserProfileReviewsModal';

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

const ProfileTitle = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  margin: 1em;
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

const ContentsInfoBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100px;
  border-radius: 10px;
  background-color: ${((props) => props.theme.colors.third)};
`;

const Favorites = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NoContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  p {
    font-size: 16px;
    color: ${((props) => props.theme.text.white)};
  }
`;

const StyledAddContentLink = styled(Link)`
  margin: 30px 0;
  font-size: 18px;
  color: ${((props) => props.theme.text.white)};

  img {
    width: 1em;
    margin-left: 10px;
  }
`;

const FavoriteList = styled.ul`
  display: flex;

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const FavoriteContent = styled.div`
  display: flex;
  margin: 0 1.2em;
  justify-content: center;
  align-items: center;
  
  img {
    width: 8em;
  }
`;

const DeleteButton = styled.button`
  width: 4em;
  height: 2em;
  margin: 1em 0;
  border: none;
  border-radius: 0.3em;
  color: ${((props) => props.theme.text.white)};
  background-color: ${((props) => props.theme.text.sixthGrey)};

  :hover {
    color: ${((props) => props.theme.colors.first)};
  }
`;

const ShowMoreContentsLink = styled(Link)`
  font-size: 2em;
  display: flex;
  align-items: center;
  margin: 2em;
  border: none;
  color: ${(props) => (props.theme.text.white)};
  background-color: transparent;
`;

export default function MyProfile() {
  const userStore = useUserStore();
  const reviewStore = useReviewStore();
  const contentStore = useContentStore();
  const subscribeStore = useSubscribeStore();

  const { user } = userStore;
  const { followings, followers } = subscribeStore;
  const { favoriteContents, watchedContents, wishContents } = contentStore;

  const {
    id: userId, nickname, profileImage, favoriteContentIds, watchedContentIds, wishContentIds,
  } = user;

  const notDeletedMyReviews = reviewStore.isDeletedMyAllReviews();
  const sliceFavoriteContents = favoriteContents.slice(0, 6);
  const favoriteContentId = favoriteContentIds?.join(',');

  const handleClickFavorite = async (id) => {
    await contentStore.toggleFavorite(id);

    await contentStore.fetchFavoriteContents({ userId, favoriteContentId });

    await userStore.fetchMe();
  };

  return (
    <Container>
      <Wrapper>
        <HeaderBox>
          <ProfileTitle>마이 플모그래피</ProfileTitle>
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
          <UserProfileContentsModal
            buttonName="찜했어요"
            count={`${wishContentIds?.length}`}
            userId={userId}
            wishContentIds={wishContentIds}
            wishContents={wishContents}
          />
          <UserProfileContentsModal
            buttonName="봤어요"
            count={`${watchedContentIds?.length}`}
            userId={userId}
            watchedContentIds={watchedContentIds}
            watchedContents={watchedContents}
          />
          <UserProfileReviewsModal
            buttonName="작성한 리뷰"
            count={`${notDeletedMyReviews?.length}`}
            reviews={notDeletedMyReviews}
          />
        </ContentsInfoBox>
        <div>
          <Favorites>
            <Title>
              인생 작품
              {' '}
              {favoriteContentIds?.length}
              {' '}
            </Title>
            <StyledAddContentLink to="/profile/search">
              추가하기
              <img src={UpdateButton} alt="addContents" />
            </StyledAddContentLink>
          </Favorites>
          {sliceFavoriteContents.length && (
            <FavoriteList>
              {sliceFavoriteContents.map((content, idx) => (
                <li key={idx}>
                  {content.userId === userId && (
                    <>
                      <FavoriteContent>
                        <Link to={`/contents/${content.contentId}`}>
                          <img src={content.imageUrl} alt="contentImage" />
                        </Link>
                      </FavoriteContent>
                      <DeleteButton
                        type="submit"
                        onClick={() => handleClickFavorite(content.contentId)}
                      >
                        삭제
                      </DeleteButton>
                    </>
                  )}
                </li>
              ))}
              {favoriteContentIds.length > 6 && favoriteContents.length > 6 && (
                <ShowMoreContentsLink to="/profile/favorites">
                  〉
                </ShowMoreContentsLink>
              )}
            </FavoriteList>
          )}
          {favoriteContentIds?.length === 0 && (
            <NoContents>
              <p>등록된 작품이 아직 없습니다.</p>
              <StyledLink width={140} height={50} to="/profile/search">
                인생작품 등록하기
              </StyledLink>
            </NoContents>
          )}
        </div>
        <Title>찜한 리스트</Title>
        <NoContents>
          <p>내역이 없습니다.</p>
        </NoContents>
      </Wrapper>
    </Container>
  );
}
