import { Link } from 'react-router-dom';
import styled from 'styled-components';

const List = styled.ul`
  display: flex;
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
  const contentsList = [
    {
      id: 1,
      title: '재벌집 막내아들',
      img: 'https://w.namu.la/s/adb6e88ef6dafc5c0470e9371d24f4b89072d6f66d8089f4f6a3a896c80c7488762637567665a2ce3246de4f23a746b6a2c2563153be38ca2657c75402484f07c2057e140e20d2375452463336072f6a60c9dbb004463c7ed46b88aec524264470d0dd570ce79fba4f7477ad7e839579',
      genre: '드라마',
      platForms: [
        { name: '넷플릭스', url: '' },
        { name: '티빙', url: '' },
        { name: '디즈니 플러스', url: '' }],
    },
    {
      id: 2,
      title: '치얼업',
      img: 'https://w.namu.la/s/e4d2950baac276a00b60e9b528e3c7b653a1df57475539288217e33acfaf7a58ac677eb68482e83099968817eba63ef2616643ebef3106f7afd7d3d9d6a7cc5b627da440ce3fcab3a8caf169e7356c9d583852d583c344ad940c8b1d4097759d',
      genre: '드라마',
      platForms: [
        { name: '넷플릭스', url: '' },
        { name: '티빙', url: '' },
        { name: '디즈니 플러스', url: '' }],
    },
    {
      id: 3,
      title: '천원짜리 변호사',
      img: 'https://file.mk.co.kr/meet/neds/2022/11/image_readtop_2022_1005667_16681170015230764.jpg',
      genre: '드라마',
      platForms: [
        { name: '넷플릭스', url: '' },
        { name: '티빙', url: '' },
        { name: '디즈니 플러스', url: '' }],
    },
    {
      id: 4,
      title: '빅마우스',
      img: 'https://w.namu.la/s/840dd93c2dc80dba9e3f1491953488f0c1803a30eb2e981f308f826faf1077d677cf866afb90d636d0414b96ca3465b8bc9fb79008d2a3ef43e23a4faf7111f699e2694cce48b0b19b2102ebbaebf834fb442cf19eec57e9347ea865dd00dd03',
      genre: '미스테리',
      platForms: [
        { name: '넷플릭스', url: '' },
        { name: '티빙', url: '' },
        { name: '디즈니 플러스', url: '' }],
    },
  ];

  return (
    <List>
      {contentsList.map((content) => (
        // ContentDetail 컴포넌트 만들기
        <li key={content.id}>
          <Link to={`/contents/${content.id}`}>
            <Container>
              <ImgWrapper>
                <Img src={content.img} alt="img" />
                <h3>{content.genre}</h3>
                <h4>{content.title}</h4>
              </ImgWrapper>
            </Container>
          </Link>
        </li>
      ))}
    </List>
  );
}
