/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../../hooks/useUserStore';
import useSignupFormStore from '../../hooks/useSignupFormStore';
import Input, { RadioInput } from '../common/Input';
import Button from '../common/Button';

const Container = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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
`;

export default function SignupForm() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const signupFormStore = useSignupFormStore();
  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const {
    nickname, email, password, gender, birthYear,
  } = signupFormStore.fields;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signupFormStore.validate();

    if (signupFormStore.isValidateSuccessful) {
      await userStore.signup({
        email, nickname, password, gender, birthYear,
      });

      const accessToken = await userStore.login({ email, password });

      setAccessToken(accessToken);

      // if (userStore.signupSuccessful) {
      //   navigate('/greeting');
      // }
    }

    // const accessToken = await userStore.login({ email, password });

    // setAccessToken(accessToken);
  };

  useEffect(() => {
    if (userStore.signupSuccessful) {
      navigate('/greeting');
    }
  }, [userStore.signupSuccessful]);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Title>SIGN UP</Title>
        <Inputs>
          <InputWrapper>
            <Input
              name="email"
              label="이메일:"
              type="text"
              value={signupFormStore.fields.email || ''}
              onChange={(e) => signupFormStore.changeEmail(e.target.value)}
              errorMessage={signupFormStore.errors.email}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              name="password"
              label="비밀번호:"
              type="text"
              value={signupFormStore.fields.password || ''}
              onChange={(e) => signupFormStore.changePassword(e.target.value)}
              message="8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 합니다."
              errorMessage={signupFormStore.errors.password}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              name="passwordCheck"
              label="비밀번호 확인:"
              type="password"
              value={signupFormStore.fields.passwordCheck || ''}
              onChange={(e) => signupFormStore.changePasswordCheck(e.target.value)}
              errorMessage={signupFormStore.errors.passwordCheck}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              name="nickname"
              label="닉네임:"
              type="text"
              value={signupFormStore.fields.nickname || ''}
              onChange={(e) => signupFormStore.changeNickname(e.target.value)}
              message="특수문자를 제외하고 입력해 주세요."
              errorMessage={signupFormStore.errors.nickname}
            />
          </InputWrapper>
        </Inputs>
        <label htmlFor="radio-gender">성별:</label>
        <RadioInput
          name="gender"
          type="radio"
          label="여성"
          checked="checked"
          value={signupFormStore.fields.gender || ''}
          onChange={(e) => signupFormStore.changeGender(e.target.value)}
        />
        <RadioInput
          name="gender"
          type="radio"
          label="남성"
          value={signupFormStore.fields.gender || ''}
          onChange={(e) => signupFormStore.changeGender(e.target.value)}
        />
        <label htmlFor="select-birth">출생연도:</label>
        <select
          id="select-birth"
          name="birth"
          value={signupFormStore.fields.birth || ''}
          onChange={(e) => signupFormStore.changeBirth(e.target.value)}
        >
          <option value="1990">1990</option>
          <option value="1991">1991</option>
          <option value="1992">1992</option>
          <option value="1993">1993</option>
          <option value="1994">1994</option>
        </select>
        <Button type="submit">회원가입</Button>
      </form>
    </Container>
  );
}
