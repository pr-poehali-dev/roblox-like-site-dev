import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const randomNick = `Player${Math.floor(Math.random() * 10000)}`;
      const randomPass = Math.random().toString(36).slice(-8);

      toast({
        title: "🎮 Добро пожаловать!",
        description: `Ник и пароль отправлены на ${email}`,
      });

      localStorage.setItem('playerNick', randomNick);
      localStorage.setItem('isLoggedIn', 'true');
      
      setTimeout(() => {
        navigate('/profile');
      }, 1000);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Что-то пошло не так",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Yjg3ZjUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4UzAgOC4wNiAwIDE4czguMDYgMTggMTggMThoMThjOS45NCAwIDE4LTguMDYgMTgtMTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      <Card className="w-full max-w-md relative z-10 animate-scale-in border-primary/20 bg-card/95 backdrop-blur">
        <CardHeader className="text-center space-y-2">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center mb-4 animate-float shadow-lg shadow-primary/50">
            <Icon name="Gamepad2" size={40} className="text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Регистрация
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Введи email и получи игровой ник с паролем
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="твой@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-background/50 border-primary/30 focus:border-primary transition-colors"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all font-semibold text-lg shadow-lg shadow-primary/30"
              disabled={isLoading}
            >
              {isLoading ? (
                <Icon name="Loader2" className="animate-spin" size={24} />
              ) : (
                <>
                  <Icon name="Rocket" size={20} className="mr-2" />
                  Начать играть
                </>
              )}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              На главную
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
