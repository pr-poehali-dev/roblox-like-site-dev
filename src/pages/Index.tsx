import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();

  const games = [
    {
      title: 'Гонки в космосе',
      players: '12.5K',
      icon: 'Rocket',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Битва героев',
      players: '8.3K',
      icon: 'Sword',
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'Строитель миров',
      players: '15.2K',
      icon: 'Box',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Пиксель Арена',
      players: '6.7K',
      icon: 'Zap',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Квест приключений',
      players: '9.1K',
      icon: 'Map',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Звездный флот',
      players: '11.4K',
      icon: 'Plane',
      color: 'from-indigo-500 to-blue-500'
    },
  ];

  const features = [
    { icon: 'Users', title: 'Играй с друзьями', desc: 'Создавай команды и соревнуйся' },
    { icon: 'Trophy', title: 'Достижения', desc: 'Собирай награды и прокачивайся' },
    { icon: 'Sparkles', title: 'Создавай миры', desc: 'Строй свои уникальные игры' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Yjg3ZjUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4UzAgOC4wNiAwIDE4czguMDYgMTggMTggMThoMThjOS45NCAwIDE4LTguMDYgMTgtMTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="relative z-10">
        <nav className="border-b border-primary/20 bg-card/50 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/50">
                <Icon name="Gamepad2" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                GameVerse
              </span>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => navigate('/register')} className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all font-semibold shadow-lg shadow-primary/30">
                <Icon name="UserPlus" size={18} className="mr-2" />
                Регистрация
              </Button>
              <Button onClick={() => navigate('/profile')} variant="outline" className="border-primary/30 hover:bg-primary/10">
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </Button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              GameVerse
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Создавай, играй и исследуй бесконечные миры вместе с миллионами игроков
            </p>
            <Button 
              onClick={() => navigate('/register')}
              size="lg" 
              className="h-14 px-8 text-lg bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all font-bold shadow-xl shadow-primary/40"
            >
              <Icon name="Rocket" size={24} className="mr-2" />
              Начать играть бесплатно
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="border-primary/20 bg-card/95 backdrop-blur hover:border-primary/40 transition-all cursor-pointer hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 animate-float">
                    <Icon name={feature.icon as any} size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Популярные игры</h2>
              <Badge className="bg-gradient-to-r from-primary to-secondary border-0 px-4 py-2">
                <Icon name="TrendingUp" size={16} className="mr-2" />
                Топ недели
              </Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game, index) => (
                <Card 
                  key={game.title}
                  className="border-primary/20 bg-card/95 backdrop-blur hover:border-primary/40 transition-all cursor-pointer group animate-fade-in overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className={`h-48 bg-gradient-to-br ${game.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon name={game.icon as any} size={64} className="text-white opacity-90" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Icon name="Users" size={16} />
                          <span>{game.players} игроков</span>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                          Играть
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
