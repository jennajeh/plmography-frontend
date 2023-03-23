import { ThemeProvider } from 'styled-components';
import {
  render, screen,
} from '@testing-library/react';
import defaultTheme from '../../styles/defaultTheme';
import { postEditFormStore } from '../../stores/PostEditFormStore';
import PostEditForm from './PostEditForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
  useParams() {
    return { id: 1 };
  },
}));

describe('PostForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    postEditFormStore.reset();
  });

  function renderPostEditForm() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <PostEditForm />
      </ThemeProvider>
    ));
  }

  it('게시물 수정 폼을 보여준다', async () => {
    renderPostEditForm();

    screen.getByText('수정');
  });
});
