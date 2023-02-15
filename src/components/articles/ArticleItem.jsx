/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${((props) => props.theme.colors.second)};
  border-radius: 0.6em;
  width: 265px;
`;

const ImgWrapper = styled.article`
  display: flex;
  flex-direction: column;
  text-align: left;

  img {
    display: inline-block;
    object-fit: cover;
    border-radius: 0.6em;
    width: 258px;
    height: 200px;
  }
`;

const ThemeWrapper = styled.div`
  color: ${((props) => props.theme.text.pink)};
  font-size: 14px;
  font-weight: 600;
  margin: 13px 13px 0 13px;
`;

const Title = styled.p`
  font-size: 17px;
  letter-spacing: 0.5px;
  word-spacing: 1px;
  display: inline-block;
  vertical-align: middle;
  word-break: normal;
  padding: 10px;

  :hover {
    color: ${((props) => props.theme.colors.first)}
  }
`;

const StyledLink = styled.div`
  color: ${((props) => props.theme.text.secondGrey)};
  font-size: 15px;
  padding: 10px;
`;

export default function ArticleItem({ article, count }) {
  const { contentId, title, image } = article;

  return (
    <Container>
      <Link to={`/articles/${contentId}`}>
        <ImgWrapper>
          <img src={image} alt={title} />
        </ImgWrapper>
        <ThemeWrapper>
          <p>
            THEME 0
            {count}
          </p>
        </ThemeWrapper>
        <Title>
          {title}
        </Title>
        <StyledLink>
          궁금하다면? >
        </StyledLink>
      </Link>
    </Container>
  );
}
