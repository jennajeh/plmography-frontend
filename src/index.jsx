import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { commentApiService } from './services/CommentApiService';
import { contentApiService } from './services/ContentApiService';
import { reviewApiService } from './services/ReviewApiService';
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
commentApiService.setAccessToken(accessToken);
subscribeApiService.setAccessToken(accessToken);
themeApiService.setAccessToken(accessToken);

root.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
