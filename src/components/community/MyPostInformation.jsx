import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import usePostCommentStore from '../../hooks/usePostCommentStore';
import usePostStore from '../../hooks/usePostStore';
import useUserStore from '../../hooks/useUserStore';
import UserPostInfoModal from './UserPostInfoModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  
`;

const User = styled.div`
  img {
    width: 3em;
  }
`;

const MyPosts = styled.div`
  
`;

const MyComments = styled.div`
  
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
    <Container>
      {accessToken ? (
        <Wrapper>
          <User>
            <img src={user.profileImage} alt="profileImage" />
            {user.nickname}
          </User>
          <MyPosts>
            <UserPostInfoModal
              buttonName={`내가 쓴 글: ${myPosts.length}`}
              myPosts={myPosts}
            />
          </MyPosts>
          <MyComments>
            <UserPostInfoModal
              buttonName={`내가 쓴 댓글: ${myPostComments.length}`}
              myPostComments={myPostComments}
            />
          </MyComments>
          <Link to="/community/posts/write">
            글 작성하기
          </Link>
        </Wrapper>
      ) : null}
    </Container>
  );
}
