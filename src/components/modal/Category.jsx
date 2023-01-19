import styled from 'styled-components';

const Menu = styled.h1`
  padding-block: 1em;
  font-weight: 700;
  font-size: 1.5em;
  text-align: center;
`;

export default function Category() {
  return (
    <>
      <Menu>작품 탐색</Menu>
      <select name="cars" id="cars">
        <option value="영화/TV">영화/TV</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <select name="cars" id="cars">
        <option value="영화/TV">국가</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <select name="cars" id="cars">
        <option value="영화/TV">장르</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <select name="cars" id="cars">
        <option value="영화/TV">등급</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <select name="cars" id="cars">
        <option value="영화/TV">인기순</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </>
  );
}
