import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import config from '../../config';

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2em;
`;

const ImgWrapper = styled.article`
  width: 15em;
  height: 5em;
  margin-top: 1em;
`;

const Img = styled.img`
  width: 100%;
`;

const Container = styled.div`
  height: 100%;
  padding-bottom: 20%;
  h4 {
    font-size: ${((props) => props.theme.size.h6)};
    color: ${((props) => props.theme.text.secondary)};
  }
  h3 {
    display: -webkit-box;
    overflow: hidden;
    margin-block: 8px;
    
    text-overflow: ellipsis;
    font-size:  ${((props) => props.theme.size.default)};
    line-height: 1.1;
    color: ${((props) => props.theme.text.tertiary)};
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

export default function ContentsList() {
  const [movies, setMovies] = useState([]);
  const imageUrl = config.tmdbImageUrl;
  const apiUrl = config.tmdbApiUrl;
  const apiKey = config.tmdbApiKey;

  // const [mainMovieImage, setMainMovieImage] = useState(null);

  useEffect(() => {
    // const getPopularMovie = async () => {
    fetch(
      `${apiUrl}/movie/popular?api_key=${apiKey}&language=ko&page=1`,
    ).then((response) => response.json())
      .then((response) => {
        setMovies([...response.results]);
      });

    // };
    // const endPoint = `${apiUrl}movie/popular?api_key=${apiKey}&language=ko&page=1`;

    // fetch(endPoint)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     // console.log(response);
    //     setMovies([...response.results]);
    //     // setMainMovieImage(mainMovieImage || response.results[0]);
    //   });
  }, []);

  // console.log(movies);
  return (
    <List>
      {movies.map((movie) => (
        // ContentDetail 컴포넌트 만들기
        <li key={movie.id}>
          <Link to={`/contents/${movie.id}`}>
            <Container>
              <ImgWrapper>
                <Img src={`${imageUrl}w1280/${movie.backdrop_path}`} alt="img" />
                <h4>{movie.title}</h4>
                <h3>{movie.overview}</h3>
              </ImgWrapper>
            </Container>
          </Link>
        </li>
      ))}
    </List>
  );
}
