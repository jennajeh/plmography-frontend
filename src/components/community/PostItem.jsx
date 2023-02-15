/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useLikeStore from '../../hooks/useLikeStore';
import dateFormat from '../../utils/dateFormat';
import Title from '../common/Title';

const Container = styled.li`
    height: fit-content;
    display: flex;
    gap: 20px;
    padding: 1rem;
    border-radius: 10px;
    background-color: ${((props) => props.theme.colors.third)};

`;

const PostWrapper = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 0.6em;

  h4 {
    text-align: center;
    font-size: ${((props) => props.theme.size.h6)};
    color: white;
  }

  img {
    width: 3em;
  }
`;

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    border-radius: 50%;
  }
`;

const Content = styled.span`
  text-align: left;
  font-weight: 300;
`;

const LikeBox = styled.div`
  display: flex;
  align-items: flex-end;
  height: 30px;
  gap: 10px;
`;

const Comment = styled.div`
  
`;

export default function PostItem({ post }) {
  const likeStore = useLikeStore();

  const {
    id: postId, comments, createdAt, postBody, title, writer,
  } = post;
  const likes = likeStore.isSamePostId(postId);

  function textLengthOverCut(text, length, lastText) {
    if (!text.length) {
      return null;
    }

    if (text.length <= length) {
      return text;
    }

    return text.substr(0, length) + lastText;
  }

  return (

    <Link to={`/community/posts/${postId}`}>
      <Container>
        <PostWrapper>
          <UserInfoWrapper>
            <UserInfo>
              <img src={writer?.profileImage} alt="profileImage" />
              <span>{writer?.nickname}</span>
            </UserInfo>
            <div>
              <span>{dateFormat(createdAt)}</span>
            </div>
          </UserInfoWrapper>
          <div>
            <Title size={17}>
              {textLengthOverCut(title, '50', '...')}
            </Title>
            <Content>
              {textLengthOverCut(postBody, '90', '...')}
            </Content>
          </div>
          <LikeBox>
            <div>
              좋아요
              {' '}
              {likes.length}
            </div>
            <Comment>
              댓글
              {' '}
              {comments.length}
            </Comment>
          </LikeBox>
        </PostWrapper>
      </Container>
    </Link>
  );
}
