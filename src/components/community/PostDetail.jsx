import {
  Link, useLocation, useNavigate, useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useLikeStore from '../../hooks/useLikeStore';
import usePostCommentEditFormStore from '../../hooks/usePostCommentEditFormStore';
import usePostCommentFormStore from '../../hooks/usePostCommentFormStore';
import usePostCommentStore from '../../hooks/usePostCommentStore';
import usePostStore from '../../hooks/usePostStore';
import useUserStore from '../../hooks/useUserStore';
import PostCommentDeleteModal from './PostCommentDeleteModal';
import PostCommentEditForm from './PostCommentEditForm';
import PostCommentForm from './PostCommentForm';
import PostDeleteModal from './PostDeleteModal';
import PostDetailComment from './PostDetailComment';

const Title = styled.h1`
  display: flex;
  font-size: ${((props) => props.theme.size.h4)};
  font-weight: bold;
  margin-top: 1em;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1em;
`;

const Error = styled.p`
  margin: 80px;
  font-weight: 700;
  font-size: ${((props) => props.theme.size.h4)};
  text-align: center;
`;

export default function PostDetail() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const postStore = usePostStore();
  const postCommentStore = usePostCommentStore();
  const postCommentFormStore = usePostCommentFormStore();
  const postCommentEditFormStore = usePostCommentEditFormStore();
  const likeStore = useLikeStore();
  const userStore = useUserStore();

  const page = searchParams.get('page') ?? 1;
  const path = location.pathname;
  const pathId = path.split('/')[3];
  const postId = Number(pathId);

  const { post } = postStore;
  const { user } = userStore;
  const { id: userId } = user;
  const { modifyCommentButtonOpened, postComments } = postCommentStore;

  const {
    updatedAt, hit, image, postBody, title, writer,
  } = post;

  const likes = likeStore.isSamePostId(postId);

  const handleSubmitCreateComment = async (e) => {
    e.preventDefault();

    postCommentFormStore.validate();

    if (postCommentFormStore.isValidateSuccessful) {
      await postCommentStore.create(postId, postCommentFormStore.body);
      postCommentFormStore.reset();

      postCommentStore.fetchComments({ page, size: 10, postId });
    }
  };

  const handleClickLike = async () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    likeStore.countLike(postId, userId);

    await likeStore.fetchLikes();
  };

  const handleClickModifyComment = () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    postCommentStore.changeModifyCommentButtonStatus();
  };

  const handleClickDeletePost = async () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    await postStore.delete(postId);

    navigate('/community');
  };

  const handleSubmitModifyComment = async (e, comment) => {
    e.preventDefault();

    await postCommentEditFormStore.validate();

    if (postCommentEditFormStore.isValidateSuccessful) {
      postCommentStore.changeModifyCommentButtonStatus();

      const { body } = postCommentEditFormStore;

      await postCommentStore.modify(comment.id, body);

      await postCommentStore.fetchComments({ page, size: 10, postId });
    }
  };

  const handleClickDeleteComment = async (comment) => {
    await postCommentStore.delete(comment.id);

    postCommentStore.fetchComments({ page, size: 10, postId });
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <img src={writer?.profileImage} alt="profileImage" />
            조회수 :
            {' '}
            {hit}
            {' '}
            {writer?.nickname}
          </div>

          <div>
            {updatedAt?.split('T')[0]}
          </div>
        </div>
        <div>
          {title}
        </div>
        <div>
          {image && (
            <img src={image} alt="uploadImage" />
          )}
          {postBody}
        </div>
        <div>
          <button type="button" onClick={handleClickLike}>
            좋아요
            {likes.length}
          </button>
          <div>
            댓글
            {postComments?.length}
          </div>
          <Link to="/community">
            목록
          </Link>
          {writer?.id === userId && accessToken && (
            <>
              <Link to={`/community/posts/${postId}/edit`}>
                수정
              </Link>
              <PostDeleteModal
                buttonName="삭제하기"
                content="정말 삭제하시겠습니까?"
                onClose={handleClickDeletePost}
              />
            </>
          )}
        </div>
        <Title>댓글</Title>
        <div>
          {postComments?.length ? (
            <List>
              {postComments.map((comment) => (
                <div key={comment.id}>
                  <PostDetailComment
                    key={comment.id}
                    comment={comment}
                  />
                  {comment.writer.id === userId && accessToken && (
                    <>
                      <button type="button" onClick={handleClickModifyComment}>
                        수정
                      </button>
                      <PostCommentDeleteModal
                        buttonName="삭제하기"
                        content="정말 삭제하시겠습니까?"
                        onClose={() => handleClickDeleteComment(comment)}
                      />
                      {modifyCommentButtonOpened && (
                        <PostCommentEditForm
                          comment={comment}
                          onSubmit={(e) => handleSubmitModifyComment(e, comment)}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </List>
          ) : (
            <Error>댓글이 존재하지 않습니다.</Error>
          )}
        </div>
        <PostCommentForm
          onSubmit={handleSubmitCreateComment}
        />
      </div>
    </div>
  );
}
