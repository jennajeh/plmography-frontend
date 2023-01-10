import { useEffect } from 'react';
import SignupForm from '../components/login-signup/SignupForm';
import useSignupFormStore from '../hooks/useSignupFormStore';
import useUserStore from '../hooks/useUserStore';

export default function SignupPage() {
  const userStore = useUserStore();
  const signupFormStore = useSignupFormStore();

  useEffect(() => {
    userStore.resetSignupStatus();
    signupFormStore.reset();
  }, []);

  return (
    <SignupForm />
  );
}
