import styled from 'styled-components';
import MyReview from '../review/MyReview';
import OtherReview from '../review/OtherReview';

const Container = styled.div`
  color: ${((props) => props.theme.text.white)};
`;

export default function ContentDetailReviews() {
  return (
    <Container>
      <MyReview />
      <OtherReview />
    </Container>
  );
}
