import { loginFormStore } from '../stores/LoginFormStore';
import useStore from './useStore';

export default function useLoginFormStore() {
  return useStore(loginFormStore);
}
