/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useLikeStore from '../../hooks/useLikeStore';
import dateFormat from '../../utils/dateFormat';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostWrapper = styled.article`
  display: flex;
  align-items: center;
  margin: 1;
  background-color: #c9c9c9;
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

const UserInfo = styled.div`
  display: flex;

`;

const UserInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 1em;

`;

const PostDate = styled.div`
  text-align: right;
`;

const Title = styled.h4`
  text-align: left;
`;

const Content = styled.span`
  text-align: left;
`;

const Likes = styled.div`
  
`;

const Comment = styled.div`
  
`;

export default function PostItem({ post }) {
  const likeStore = useLikeStore();

  const {
    id: postId, comments, updatedAt, hit, postBody, title, writer,
  } = post;
  const likes = likeStore.isSamePostId(postId);

  function textLengthOverCut(text, length, lastText) {
    const result = text.substr(0, length) + lastText;

    return result;
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
            <PostDate>
              조회수
              {hit}
              {dateFormat(updatedAt)}
            </PostDate>
          </UserInfoWrapper>
          <Title>
            {textLengthOverCut(title, '25', '...')}
          </Title>
          <Content>
            {textLengthOverCut(postBody, '90', '...')}
          </Content>
          <Likes>
            좋아요
            {likes.length}
          </Likes>
          <Comment>
            댓글
            {comments.length}
          </Comment>
        </PostWrapper>
      </Container>
    </Link>
  );
}
