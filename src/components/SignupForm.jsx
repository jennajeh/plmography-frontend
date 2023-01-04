/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';
import useSignupFormStore from '../hooks/useSignupFormStore';
import Input from './common/Input';
import Button from './common/Button';

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

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 700;
`;

export default function SignupForm() {
  const navigate = useNavigate();

  const userStore = useUserStore();

  const signupFormStore = useSignupFormStore();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const { nickname, email, password } = signupFormStore.fields;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signupFormStore.validate();

    if (signupFormStore.isValidateSuccessful) {
      await userStore.signup({ email, nickname, password });
    }

    const accessToken = await userStore.login({ email, password });

    setAccessToken(accessToken);
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
            <Label htmlFor="input-email">이메일:</Label>
            <Input
              id="input-email"
              type="text"
              name="email"
              value={signupFormStore.fields.email || ''}
              onChange={(e) => signupFormStore.changeEmail(e.target.value)}
              errorMessage={signupFormStore.errors.email}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="input-password">비밀번호:</Label>
            <Input
              id="input-password"
              type="text"
              name="password"
              value={signupFormStore.fields.password || ''}
              onChange={(e) => signupFormStore.changePassword(e.target.value)}
              message="8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 합니다."
              errorMessage={signupFormStore.errors.password}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="input-passwordCheck">비밀번호 확인:</Label>
            <Input
              id="input-passwordCheck"
              type="password"
              name="passwordCheck"
              value={signupFormStore.fields.passwordCheck || ''}
              onChange={(e) => signupFormStore.changePasswordCheck(e.target.value)}
              errorMessage={signupFormStore.errors.passwordCheck}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="input-nickname">닉네임:</Label>
            <Input
              id="input-nickname"
              type="text"
              name="nickname"
              value={signupFormStore.fields.nickname || ''}
              onChange={(e) => signupFormStore.changeNickname(e.target.value)}
              message="특수문자는 사용할 수 없습니다."
              errorMessage={signupFormStore.errors.nickname}
            />
          </InputWrapper>
        </Inputs>
        {/* <Label htmlFor="radio-gender">성별:</Label>
        <input
          id="radio-gender"
          type="radio"
          name="gender"
          value={signupFormStore.fields.gender || ''}
          onClick={(e) => signupFormStore.changeGender(e.target.value)}
          // message="성별을 선택해 주세요."
          // errorMessage={signupFormStore.errors.gender}
        />
        <label htmlFor="radio-woman">여성</label>
        <input
          id="radio-gender"
          type="radio"
          name="gender"
          value={signupFormStore.fields.gender || ''}
          onClick={(e) => signupFormStore.changeGender(e.target.value)}
          // message="성별을 선택해 주세요."
          // errorMessage={signupFormStore.errors.gender}
        />
        <label htmlFor="radio-man">남성</label>
        <Label htmlFor="select-birth">출생연도:</Label>
        <select name="birth" value={signupFormStore.fields.birth || ''} onChange={(e) => signupFormStore.changeBirth(e.target.value)}>
          <option value="">출생 연도</option>
          <option value="1990">1990</option>
          <option value="1991">1991</option>
          <option value="1992">1992</option>
          <option value="1993">1993</option>
          <option value="1994">1994</option>
        </select> */}
        <Button type="submit">회원가입</Button>
      </form>
    </Container>
  );
}
