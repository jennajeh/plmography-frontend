import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { contentApiService } from './services/ContentApiService';
import { postApiService } from './services/PostApiService';
import { postCommentApiService } from './services/PostCommentApiService';
import { reviewApiService } from './services/ReviewApiService';
import { reviewCommentApiService } from './services/ReviewCommentApiService';
import { subscribeApiService } from './services/SubscribeApiService';
import { themeApiService } from './services/ThemeApiService';
import { userApiService } from './services/UserApiService';

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

const data = localStorage.getItem('accessToken');
const accessToken = JSON.parse(data);

userApiService.setAccessToken(accessToken);
contentApiService.setAccessToken(accessToken);
reviewApiService.setAccessToken(accessToken);
reviewCommentApiService.setAccessToken(accessToken);
subscribeApiService.setAccessToken(accessToken);
themeApiService.setAccessToken(accessToken);
postApiService.setAccessToken(accessToken);
postCommentApiService.setAccessToken(accessToken);

root.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
