import { useEffect } from 'react';
import useUserStore from '../hooks/useUserStore';
import useLoginFormStore from '../hooks/useLoginFormStore';
import LoginForm from '../components/login-signup/LoginForm';

export default function LoginPage() {
  const userStore = useUserStore();
  const loginFormStore = useLoginFormStore();

  useEffect(() => {
    userStore.resetLoginStatus();
    loginFormStore.reset();
  }, []);

  return (
    <div>
      <LoginForm />
    </div>
  );
}
