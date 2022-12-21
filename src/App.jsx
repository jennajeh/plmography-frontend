import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RecommendationsPage from './pages/RecommendationsPage';
import CommunityPage from './pages/CommunityPage';
import ExplorePage from './pages/ExplorePage';
import NewContentsPage from './pages/NewContentsPage';
import LoginPage from './pages/LoginPage';
import EventsPage from './pages/EventsPage';
import SupportPage from './pages/SupportPage';
import defaultTheme from './styles/defaultTheme';
import GlobalStyle from './styles/GlobalStyle';

const Main = styled.main`
  height: calc(100vh - 64px);
`;

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          {/* <Route path="/recommendations/:id" element={<RecommendationsListPage />} /> */}
          {/* <Route path="/recommendation/:id" element={<RecommendationDetailPage />} /> */}
          <Route path="/community" element={<CommunityPage />} />
          {/* <Route path="/community/post/:id" element={<CommunityPostDetailPage />} /> */}
          {/* <Route path="/community/history" element={<CommunityHistoryPage />} /> */}
          {/* <Route path="/contents/:id" element={<ContentsDetailPage />} /> */}
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/new-contents" element={<NewContentsPage />} />
          {/* <Route path="/ranking" element={<DailyRankingPage />} /> */}
          {/* <Route path="/next-contents" element={<NextContentsPage />} /> */}
          {/* <Route path="/articles" element={<ArticlesPage />} /> */}
          {/* <Route path="/articles/themes/:id" element={<ArticlesThemeDetailPage />} /> */}
          {/* <Route path="/articles/stories/:id" element={<ArticlesStoryDetailPage />} /> */}
          {/* <Route path="/articles/interviews/:id" element={<ArticlesInterviewsDetailPage />} /> */}
          {/* <Route path="/users/:id" element={<ProfilePage />} /> */}
          {/* <Route path="/users/:id/edit" element={<ProfileEditPage />} /> */}
          {/* <Route path="/users/:id/reset-password" element={<ResetPasswordPage />} /> */}
          {/* <Route path="/users/:id/reviews" element={<ReviewsPage />} /> */}
          {/* <Route path="/users/:id/services/edit" element={<ServiceChoicePage />} /> */}
          {/* <Route path="/users/:id/favorites" element={<FavoriteContentsPage />} /> */}
          {/* <Route path="/users/:id/likes" element={<LikeContentsPage />} /> */}
          {/* <Route path="/signup" element={<SignupPage />} /> */}
          {/* <Route path="/signup/greeting" element={<GreetingPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/events" element={<EventsPage />} />
          {/* <Route path="/events/:id" element={<EventsDetailPage />} /> */}
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </Main>
    </ThemeProvider>
  );
}