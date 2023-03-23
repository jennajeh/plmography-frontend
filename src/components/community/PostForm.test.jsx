import {
  render, screen,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { postFormStore } from '../../stores/PostFormStore';
import defaultTheme from '../../styles/defaultTheme';
import PostForm from './PostForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('PostForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    postFormStore.reset();
  });

  function renderPostForm() {
    render(
      <ThemeProvider theme={defaultTheme}>
        <PostForm />
      </ThemeProvider>,
    );
  }

  it('게시물 등록 폼을 보여준다', async () => {
    renderPostForm();

    screen.getByText('등록');
  });
});
