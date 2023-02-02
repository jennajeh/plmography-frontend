import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { profileEditFormStore } from '../../stores/ProfileEditFormStore';
import defaultTheme from '../../styles/defaultTheme';
import ProfileEditForm from './ProfileEditForm';

const context = describe;

describe('ProfileEditForm', () => {
  function renderProfileEditForm() {
    render((
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme}>
          <ProfileEditForm />
        </ThemeProvider>
      </MemoryRouter>
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
    profileEditFormStore.reset();
  });

  context('모든 항목을 올바르게 입력했을 때', () => {
    it('컨텐츠 상세 페이지로 이동한다', async () => {
      renderProfileEditForm();

      fireEvent.change(screen.getByLabelText('닉네임'), {
        target: { value: 'jenna' },
      });

      fireEvent.click(screen.getByText('저장'));

      await waitFor(() => {
        expect(profileEditFormStore.isValidateSuccessful).toBeTruthy();
      });
    });
  });
});
