import { useState } from 'react';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import QuizPage from './pages/QuizPage';
import ProgressPage from './pages/ProgressPage';
import AppLayout from './components/AppLayout';
import ProfileSetupModal from './components/ProfileSetupModal';
import { useInternetIdentity } from './hooks/useInternetIdentity';

type Page = 'home' | 'learn' | 'quiz' | 'progress';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <AppLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {isAuthenticated && <ProfileSetupModal />}
      {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === 'learn' && <LearnPage />}
      {currentPage === 'quiz' && <QuizPage />}
      {currentPage === 'progress' && <ProgressPage />}
    </AppLayout>
  );
}
