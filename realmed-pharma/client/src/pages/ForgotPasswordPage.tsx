import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Copy, CheckCheck } from 'lucide-react';
import logoImg from '@assets/realmed_bird_logo_white.png';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Something went wrong');
      } else if (data.token) {
        setResetToken(data.token);
      } else {
        setError('No account found with that email address.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetLink = `${window.location.origin}/reset-password?token=${resetToken}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(resetLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <img src={logoImg} alt="RealMed Pharma" className="w-24 h-24 object-contain" />
          <div>
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Real</span><span className="text-amber-500">Med</span>
            </h1>
            <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">Pharma</p>
          </div>
        </div>

        {!resetToken ? (
          <>
            <div className="text-center space-y-1">
              <h2 className="text-xl font-semibold">Forgot Password</h2>
              <p className="text-sm text-muted-foreground">
                Enter your email and we'll generate a password reset link for you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  autoFocus
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Generating...' : 'Generate Reset Link'}
              </Button>
            </form>
          </>
        ) : (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-semibold text-green-600">Reset Link Ready</h2>
              <p className="text-sm text-muted-foreground">
                Copy the link below and open it to reset your password. It expires in 1 hour.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-3 break-all text-xs text-muted-foreground border">
              {resetLink}
            </div>

            <Button onClick={handleCopy} variant="outline" className="w-full gap-2">
              {copied ? <><CheckCheck className="h-4 w-4 text-green-500" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy Reset Link</>}
            </Button>

            <Link
              to={`/reset-password?token=${resetToken}`}
              className="block text-center text-sm text-primary font-medium hover:underline"
            >
              Reset password now →
            </Link>
          </div>
        )}

        <Link
          to="/login"
          className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
