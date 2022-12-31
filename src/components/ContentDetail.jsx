/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import apiConfig from '../../apiConfig';
import useYoutubeStore from '../hooks/useYoutubeStore';

const Container = styled.article`
  height: 100%;
`;

const HeaderWrapper = styled.div`
  height: 250px;
  width: 100%;
  position: relative;
  margin-bottom: 4px;

  z-index: 1;

  overflow: hidden;
`;

const BackgroundImageBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  width: 100%;
  /* height: 100%; */

  opacity: 0.9;

  transform: translateX(-50%) translateY(-35%) scale(1);

  img {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg,rgba(16,19,34,0),#101322 88.26%);;
  }
`;

const ContentHeaderBox = styled.div`
  width: 100%;
  padding: 8px 16px 0;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const TitleWrapper = styled.div`
  vertical-align: middle;
  width: calc(100% - 107px);

  h3 {
    font-size: 20px;
    margin-top: 6px;
    font-weight: 700;
    line-height: 28px;
    color: #efefef;
    letter-spacing: -.4px;
  }

  p {
    font-size: 14px;
    color: #c3cad6;
    letter-spacing: -.1px;
    line-height: 20px;
    font-weight: 400;
  }
`;

const RatingWrapper = styled.div`
  position: relative;
  margin-top: 3px;
`;

const LogoBox = styled.div`
  display: inline-block;
  vertical-align: middle;

  img {
    width: 25px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
  }

  p {
    margin-left: 1px;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    color: #efefef;
    vertical-align: middle;
    letter-spacing: -.1px;
    line-height: 20px;
  }
`;

const SmallPosterBox = styled.div`
  width: 99px;
  height: 143px;
  z-index: 3;
  right: 16px;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    height: 143px;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 6px;
    box-shadow: inset 0 0 0 1px #212529, 0 0 16px 0 rgb(0 0 0 / 58%);
  }
`;

const MyButtonArea = styled.div`
  display: flex;
  margin: 1em;
`;

export default function ContentDetail({
  content,
}) {
  const rottenTomato = 'https://plmographybucket.s3.ap-northeast-2.amazonaws.com/rotten-tomato.png';

  const imdbLogo = 'https://plmographybucket.s3.ap-northeast-2.amazonaws.com/imdb-logo.png';

  const {
    tmdbId, korTitle, engTitle, imageUrl,
    releaseDate, platform, description,
  } = content;

  const youtubeStore = useYoutubeStore();

  const { videoUrl } = youtubeStore;

  const platformList = platform?.substring(1, platform.length - 2).split(',');

  
  useEffect(() => {
    if (tmdbId) {
      youtubeStore.fetchVideo(tmdbId);
    }
  }, [tmdbId]);

  console.log('videoUrl', videoUrl);

    return(
      <Container>
        <HeaderWrapper>
          <BackgroundImageBox>
            <img src={imageUrl} alt={korTitle} />
          </BackgroundImageBox>
          <ContentHeaderBox>
            <TitleWrapper>
              <h3>{korTitle}</h3>
              <p>
                <span>{engTitle}</span>
                {' '}
                -
                {' '}
                <span>{releaseDate?.substr(0, 4)}</span>
              </p>
              <RatingWrapper>
                <LogoBox>
                  <img src={rottenTomato} alt="rotten-tomato" />
                  {' '}
                  <p>82%</p>
                </LogoBox>
                <LogoBox>
                  <img src={imdbLogo} alt="imdb-logo" />
                  {' '}
                  <p>7.9</p>
                </LogoBox>
                <LogoBox>
                  <p>⭐️</p>
                  {' '}
                  <p>4.0</p>
                </LogoBox>
              </RatingWrapper>
            </TitleWrapper>
            <SmallPosterBox>
              <img src={imageUrl} alt="poster" />
            </SmallPosterBox>
          </ContentHeaderBox>
        </HeaderWrapper>
        <MyButtonArea>
          <button type="button">
            {/* 이미지 넣기 */}
            <p>찜하기</p>
          </button>
          <button type="button">
            {/* 이미지 넣기 */}
            <p>봤어요</p>
          </button>
          <button type="button">
            {/* 이미지 넣기 */}
            <p>리뷰쓰기</p>
          </button>
        </MyButtonArea>
        <div>
          <h3>여기서 감상할 수 있어요</h3>
          <br />
          <div>
            <ul>
              <li>
                <a href="">
                  {platformList?.[0]}
                  {' '}
                  바로가기
                </a>
              </li>
              <li>
                <a href="">
                  {platformList?.[1]}
                  {' '}
                  바로가기
                </a>
              </li>
              <li>
                <a href="">
                  {platformList?.[2]}
                  {' '}
                  바로가기
                </a>
              </li>
            </ul>
          </div>
        </div>
        <br />
        <div>
          <h3>작품 정보</h3>
          <br />
          <p>{description}</p>
        </div>
        <br />
        <div>
          <h3>감독/출연</h3>
          {/* 출연진 */}
        </div>
        <br />
        <div>
          <h3>예고편</h3>
        </div>
        <div>
          {videoUrl && videoUrl.results.length > 0
            ? (
              <iframe
                title="video"
                src={`https://www.youtube.com/embed/${videoUrl.results[0].key}?autoplay=0&mute=1&loop=0`}
                width="420"
                height="280"
              />
            )
            : (
              <p>영상이 존재하지 않습니다.</p>
            )}
        </div>
      </Container>,
    );
}
