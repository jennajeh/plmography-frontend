/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../../hooks/useUserStore';
import useSignupFormStore from '../../hooks/useSignupFormStore';
import Input from '../common/Input';
import Button from '../common/Button';

const Container = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  padding-block: 4px;
  border-bottom: 1px solid ${((props) => props.theme.colors.primary)};
  font-size: ${((props) => props.theme.size.h1)};
  font-weight: 700;
  text-align: center;
`;

const Inputs = styled.div`
  min-width: 390px;
  margin-block: 60px;
  color: ${((props) => props.theme.text.gray)};
`;

const InputWrapper = styled.div`
  & + & {
    margin-top: 24px;
  }

  input {
    width: 100%;
  }
`;

export default function SignupForm() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const signupFormStore = useSignupFormStore();
  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const {
    nickname, email, password, passwordCheck,
  } = signupFormStore.fields;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signupFormStore.validate();

    if (signupFormStore.isValidateSuccessful) {
      await userStore.signup({
        email, nickname, password, passwordCheck,
      });

      const accessToken = await userStore.login({ email, password });

      setAccessToken(accessToken);

      navigate('/greeting');
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Title>SIGN UP</Title>
        <Wrapper>
          <Inputs>
            <InputWrapper>
              <label htmlFor="input-email">
                이메일
              </label>
              <Input
                name="email"
                type="text"
                value={signupFormStore.fields.email || ''}
                onChange={(e) => signupFormStore.changeEmail(e.target.value)}
                errorMessage={signupFormStore.errors.email}
                height={40}
              />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="input-password">
                비밀번호
              </label>
              <Input
                name="password"
                type="password"
                value={signupFormStore.fields.password || ''}
                onChange={(e) => signupFormStore.changePassword(e.target.value)}
                errorMessage={signupFormStore.errors.password}
                placeholder="
                8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 합니다."
                height={40}
              />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="input-passwordCheck">
                비밀번호 확인
              </label>
              <Input
                name="passwordCheck"
                type="password"
                value={signupFormStore.fields.passwordCheck || ''}
                onChange={(e) => signupFormStore.changePasswordCheck(e.target.value)}
                errorMessage={signupFormStore.errors.passwordCheck}
                placeholder="
                8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 합니다."
                height={40}
              />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="input-nickname">
                닉네임
              </label>
              <Input
                name="nickname"
                type="text"
                value={signupFormStore.fields.nickname || ''}
                onChange={(e) => signupFormStore.changeNickname(e.target.value)}
                errorMessage={signupFormStore.errors.nickname}
                placeholder="특수문자 제외, 3~12 자 이내여야 합니다."
                height={40}
              />
            </InputWrapper>
          </Inputs>
          <Button
            type="submit"
            width={300}
            height={44}
            bgcolor="#5e677c"
          >
            회원가입

          </Button>
        </Wrapper>
      </form>
    </Container>
  );
}
