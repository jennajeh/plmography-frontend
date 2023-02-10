/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 16px;
`;

const ImgWrapper = styled.article`
  margin: 1em 0 1em 0;
  display: inline-block;
  vertical-align: middle;

  img {
    border-radius: 0.6em;
    width: 7em;
    display: inline-block;
    vertical-align: middle;
  }
`;

const Title = styled.p`
  font-size: ${((props) => props.theme.size.h6)};
  margin-left: 1em;
  display: inline-block;
  vertical-align: middle;
`;

export default function ArticleItem({ article }) {
  const { contentId, title, image } = article;

  return (
    <Container>
      <Link to={`/articles/${contentId}`}>
        <ImgWrapper>
          <img src={image} alt={title} />
        </ImgWrapper>
        <Title>{title}</Title>
      </Link>
    </Container>
  );
}
