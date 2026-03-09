import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Pill } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAppStore((s) => s.login);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    login(name.trim());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
            <Pill className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground" data-testid="text-company-name">Realmed Pharma</h1>
            <p className="text-sm text-muted-foreground mt-1">Field Sales Hub</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              data-testid="input-name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              autoFocus
            />
            {error && <p className="text-sm text-destructive" data-testid="text-error">{error}</p>}
          </div>
          <Button type="submit" className="w-full" data-testid="button-login">
            Sign In
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground">
          Medical Representative Portal
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
