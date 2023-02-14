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
  display: flex;
  justify-content: center;
  align-items: center;

  height: 10em;
  width: 18em;
  background-color: rgb(255 255 255 / 0.9);
  color: black;
  border-radius: 3px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  p {
    font-size: .9em;
  }
`;

const Button = styled.button`
  width: 70px;
  height: 30px;
  border: none;
  background-color: ${((props) => props.theme.text.sixthGrey)};
  border-radius: 5px;
  color: ${((props) => props.theme.text.white)};
`;

const NicknameCheck = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export default function ProfileModal({ buttonName, countNickname, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleClickBackground = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleClickConfirmed = () => {
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
        type="button"
        onClick={() => setIsOpen(true)}
      >
        {buttonName}
      </Button>

      {isOpen && (
        <Container>
          <Dialog ref={modalRef}>
            <div>
              {countNickname > 0 ? (
                <NicknameCheck>
                  <span>이미 존재하는 닉네임 입니다.</span>
                  <Button type="button" onClick={() => setIsOpen(false)}>닫기</Button>
                </NicknameCheck>
              ) : (
                <NicknameCheck>
                  <span>사용 가능합니다.</span>
                  <Button type="button" onClick={handleClickConfirmed}>사용</Button>
                </NicknameCheck>
              )}
            </div>
          </Dialog>
        </Container>
      )}
    </>
  );
}
