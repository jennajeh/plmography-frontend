/* eslint-disable react/jsx-no-useless-fragment */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import usePostCommentStore from '../../hooks/usePostCommentStore';
import usePostStore from '../../hooks/usePostStore';
import useUserStore from '../../hooks/useUserStore';
import UserPostInfoModal from './UserPostInfoModal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;
  gap: 15px;

`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  gap:10px;
  width: 300px;
  height: 218px;
  background-color: ${((props) => props.theme.colors.third)};
  padding-block: 1rem;
`;

const User = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const ImageBox = styled.div`
  width: 70px;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`;

const CommentsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const LinkBox = styled.div`
  display: flex;
  align-items: center;
  border-radius: 7px;
  width: 300px;
  height: 40px;
  justify-content: center;
  background-color:  ${((props) => props.theme.colors.first)};
`;

export default function MyPostInformation() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const userStore = useUserStore();
  const postStore = usePostStore();
  const postCommentStore = usePostCommentStore();

  const { user } = userStore;
  const { myPosts } = postStore;
  const { myPostComments } = postCommentStore;

  return (
    <>
      {accessToken ? (
        <Wrapper>
          <UserBox>
            <User>
              <ImageBox>
                <img src={user.profileImage} alt="profileImage" />
              </ImageBox>
              {user.nickname}
            </User>
            <CommentsBox>
              <UserPostInfoModal
                buttonName="내가 쓴 글"
                count={myPosts.length}
                myPosts={myPosts}
              />
              <UserPostInfoModal
                buttonName="내가 쓴 댓글"
                count={myPostComments.length}
                myPostComments={myPostComments}
              />
            </CommentsBox>
          </UserBox>
          <LinkBox>
            <Link to="/community/posts/write">
              글 작성하기
            </Link>
          </LinkBox>
        </Wrapper>
      ) : null}
    </>
  );
}
