import styled from 'styled-components';
import Category from '../components/content/Category';

const Container = styled.div`
  min-height: calc(100vh - env(safe-area-inset-bottom) - 56px);
  max-width: 70em;
  margin: 0 auto;
  padding-bottom: calc(env(safe-area-inset-bottom) + 56px);
  overflow: hidden;
`;

export default function ExplorePage() {
  return (
    <Container>
      <Category />
    </Container>
  );
}
