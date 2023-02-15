/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from 'styled-components';
import Button from '../common/Button';
import Input from '../common/Input';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  div {
    display: flex;
  }
`;

const SearchForm = styled.form`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export default function SearchBar({ onSubmit }) {
  return (
    <Container>
      <SearchForm onSubmit={onSubmit}>
        <label hidden htmlFor="input-search">커뮤니티 검색</label>
        <Input
          width={200}
          height={40}
          name="search"
          placeholder="제목 혹은 내용을 입력하세요"
          id="input-search"
          type="text"
        />
        <Button
          width={80}
          height={30}
          bgcolor="#afbaca"
          type="submit"
        >
          검색
        </Button>
      </SearchForm>
    </Container>
  );
}
