/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BasePreview } from '../../assets/common';

const ImgWrapper = styled.article`
  margin: 1em 0 1em 0;

h4 {
  text-align: center;
  font-size: 24px;
  color: ${((props) => props.theme.text.primary)};
}

  img {
    border-radius: 0.6em;
    width: 3em;
  }
`;

export default function HotPost({ hitPost }) {
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
          ) : <img src={BasePreview} alt="img" />}
          <h4>{textLengthOverCut(title, '25', '...')}</h4>
        </ImgWrapper>
      </Link>
    </div>
  );
}
