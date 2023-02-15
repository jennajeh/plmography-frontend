/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import dateFormat from '../../utils/dateFormat';
import Button from '../common/Button';
import Title from '../common/Title';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.479);
  z-index: 999;
`;

const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40em;
  width: 30em;
  color: white;
  background-color: ${((props) => props.theme.text.fourthGrey)};
  padding-inline: 2rem;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  img {
    width: 5em;
    height: 3em;
  }
`;

const PostContainer = styled.div`
  display: flex;
  height: 90%;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2rem;
`;

const PostList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
`;

const Article = styled.li`
  border-radius: 10px;
  background-color: transparent;
  padding-block: 1rem;
`;

const ButtonBox = styled.div`
  display: flex ;
  justify-content: center;
`;

const StyledButton = styled.button`
  display: flex;
  width: 90%;
  justify-content: space-between;
  border: none;
  color: white;
  background-color: transparent;
  padding-bottom: 5px;
  border-bottom: #5e677c 1px solid;


  span:nth-of-type(2) {
    color: ${((props) => props.theme.colors.first)};
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;

  p:first-child {
    font-size: 17px;
  }

  p:nth-of-type(2) {
    color: ${((props) => props.theme.text.sixthGrey)};
  }
`;

export default function UserPostInfoModal({
  buttonName,
  count,
  myPosts,
  myPostComments,
}) {
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const postModalRef = useRef(null);
  const commentModalRef = useRef(null);

  function textLengthOverCut(text, length, lastText) {
    if (!text.length) {
      return null;
    }

    if (text.length <= length) {
      return text;
    }

    return text.substr(0, length) + lastText;
  }

  const handleClickBackground = (event) => {
    if (postModalRef.current && !postModalRef.current.contains(event.target)) {
      setIsPostOpen(false);
    }

    if (commentModalRef.current && !commentModalRef.current.contains(event.target)) {
      setIsCommentOpen(false);
    }
  };

  const handleClickOpen = () => {
    if (buttonName === '내가 쓴 글') {
      setIsPostOpen(true);

      return;
    }

    setIsCommentOpen(true);
  };

  useEffect(() => {
    if (isPostOpen || isCommentOpen) {
      document.addEventListener('mousedown', handleClickBackground);
    }

    if (!isPostOpen || !isCommentOpen) {
      document.removeEventListener('mousedown', handleClickBackground);
    }

    return () => {
      document.addEventListener('mousedown', handleClickBackground);
    };
  }, [isPostOpen, isCommentOpen]);

  return (
    <>
      <StyledButton
        type="button"
        onClick={handleClickOpen}
      >
        <span>{buttonName}</span>
        <span>{count}</span>
      </StyledButton>
      {isPostOpen && (
        <Wrapper>
          <Dialog ref={postModalRef}>
            <Title size={25}>작성한 글</Title>
            <PostContainer>
              {myPosts?.length === 0 ? (
                <div>내역이 없습니다</div>
              ) : (
                <PostList>
                  {myPosts?.map((post) => (
                    <Article key={post.id}>
                      <StyledLink to={`/community/posts/${post.id}`}>
                        <p>{textLengthOverCut(post.title, '25', '...')}</p>
                        <p>{dateFormat(post.createdAt)}</p>
                      </StyledLink>
                    </Article>
                  ))}
                </PostList>
              )}
              <ButtonBox>
                <Button
                  width={70}
                  height={30}
                  bgcolor="#5e677c"
                  type="button"
                  onClick={() => setIsPostOpen(false)}
                >
                  닫기
                </Button>
              </ButtonBox>
            </PostContainer>
          </Dialog>
        </Wrapper>
      )}
      {isCommentOpen && (
        <Wrapper>
          <Dialog ref={commentModalRef}>
            <Title size={25}>작성한 댓글</Title>
            <PostContainer>
              {myPostComments.length === 0 ? (
                <div>내역이 없습니다</div>
              ) : (
                <PostList>
                  {myPostComments.map((comment) => (
                    <Article key={comment.id}>
                      <StyledLink to={`/community/posts/${comment.postId}`}>
                        <p>{comment.postCommentBody}</p>
                        <p>{dateFormat(comment.updatedAt)}</p>
                      </StyledLink>
                    </Article>
                  ))}
                </PostList>
              )}
              <ButtonBox>
                <Button
                  width={70}
                  height={30}
                  bgcolor="#5e677c"
                  type="button"
                  onClick={() => setIsCommentOpen(false)}
                >
                  닫기
                </Button>
              </ButtonBox>
            </PostContainer>
          </Dialog>
        </Wrapper>
      )}
    </>
  );
}
