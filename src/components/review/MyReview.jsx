import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import REVIEW_STAR from '../../constants/reviewStar';
import useContentStore from '../../hooks/useContentStore';
import useReviewStore from '../../hooks/useReviewStore';
import Title from '../common/Title';
import dateFormat from '../../utils/dateFormat';
import Modal from '../common/Modal';

const Container = styled.div`
  /* background-color: ${((props) => props.theme.colors.third)}; */
  border-radius: 10px;
  width: 100%;
  height: 200px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

  li {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 10px;
    background-color: ${((props) => props.theme.colors.third)};
  }

  span {
    padding: 0 0 0 15px;
  }
`;

const UserBox = styled.div`
  display: flex;
  padding: 15px 0 0 15px;
  gap: 20px;

  img {
    width: 35px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 2px;


    p:nth-of-type(2) {
      font-size: 12px;
      color: ${((props) => props.theme.text.fifthGrey)}
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 0 15px 15px;
  gap: 5px;
`;

const StyledLinkModify = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 30px;
  font-size: 14px;
  background-color: ${((props) => props.theme.text.sixthGrey)};
  border-radius: 5px;
`;

const NoReview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 14px;
    margin-bottom: 30px;
  }
`;

const StyledLinkWriteReview = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-radius: 7px;
  background-color: ${((props) => props.theme.colors.first)};
  width: 100px;
  height: 36px;
`;

export default function MyReview() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const contentStore = useContentStore();
  const reviewStore = useReviewStore();

  const { content } = contentStore;

  const mySameContentReview = reviewStore.isMySameContentReview(content.tmdbId);
  const reviewNotDeleted = reviewStore.isDeletedMyReviews(mySameContentReview);

  const handleClickDeleteReview = async () => {
    await reviewStore.delete(reviewNotDeleted[0].id);
    await reviewStore.fetchMyReviews();
  };

  const getImage = (rate) => {
    const [a] = REVIEW_STAR.filter((i) => i.rate === rate);

    return a.image;
  };

  if (!content || !reviewNotDeleted) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div>
      {accessToken && (
        <form>
          <Title>내가 쓴 리뷰</Title>
          {reviewNotDeleted.length ? (
            <Container>
              <List>
                {reviewNotDeleted.map((review) => (
                  <li key={review.id}>
                    <UserBox>
                      <img src={review.writer?.profileImage} alt="profileImage" />
                      <div>
                        <p>
                          {review.writer?.nickname}
                        </p>
                        <p>
                          {dateFormat(review.updatedAt)}
                        </p>
                      </div>
                    </UserBox>
                    <span>
                      {getImage(review.starRate)}
                    </span>
                    <span>
                      {review.reviewBody}
                    </span>
                    <ButtonBox>
                      <StyledLinkModify to={`/reviews/${review.id}/edit`}>
                        수정
                      </StyledLinkModify>
                      <Modal
                        buttonName="삭제"
                        content="정말 삭제하시겠습니까?"
                        onClose={handleClickDeleteReview}
                      />
                    </ButtonBox>
                  </li>
                ))}
              </List>
            </Container>
          ) : (
            <NoReview>
              <p>작품에 대한 감상을 기록해보세요.</p>
              <StyledLinkWriteReview
                to="/reviews/write"
              >
                리뷰 작성하기
              </StyledLinkWriteReview>
            </NoReview>
          )}
        </form>
      )}
    </div>
  );
}
