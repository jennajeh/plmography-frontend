/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { Like } from '../../assets/community/index';

const Button = styled.button`
  width: 70px;
  border-radius: 2px;
  border: none;
  color: ${((props) => props.theme.text.white)};
  background-color: ${((props) => props.theme.text.sixthGrey)};
  border-radius: 5px;

  img {
    margin-right: 7px;
    width: 12px;
  }
`;

export default function Likes({ count, onClick }) {
  return (
    <Button type="button" name="like" onClick={onClick}>
      <img
        src={Like}
        alt="like"
      />
      공감
      {' '}
      {count}
    </Button>
  );
}
