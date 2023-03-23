/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import styled from 'styled-components';
import useUserStore from '../../hooks/useUserStore';
import useLoginFormStore from '../../hooks/useLoginFormStore';
import Input from '../common/Input';
import Button from '../common/Button';
import kakaoAuthUrl from '../../../kakaoConfig';
import { KaKao } from '../../assets/common';

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  color: ${((props) => props.theme.text.white)};
`;

const Title = styled.h2`
  padding-block: 4px;
  border-bottom: 1px solid ${((props) => props.theme.colors.primary)};
  font-size: ${((props) => props.theme.size.h1)};
  font-weight: 700;
  text-align: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2em;
`;

const Error = styled.div`
  height: 30px;
  
  p {
    padding-top: 20px;
    
    font-size: 15px;
    color: ${((props) => props.theme.text.red)};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;

  button {
    margin-bottom: 1em;
    font-size: 15px;

    :hover {
      background-color: ${((props) => props.theme.text.white)};
      color: ${((props) => props.theme.colors.first)};
    }
  }
`;

const KakaoButton = styled.a`
  height: 50px;
  width: 300px;
  border: none;
  background: url(/assets/common/kakao.png) no-repeat 0% 0%;
`;

export default function LoginForm() {
  const navigate = useNavigate();

  const userStore = useUserStore();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const loginFormStore = useLoginFormStore();

  const { email, password } = loginFormStore.fields;

  const handleChangeEmail = (e) => {
    loginFormStore.changeEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    loginFormStore.changePassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    loginFormStore.validate();

    if (!loginFormStore.isValidateSuccessful) {
      return;
    }

    const accessToken = await userStore.login({ email, password });

    if (userStore.loginFailed) {
      return;
    }

    setAccessToken(accessToken);

    navigate(-1);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Title>USER LOGIN</Title>
        <InputWrapper>
          <label htmlFor="input-email">
            이메일
          </label>
          <Input
            id="input-email"
            type="text"
            name="email"
            placeholder="이메일을 입력해 주세요"
            width={400}
            height={40}
            value={loginFormStore.fields.email || ''}
            error={loginFormStore.errors.email || userStore.loginFailed}
            onChange={handleChangeEmail}
          />
          <label htmlFor="input-password">
            비밀번호
          </label>
          <Input
            id="input-password"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요"
            width={400}
            height={40}
            value={loginFormStore.fields.password || ''}
            error={loginFormStore.errors.password || userStore.loginFailed}
            onChange={handleChangePassword}
          />
          <Error>
            {loginFormStore.errorMessage
              ? loginFormStore.errorMessage
              : null}
            {userStore.loginFailed
              ? '이메일 혹은 비밀번호가 맞지 않습니다'
              : null}
          </Error>
        </InputWrapper>
        <ButtonWrapper>
          <Button
            type="submit"
            width={300}
            height={44}
            bgcolor="#5e677c"
          >
            로그인
          </Button>
          <KakaoButton href={kakaoAuthUrl}>
            <img src={KaKao} alt="kakao" />
          </KakaoButton>
        </ButtonWrapper>
      </form>
      <Link to="/signup">회원가입</Link>
    </Container>
  );
}
