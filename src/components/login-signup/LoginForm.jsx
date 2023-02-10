/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import styled from 'styled-components';
import useUserStore from '../../hooks/useUserStore';
import useLoginFormStore from '../../hooks/useLoginFormStore';
import Input from '../common/Input';
import Button from '../common/Button';

const Container = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  a {
    display: block;
    margin-top: 60px;
    text-align: center;
  }
`;

const Title = styled.h2`
  padding-block: 4px;
  border-bottom: 1px solid ${((props) => props.theme.colors.primary)};
  font-size: ${((props) => props.theme.size.h1)};
  font-weight: 700;
  text-align: center;
`;

const Inputs = styled.div`
  #input-username {
    margin-top: 60px;
  }
`;

const Error = styled.div`
  height: 60px;
  
  p {
    padding-top: 20px;
    
    font-size: 15px;
    color: ${((props) => props.theme.text.red)};
  }
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
        <label htmlFor="input-email">이메일</label>
        <Inputs>
          <Input
            id="input-email"
            type="text"
            name="email"
            placeholder="이메일"
            value={loginFormStore.fields.email || ''}
            error={loginFormStore.errors.email || userStore.loginFailed}
            onChange={handleChangeEmail}
          />
          <label htmlFor="input-password">비밀번호</label>
          <Input
            id="input-password"
            type="password"
            name="password"
            placeholder="비밀번호"
            value={loginFormStore.fields.password || ''}
            error={loginFormStore.errors.password || userStore.loginFailed}
            onChange={handleChangePassword}
          />
        </Inputs>
        <Error>
          {loginFormStore.errorMessage
            ? loginFormStore.errorMessage
            : null}
          {userStore.loginFailed
            ? '이메일 혹은 비밀번호가 맞지 않습니다'
            : null}
        </Error>
        <Button type="submit">로그인</Button>
        <Link to="/signup">회원가입</Link>
      </form>
    </Container>
  );
}
