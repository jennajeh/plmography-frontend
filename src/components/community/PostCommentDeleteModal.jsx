/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  height: 10em;
  width: 18em;
  background-color: white;
  border-radius: 3px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  
  p {
    color: black;
    font-size: .9em;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
`;

export default function PostCommentDeleteModal({
  buttonName, content, onClose,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleClickBackground = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleClickDelete = () => {
    setIsOpen(false);
    onClose();
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
      <Button
        width={70}
        height={30}
        bgcolor="#5e677c"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        {buttonName}
      </Button>
      {isOpen && (
        <Container>
          <Dialog ref={modalRef}>
            <p>{content}</p>
            <ButtonBox>
              <Button
                width={70}
                height={30}
                bgcolor="#5e677c"
                type="button"
                onClick={handleClickDelete}
              >
                예
              </Button>
              <Button
                width={70}
                height={30}
                bgcolor="#5e677c"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                아니오
              </Button>
            </ButtonBox>
          </Dialog>
        </Container>
      )}
    </>
  );
}
