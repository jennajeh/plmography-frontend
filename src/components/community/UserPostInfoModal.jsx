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
  z-index: 999;
`;

const Dialog = styled.div`
  height: 50vw;
  width: 50vh;
  color: white;
  background-color: #0d0e12;
  padding-inline: 2rem;
  border-radius: 5px;
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
  gap:40px;
  
`;

const Article = styled.li`
  border-radius: 10px;
  background-color: ${((props) => props.theme.colors.third)};;
  padding: 2rem 1rem;
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
  flex-direction: column;
  gap: 15px;

  p:first-child {
    font-size: 18px;
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
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleClickBackground = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickBackground);
    }

    if (!isOpen) {
      document.removeEventListener('mousedown', handleClickBackground);
    }

    return () => {
      document.addEventListener('mousedown', handleClickBackground);
    };
  }, [isOpen]);

  return (
    <>
      <StyledButton
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <span>{buttonName}</span>
        <span>{count}</span>
      </StyledButton>
      {isOpen && myPosts?.length && (
        <Wrapper>
          <Dialog ref={modalRef}>
            <Title size={25}>작성한 글</Title>
            <PostContainer>
              {myPosts?.length === 0 ? (
                <div>내역이 없습니다</div>
              ) : (
                <PostList>
                  {myPosts?.map((post) => (
                    <Article key={post.id}>
                      <StyledLink to={`/community/posts/${post.id}`}>
                        <p>{post.title}</p>
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
                  onClick={() => setIsOpen(false)}
                >
                  닫기
                </Button>
              </ButtonBox>
            </PostContainer>
          </Dialog>
        </Wrapper>
      )}
      {isOpen && myPostComments?.length && (
        <Wrapper>
          <Dialog ref={modalRef}>
            <Title size={25}>작성한 댓글</Title>
            <PostContainer>
              {myPostComments?.length === 0 ? (
                <div>내역이 없습니다</div>
              ) : (
                <PostList>
                  {myPostComments?.map((comment) => (
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
                  onClick={() => setIsOpen(false)}
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
