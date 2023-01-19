import { signupFormStore } from '../stores/SignupFormStore';
import useStore from './useStore';

export default function useSignupFormStore() {
  return useStore(signupFormStore);
}
