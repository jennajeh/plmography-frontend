/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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
  height: 10em;
  width: 18em;
  background-color: white;
  border-radius: 3px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  p {
    font-size: .9em;
  }
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
      <button
        type="button"
        onClick={() => setIsOpen(true)}
      >
        {buttonName}
      </button>
      {isOpen && (
        <Container>
          <Dialog ref={modalRef}>
            <div>
              {content}
            </div>
            <button type="button" onClick={handleClickDelete}>예</button>
            <button type="button" onClick={() => setIsOpen(false)}>아니오</button>
          </Dialog>
        </Container>
      )}
    </>
  );
}
