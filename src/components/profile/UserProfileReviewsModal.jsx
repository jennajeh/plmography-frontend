/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import dateFormat from '../../utils/dateFormat';
import Button from '../common/Button';
import Title from '../common/Title';

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

const ButtonName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonBox = styled.div`
  display: flex ;
  justify-content: center;
  padding-block: 20px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  padding-block: 1em;

  p:first-child {
    font-size: 17px;
  }

  p:nth-of-type(2) {
    color: ${((props) => props.theme.text.sixthGrey)};
  }
`;

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${((props) => props.theme.text.white)};

  span:first-child {
    font-size: 20px;
  }
`;

export default function UserProfileReviewsModal({ buttonName, count, reviews }) {
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
        <ButtonName>
          <span>{count}</span>
          <span>{buttonName}</span>
        </ButtonName>
      </StyledButton>
      {isOpen && (
        <Container>
          <Dialog ref={modalRef}>
            <div>
              <Title size={25}>작성한 리뷰</Title>
              {reviews.length === 0 ? (
                <div>내역이 없습니다</div>
              ) : (
                <ul>
                  {reviews.map((review, idx) => (
                    <li key={idx}>
                      <div>
                        <StyledLink to={`/contents/${review.contentId}`}>
                          <p>{review.reviewBody}</p>
                          <p>{dateFormat(review.createdAt)}</p>
                        </StyledLink>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
          </Dialog>
        </Container>
      )}
    </>
  );
}
