/* eslint-disable react/no-array-index-key */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';
import useReviewStore from '../../hooks/useReviewStore';
import useSubscribeStore from '../../hooks/useSubscribeStore';
import useUserStore from '../../hooks/useUserStore';
import UserProfileSubscribeModal from './UserProfileSubscribeModal';
import Title from '../common/Title';
import { EditProfile } from '../../assets/profile';
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

  return (
    <Container>
      <Wrapper>
        <HeaderBox>
          <Title>?????? ???????????????</Title>
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
                buttonName={`????????? ${followers.length}`}
                followers={followers}
              />
              <UserProfileSubscribeModal
                buttonName={`????????? ${followings.length}`}
                followings={followings}
              />
            </SubscriptionBox>
          </UserInfo>
        </UserInfoBox>
        <ContentsInfoBox>
          <UserProfileContentsModal
            buttonName="????????????"
            count={`${wishContentIds?.length}`}
            userId={userId}
            wishContentIds={wishContentIds}
            wishContents={wishContents}
          />
          <UserProfileContentsModal
            buttonName="?????????"
            count={`${watchedContentIds?.length}`}
            userId={userId}
            watchedContentIds={watchedContentIds}
            watchedContents={watchedContents}
          />
          <UserProfileReviewsModal
            buttonName="????????? ??????"
            count={`${notDeletedMyReviews?.length}`}
            reviews={notDeletedMyReviews}
          />
        </ContentsInfoBox>
        <div>
          <Title>
            ????????????
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
                ???????????? ??????
              </Link>
            </>
          ) : (
            <NoContents>
              <p>????????? ????????? ?????? ????????????.</p>
              <StyledLink width={140} height={50} to="/profile/search">
                ???????????? ????????????
              </StyledLink>
            </NoContents>
          )}
        </div>
        <Title>?????? ???????????????</Title>
        <NoContents>
          <p>????????? ????????????.</p>
        </NoContents>
      </Wrapper>
    </Container>
  );
}
