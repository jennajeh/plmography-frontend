import { profileEditFormStore } from '../stores/ProfileEditFormStore';
import useStore from './useStore';

export default function useProfileEditFormStore() {
  return useStore(profileEditFormStore);
}
