import { auth, loginHandler } from '../../components/auth/auth';
import {
  loginBtn,
} from '../../components/utils/Constants';


// Event listeners
loginBtn.addEventListener('click', loginHandler);

window.onload = () => {
  auth();
};
