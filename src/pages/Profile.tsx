import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function Profile() {
  const navigate = useNavigate();
  const [playerNick, setPlayerNick] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const nick = localStorage.getItem('playerNick');
    
    if (!isLoggedIn) {
      navigate('/register');
    } else {
      setPlayerNick(nick || 'Player0000');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('playerNick');
    navigate('/');
  };

  const stats = [
    { label: 'Уровень', value: '12', icon: 'Trophy' },
    { label: 'Монеты', value: '2,450', icon: 'Coins' },
    { label: 'Игр сыграно', value: '47', icon: 'Gamepad2' },
    { label: 'Друзей', value: '23', icon: 'Users' },
  ];

  const achievements = [
    { name: 'Новичок', desc: 'Первая игра', color: 'from-blue-500 to-cyan-500' },
    { name: 'Победитель', desc: '10 побед', color: 'from-yellow-500 to-orange-500' },
    { name: 'Легенда', desc: 'Уровень 10', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Yjg3ZjUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4UzAgOC4wNiAwIDE4czguMDYgMTggMTggMThoMThjOS45NCAwIDE4LTguMDYgMTgtMTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <Button variant="ghost" onClick={() => navigate('/')} className="hover:bg-primary/10">
            <Icon name="Home" size={20} className="mr-2" />
            Главная
          </Button>
          <Button variant="ghost" onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive">
            <Icon name="LogOut" size={20} className="mr-2" />
            Выйти
          </Button>
        </div>

        <Card className="mb-6 border-primary/20 bg-card/95 backdrop-blur animate-scale-in">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-32 h-32 border-4 border-primary shadow-lg shadow-primary/50">
                <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-primary via-secondary to-accent text-white">
                  {playerNick.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-col md:flex-row items-center gap-3">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    {playerNick}
                  </h1>
                  <Badge className="bg-gradient-to-r from-primary to-secondary border-0">
                    PRO
                  </Badge>
                </div>
                <p className="text-muted-foreground">Игрок с {new Date().toLocaleDateString('ru')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label} 
              className="border-primary/20 bg-card/95 backdrop-blur hover:border-primary/40 transition-all cursor-pointer hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                  <Icon name={stat.icon as any} size={24} className="text-white" />
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-primary/20 bg-card/95 backdrop-blur animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Award" size={24} className="text-primary" />
              Достижения
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={achievement.name}
                  className="p-4 rounded-lg bg-gradient-to-br from-card to-background border border-primary/20 hover:border-primary/40 transition-all cursor-pointer hover:scale-105"
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${achievement.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <Icon name="Star" size={32} className="text-white" />
                  </div>
                  <h3 className="font-bold text-center mb-1">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground text-center">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
