import { Home, BookOpen, Brain, TrendingUp } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';

type Page = 'home' | 'learn' | 'quiz' | 'progress';

interface AppLayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function AppLayout({ children, currentPage, onNavigate }: AppLayoutProps) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';
  const buttonText = loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'learn' as Page, label: 'Learn', icon: BookOpen },
    { id: 'quiz' as Page, label: 'Quiz', icon: Brain },
    { id: 'progress' as Page, label: 'Progress', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-warm-50 to-warm-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b-4 border-warm-300 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-warm-400 to-warm-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🎓</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800 font-display">
              Kids Learning
            </h1>
          </div>
          <Button
            onClick={handleAuth}
            disabled={disabled}
            size="lg"
            className="rounded-full font-semibold shadow-md"
            variant={isAuthenticated ? 'outline' : 'default'}
          >
            {buttonText}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t-4 border-warm-300 shadow-lg sticky bottom-0">
        <div className="container mx-auto px-2 py-3">
          <div className="flex justify-around items-center max-w-2xl mx-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all min-w-[80px] ${
                    isActive
                      ? 'bg-warm-400 text-white shadow-md scale-105'
                      : 'text-warm-700 hover:bg-warm-100'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <footer className="bg-warm-800 text-warm-100 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Kids Learning App. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'kids-learning-app'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
