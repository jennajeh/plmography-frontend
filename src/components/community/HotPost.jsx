/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BasePreview } from '../../assets/common';

const ImgWrapper = styled.article`
  display: flex;
  margin: 5px 0 5px 0;
  width: 500px;
  height: 50px;
  background-color: ${((props) => props.theme.colors.second)};
  border-radius: 10px;

  p {
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-size: 27px;
    font-weight: 800;
  }

  span {
    display: flex;
    align-items: center;
    padding-left: 17px;
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    color: ${((props) => props.theme.text.primary)};
  }

  img {
    object-fit: cover;
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
`;

export default function HotPost({ hitPost, count }) {
  const {
    id: postId, title, image,
  } = hitPost;

  function textLengthOverCut(text, length, lastText) {
    const result = text.substr(0, length) + lastText;

    return result;
  }

  return (
    <div>
      <Link to={`/community/posts/${postId}`}>
        <ImgWrapper>
          {image ? (
            <img src={image} alt="img" />
          ) : (
            <img src={BasePreview} alt="img" />
          )}
          <p>{count}</p>
          <span>{textLengthOverCut(title, '25', '...')}</span>
        </ImgWrapper>
      </Link>
    </div>
  );
}
