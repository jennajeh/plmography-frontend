import { useEffect } from 'react';
import SignupForm from '../components/SignupForm';
import useUserStore from '../hooks/useUserStore';

export default function SignupPage() {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.resetSignupStatus();
  }, []);

  return (
    <SignupForm />
  );
}
