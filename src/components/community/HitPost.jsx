/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ImgWrapper = styled.article`
  margin: 1em 0 1em 0;

h4 {
  text-align: center;
  font-size: ${((props) => props.theme.size.h6)};
  color: ${((props) => props.theme.text.primary)};
}

  img {
    border-radius: 0.6em;
    width: 100%;
  }
`;

export default function HitPost({ hitPost }) {
  const { id: postId, title, image } = hitPost;
  const alternativeImage = 'https://source.boringavatars.com/beam/120/plmography';

  return (
    <div>
      <Link to={`/posts/${postId}`}>
        <ImgWrapper>
          {image ? (
            <img src={image} alt="img" />
          ) : <img src={alternativeImage} alt="img" />}
          <h4>{title}</h4>
        </ImgWrapper>
      </Link>
    </div>
  );
}
