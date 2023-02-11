/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import {
  Eye, Heart, ImdbLogo, PencilSimple, ReviewStar, TomatoLogo,
} from '../../assets/contents';
import useContentStore from '../../hooks/useContentStore';
import useReviewStore from '../../hooks/useReviewStore';

const ImageWrapper = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  margin-top: 50px;
  margin-bottom: 4px;

  z-index: 1;

  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  left: 50%;
  top: 40%;

  width: 100%;

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
  justify-content: right;
  align-items: flex-end;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-block: 50px;
  padding-bottom: 50px;
  border-bottom: 1px solid ${((props) => props.theme.colors.second)};;
`;

const TitleWrapper = styled.div`
  width: calc(100% - 107px);

  h3 {
    font-size: 20px;
    margin-top: 6px;
    font-weight: 700;
    line-height: 28px;
    color: #efefef;
    letter-spacing: 1px;
  }

  p {
    font-size: 14px;
    color: #c3cad6;
    letter-spacing: 1px;
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
  padding-right: 15px;

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
  gap: 1em;
`;

const Button = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 85px;
  height: 35px;
  border: none;
  border-radius: 0.7em;
  background-color: ${((props) => props.theme.text.sixthGrey)};
  animation-fill-mode: forwards;

  .active {
    background-color: ${((props) => props.theme.colors.first)};
  }
  
  p {
    color: ${((props) => props.theme.text.white)};
    font-size: 13px;
  }

  img {
    width: 17px;
  }
`;

export default function ContentDetailHeader() {
  const navigate = useNavigate();
  const reviewStore = useReviewStore();
  const contentStore = useContentStore();
  const [accessToken] = useLocalStorage('accessToken', '');

  const { content } = contentStore;

  const {
    tmdbId, korTitle, engTitle, releaseDate, imageUrl,
  } = content;

  const sameContentReviews = reviewStore.isMySameContentReview(tmdbId);
  const notDeletedReview = reviewStore.isDeletedMyReviews(sameContentReviews);

  function changeButton(e) {
    const btns = document.querySelectorAll('.button');
    btns.forEach((btn, i) => {
      if (e.currentTarget === btn) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  const handleClickWriteReview = () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    if (notDeletedReview.length > 0) {
      navigate(`/reviews/${notDeletedReview[0].id}/edit`);

      return;
    }

    navigate('/reviews/write');
  };

  const handleClickWish = async (e) => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    changeButton(e);

    await contentStore.toggleWish(tmdbId);
  };

  const handleClickWatched = async (e) => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    changeButton(e);

    await contentStore.toggleWatched(tmdbId);
  };

  const handleClickFavorite = async (e) => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    changeButton(e);

    await contentStore.toggleFavorite(tmdbId);
  };

  return (
    <>
      <ImageWrapper>
        <BackgroundImage>
          <img src={imageUrl} alt={korTitle} />
        </BackgroundImage>
        <ContentHeaderBox>
          <SmallPosterBox>
            <img src={imageUrl} alt="poster" />
          </SmallPosterBox>
        </ContentHeaderBox>
      </ImageWrapper>
      <HeaderWrapper>
        <TitleWrapper>
          <h3>{korTitle}</h3>
          <p>
            <span>{engTitle}</span>
            {' '}
            -
            {' '}
            <span>{releaseDate}</span>
          </p>
          <RatingWrapper>
            <LogoBox>
              <img src={TomatoLogo} alt="TomatoLogo" />
              {' '}
              <p>82%</p>
            </LogoBox>
            <LogoBox>
              <img src={ImdbLogo} alt="ImdbLogo" />
              {' '}
              <p>7.9</p>
            </LogoBox>
            <LogoBox>
              <img src={ReviewStar} alt="ReviewStar" />
              {' '}
              <p>4.0</p>
            </LogoBox>
          </RatingWrapper>
        </TitleWrapper>
        <MyButtonArea>
          <Button className="active" type="button" onClick={handleClickWish}>
            <img src={Heart} alt="imdb-logo" />
            <p>찜하기</p>
          </Button>
          <Button className="active" type="button" onClick={handleClickWatched}>
            <img src={Eye} alt="imdb-logo" />
            <p>봤어요</p>
          </Button>
          <Button className="active" type="button" onClick={handleClickFavorite}>
            <img src={Heart} alt="imdb-logo" />
            <p>인생작품</p>
          </Button>
          <Button type="button" onClick={handleClickWriteReview}>
            <img src={PencilSimple} alt="imdb-logo" />
            <p>리뷰쓰기</p>
          </Button>
        </MyButtonArea>
      </HeaderWrapper>
    </>
  );
}
