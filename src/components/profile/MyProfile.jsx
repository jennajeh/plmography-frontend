/* eslint-disable react/no-array-index-key */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useContentStore from '../../hooks/useContentStore';
import useReviewStore from '../../hooks/useReviewStore';
import useSubscribeStore from '../../hooks/useSubscribeStore';
import useUserStore from '../../hooks/useUserStore';
import UserProfileInfoModal from '../modal/UserProfileInfoModal';
import UserProfileSubscribeModal from '../modal/UserProfileSubscribeModal';

const Container = styled.div`
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  width: 100%;
  margin-block: 1em;
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
        <h1>마이 페이지</h1>
        <div>
          <Link to="/myProfile/edit">
            정보 수정하기
          </Link>
          <div>
            이미지:
            <img src={profileImage} alt="profile" />
            <div>
              닉네임:
              {' '}
              {nickname}
            </div>
            <br />
            <div>
              <UserProfileSubscribeModal
                buttonName={`팔로워: ${followers.length}`}
                followers={followers}
              />
            </div>
            <div>
              <UserProfileSubscribeModal
                buttonName={`팔로잉: ${followings.length}`}
                followings={followings}
              />
            </div>
            <br />
          </div>
          <div>
            <UserProfileInfoModal
              buttonName={`찜했어요: ${wishContentIds?.length}`}
              userId={userId}
              wishContentIds={wishContentIds}
              wishContents={wishContents}
            />
            <br />
            <UserProfileInfoModal
              buttonName={`봤어요: ${watchedContentIds?.length}`}
              userId={userId}
              watchedContentIds={watchedContentIds}
              watchedContents={watchedContents}
            />
            <br />
            <UserProfileInfoModal
              buttonName={`작성한 리뷰: ${notDeletedMyReviews?.length}`}
              notDeletedMyReviews={notDeletedMyReviews}
            />
          </div>
          <br />
          <div>
            <h3>인생작품</h3>
            <span>{favoriteContentIds?.length}</span>
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
              <div>
                <p>🧐 등록된 작품이 없네요! 감명깊었던 작품을 등록해 보세요!</p>
                <Link to="/profile/search">
                  등록하기 버튼
                </Link>
              </div>
            )}
          </div>
          <br />
          <div>
            <h3>찜한 리스트작품</h3>
            <p>내역이 없습니다</p>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
}
