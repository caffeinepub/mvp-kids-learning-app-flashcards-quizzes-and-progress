import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

export default function AuthGateNotice() {
  const { login, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  return (
    <Alert className="border-4 border-warm-300 bg-warm-50">
      <Info className="h-5 w-5 text-warm-600" />
      <AlertTitle className="text-lg font-bold text-warm-800">
        Save Your Progress!
      </AlertTitle>
      <AlertDescription className="space-y-3">
        <p className="text-warm-700">
          You can play without signing in, but your progress won't be saved until you sign in.
          Sign in now to keep track of everything you learn!
        </p>
        <Button
          onClick={handleLogin}
          disabled={loginStatus === 'logging-in'}
          size="lg"
          className="rounded-full font-semibold"
        >
          {loginStatus === 'logging-in' ? 'Signing in...' : 'Sign In Now'}
        </Button>
      </AlertDescription>
    </Alert>
  );
}
