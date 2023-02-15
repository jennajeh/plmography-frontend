import {
  Link, useLocation, useNavigate, useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import { useState } from 'react';
import useLikeStore from '../../hooks/useLikeStore';
import usePostCommentEditFormStore from '../../hooks/usePostCommentEditFormStore';
import usePostCommentFormStore from '../../hooks/usePostCommentFormStore';
import usePostCommentStore from '../../hooks/usePostCommentStore';
import usePostStore from '../../hooks/usePostStore';
import useUserStore from '../../hooks/useUserStore';
import Title from '../common/Title';
import PostCommentDeleteModal from './PostCommentDeleteModal';
import PostCommentEditForm from './PostCommentEditForm';
import PostCommentForm from './PostCommentForm';
import PostDeleteModal from './PostDeleteModal';
import PostDetailComment from './PostDetailComment';
import Button from '../common/Button';

const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  color: white;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  img {
    border-radius: 50%;
    width: 3.5em;
  }

  span {
    color: white;
    font-size: 1.3em;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: white;

  div:nth-of-type(2) {
    line-height: 2rem;
  }

  img {
    width: 40em;
  }
`;

const ButtonBox = styled.div`
display: flex;
justify-content: space-between;
padding-block: 2rem;
border-bottom: 1px solid #5e677c;

div {
  display: flex;
  gap: 10px;
}
  
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2em;

  li {
    color: white;
    border-bottom: 1px solid #5e677c;
  }

  li:last-child {
    border-bottom: none;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  width: 70px;
  height: 30px;
  font-size: 14px;
  font-weight: 600;
  background-color: #5e677c;
`;

const Error = styled.p`
  margin: 80px;
  font-weight: 700;
  font-size: ${((props) => props.theme.size.h4)};
  color: white;
  text-align: center;
`;

const EditBox = styled.div`
  display: flex;
  gap: 15px;
  padding-block: 1rem;
`;

export default function PostDetail() {
  const postStore = usePostStore();
  const [accessToken] = useLocalStorage('accessToken', '');
  const [isOpen, setIsOpen] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const postCommentStore = usePostCommentStore();
  const postCommentFormStore = usePostCommentFormStore();
  const postCommentEditFormStore = usePostCommentEditFormStore();
  const likeStore = useLikeStore();
  const userStore = useUserStore();

  const { post } = postStore;
  const { user } = userStore;
  const { id: userId } = user;
  const { postComments } = postCommentStore;

  const {
    createdAt, image, postBody, title, writer,
  } = post;

  const page = searchParams.get('page') ?? 1;
  const path = location.pathname;
  const pathId = path.split('/')[3];
  const postId = Number(pathId);

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

  const handleClickModifyComment = (commentId) => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    postCommentStore.changeModifyCommentButtonStatus();

    setIsOpen((element) => (element.isOpen !== commentId ? commentId : ''));

    if (isOpen === commentId) {
      setIsOpen(false);
    }
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

      setIsOpen(false);
    }
  };

  const handleClickDeleteComment = async (comment) => {
    await postCommentStore.delete(comment.id);

    postCommentStore.fetchComments({ page, size: 10, postId });
  };

  return (
    <div>
      <div>
        <ProfileBox>
          <Profile>
            <img src={writer?.profileImage} alt="profileImage" width={50} />
            <span>{writer?.nickname}</span>
          </Profile>
          <div>
            {createdAt?.split('T')[0]}
          </div>
        </ProfileBox>
        <Title size={20}>
          {title}
        </Title>
        <ContentBox>
          <div>
            {image && (
              <img src={image} alt="uploadImage" />
            )}
          </div>
          <div>
            {postBody}
          </div>
        </ContentBox>
        <ButtonBox>
          <div>
            <Button
              width={70}
              height={30}
              bgcolor="#5e677c"
              type="button"
              onClick={handleClickLike}
            >
              좋아요
              {' '}
              {likes.length}
            </Button>
            <Button
              width={70}
              height={30}
              bgcolor="#5e677c"
              cursor="default"
            >
              댓글
              {' '}
              {postComments?.length}
            </Button>
          </div>
          {writer?.id === userId && accessToken && (
            <div>
              <StyledLink to={`/community/posts/${postId}/edit`}>
                수정
              </StyledLink>
              <PostDeleteModal
                buttonName="삭제"
                content="정말 삭제하시겠습니까?"
                onClose={handleClickDeletePost}
              />
            </div>
          )}
        </ButtonBox>
        <Title size={20}>댓글</Title>
        <PostCommentForm
          onSubmit={handleSubmitCreateComment}
        />
        {postComments?.length ? (
          <List>
            {postComments.map((comment) => (
              <li key={comment.id}>
                <PostDetailComment
                  key={comment.id}
                  comment={comment}
                />
                {comment.writer.id === userId && accessToken && (
                  <div>
                    <EditBox>
                      <Button
                        width={70}
                        height={30}
                        bgcolor="#5e677c"
                        type="button"
                        onClick={() => handleClickModifyComment(comment.id)}
                      >
                        수정
                      </Button>
                      <PostCommentDeleteModal
                        buttonName="삭제"
                        content="정말 삭제하시겠습니까?"
                        onClose={() => handleClickDeleteComment(comment)}
                      />
                    </EditBox>
                    {isOpen === comment.id && (
                      <PostCommentEditForm
                        comment={comment}
                        onSubmit={(e) => handleSubmitModifyComment(e, comment)}
                      />
                    )}
                  </div>
                )}
              </li>
            ))}
          </List>
        ) : (
          <Error>댓글이 존재하지 않습니다.</Error>
        )}
      </div>
    </div>
  );
}
