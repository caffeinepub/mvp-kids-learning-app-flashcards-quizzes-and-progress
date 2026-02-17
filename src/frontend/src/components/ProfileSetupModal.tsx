import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

export default function ProfileSetupModal() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  useEffect(() => {
    setIsOpen(showProfileSetup);
  }, [showProfileSetup]);

  const handleSave = async () => {
    if (!name.trim()) return;
    
    try {
      await saveProfile.mutateAsync({ name: name.trim() });
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md border-4 border-warm-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-warm-800 font-display">
            Welcome! What's Your Name?
          </DialogTitle>
          <DialogDescription className="text-warm-700">
            Tell us your name so we can personalize your learning experience!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-warm-800 font-semibold">
              Your Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="border-2 border-warm-300 rounded-xl h-12 text-lg"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={!name.trim() || saveProfile.isPending}
            size="lg"
            className="w-full rounded-full font-semibold"
          >
            {saveProfile.isPending ? 'Saving...' : 'Start Learning!'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
