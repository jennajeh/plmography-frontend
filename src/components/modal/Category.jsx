import styled from 'styled-components';

const Container = styled.article`
  display: block;
  z-index: 9000;
  width: 100%;
  max-width: 700px;
`;

const Title = styled.h1`
  padding-block: 1em;
  font-weight: 700;
  font-size: 1.5em;
  text-align: center;
`;

const PlatformWrapper = styled.div`
  padding: 4px 0 4px 16px;
  max-width: 684px;
`;

const PlatFormButton = styled.button`
  opacity: 1;
  margin-left: 4px;
  padding: 4px 4px 0 2px;
  position: relative;
  background: none;
  border: none;

  img {
    display: inline-block;
    width: 4em;
    object-fit: contain;
    vertical-align: middle;
  }
`;

const FilterWrapper = styled.div`
  max-width: 700px;
  display: flex;
  align-items: center;
  padding: 10px 16px 12px;
`;

const Filter = styled.div`
  flex-shrink: 0;
  border-radius: 100em;
  margin: 1em;

  button {
  font-size: .9em;
  font-weight: bold;
  background-color: #1c1c85;
  color: white;
  border: none;
  width: 6em;
  height: 2em;
  border-radius: 10px;
  }
`;

export default function Category() {
  const appleTv = 'https://plmographybucket.s3.ap-northeast-2.amazonaws.com/btn_appletv.png';
  const disneyPlus = 'https://plmographybucket.s3.ap-northeast-2.amazonaws.com/btn_disneyplus.png';
  const netflix = 'https://plmographybucket.s3.ap-northeast-2.amazonaws.com/btn_netflix.png';
  const tving = 'https://plmographybucket.s3.ap-northeast-2.amazonaws.com/btn_tving.png';
  const watcha = 'https://plmographybucket.s3.ap-northeast-2.amazonaws.com/btn_watcha.png';
  const wavve = 'https://plmographybucket.s3.ap-northeast-2.amazonaws.com/btn_wavve.png';

  return (
    <Container>
      <Title>작품 탐색</Title>
      <PlatformWrapper>
        <PlatFormButton>
          <img src={netflix} alt="netflix" />
        </PlatFormButton>
        <PlatFormButton>
          <img src={appleTv} alt="appleTv" />
        </PlatFormButton>
        <PlatFormButton>
          <img src={disneyPlus} alt="disneyPlus" />
        </PlatFormButton>
        <PlatFormButton>
          <img src={tving} alt="tving" />
        </PlatFormButton>
        <PlatFormButton>
          <img src={watcha} alt="watcha" />
        </PlatFormButton>
        <PlatFormButton>
          <img src={wavve} alt="wavve" />
        </PlatFormButton>
      </PlatformWrapper>
      <FilterWrapper>
        <Filter>
          <button type="button">영화/드라마</button>
        </Filter>
        <Filter>
          <button type="button">장르</button>
        </Filter>
        <Filter>
          <button type="button">개봉연도</button>
        </Filter>
      </FilterWrapper>
      <select id="contents-sorting">
        <option value="polular">인기순</option>
        <option value="release">개봉순</option>
        <option value="title">이름순</option>
      </select>
    </Container>
  );
}
