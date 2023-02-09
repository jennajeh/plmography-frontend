/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import dateFormat from '../../utils/dateFormat';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const Dialog = styled.div`
  height: 40em;
  width: 30em;
  background-color: white;
  border-radius: 3px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  img {
    width: 5em;
    height: 3em;
  }
`;

const Content = styled.div`
  display: flex;
  margin: 1em;
  
  img {
    width: 6em;
    height: 6em;
  }
`;

export default function UserPostInfoModal({
  buttonName,
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
      <button
        type="button"
        onClick={() => setIsOpen(true)}
      >
        {buttonName}
      </button>
      {isOpen && myPosts?.length && (
        <Container>
          <Dialog ref={modalRef}>
            <div>
              <h3>작성한 글</h3>
              {myPosts?.length === 0 ? (
                <div>내역이 없습니다</div>
              ) : (
                <ul>
                  {myPosts?.map((post) => (
                    <li key={post.id}>
                      <div>
                        <Link to={`/community/posts/${post.id}`}>
                          <p>{post.title}</p>
                          <p>{dateFormat(post.updatedAt)}</p>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="button" onClick={() => setIsOpen(false)}>닫기</button>
          </Dialog>
        </Container>
      )}
      {isOpen && myPostComments?.length && (
        <Container>
          <Dialog ref={modalRef}>
            <div>
              <h3>작성한 글</h3>
              {myPostComments?.length === 0 ? (
                <div>내역이 없습니다</div>
              ) : (
                <ul>
                  {myPostComments?.map((comment) => (
                    <li key={comment.id}>
                      <div>
                        <Link to={`/community/posts/${comment.postId}`}>
                          <p>{comment.postCommentBody}</p>
                          <p>{dateFormat(comment.updatedAt)}</p>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="button" onClick={() => setIsOpen(false)}>닫기</button>
          </Dialog>
        </Container>
      )}
    </>
  );
}
