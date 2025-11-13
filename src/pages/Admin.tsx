import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

const ADMIN_EMAIL = 'glebakuni9@gmail.com';

interface Player {
  id: number;
  username: string;
  email: string;
  level: number;
  coins: number;
  gamesPlayed: number;
  status: 'online' | 'offline';
  registeredAt: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [stats, setStats] = useState({
    totalPlayers: 0,
    onlinePlayers: 0,
    totalGames: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const registeredEmail = localStorage.getItem('playerEmail');
    
    if (registeredEmail !== ADMIN_EMAIL) {
      navigate('/');
      return;
    }
    
    setIsAdmin(true);
    loadMockData();
  }, [navigate]);

  const loadMockData = () => {
    const mockPlayers: Player[] = [
      { id: 1, username: 'Player1234', email: 'player1@test.com', level: 15, coins: 3200, gamesPlayed: 52, status: 'online', registeredAt: '2024-01-15' },
      { id: 2, username: 'Player5678', email: 'player2@test.com', level: 8, coins: 1100, gamesPlayed: 23, status: 'offline', registeredAt: '2024-02-20' },
      { id: 3, username: 'Player9012', email: 'player3@test.com', level: 22, coins: 5600, gamesPlayed: 89, status: 'online', registeredAt: '2023-12-10' },
      { id: 4, username: 'Player3456', email: 'player4@test.com', level: 5, coins: 450, gamesPlayed: 12, status: 'offline', registeredAt: '2024-03-01' },
      { id: 5, username: 'Player7890', email: 'player5@test.com', level: 18, coins: 4200, gamesPlayed: 67, status: 'online', registeredAt: '2024-01-28' },
    ];

    setPlayers(mockPlayers);
    setStats({
      totalPlayers: mockPlayers.length,
      onlinePlayers: mockPlayers.filter(p => p.status === 'online').length,
      totalGames: mockPlayers.reduce((sum, p) => sum + p.gamesPlayed, 0),
      totalRevenue: mockPlayers.reduce((sum, p) => sum + p.coins, 0)
    });
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Yjg3ZjUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4UzAgOC4wNiAwIDE4czguMDYgMTggMTggMThoMThjOS45NCAwIDE4LTguMDYgMTgtMTh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-destructive to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Icon name="Shield" size={24} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold">Админ-панель</h1>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')} className="hover:bg-primary/10">
            <Icon name="Home" size={20} className="mr-2" />
            Главная
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Всего игроков', value: stats.totalPlayers, icon: 'Users', color: 'from-blue-500 to-cyan-500' },
            { label: 'Онлайн', value: stats.onlinePlayers, icon: 'Activity', color: 'from-green-500 to-emerald-500' },
            { label: 'Игр сыграно', value: stats.totalGames, icon: 'Gamepad2', color: 'from-purple-500 to-pink-500' },
            { label: 'Всего монет', value: stats.totalRevenue.toLocaleString(), icon: 'Coins', color: 'from-yellow-500 to-orange-500' },
          ].map((stat, index) => (
            <Card 
              key={stat.label}
              className="border-primary/20 bg-card/95 backdrop-blur animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className={`w-12 h-12 mb-3 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
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
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Icon name="Users" size={24} className="text-primary" />
                Список игроков
              </span>
              <Badge className="bg-gradient-to-r from-primary to-secondary border-0">
                {stats.totalPlayers} игроков
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/20">
                    <TableHead>ID</TableHead>
                    <TableHead>Никнейм</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Уровень</TableHead>
                    <TableHead>Монеты</TableHead>
                    <TableHead>Игры</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Дата регистрации</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((player) => (
                    <TableRow key={player.id} className="border-primary/20 hover:bg-primary/5">
                      <TableCell className="font-medium">#{player.id}</TableCell>
                      <TableCell className="font-semibold">{player.username}</TableCell>
                      <TableCell className="text-muted-foreground">{player.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-primary/30">
                          LVL {player.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-yellow-500 font-semibold">
                        {player.coins.toLocaleString()}
                      </TableCell>
                      <TableCell>{player.gamesPlayed}</TableCell>
                      <TableCell>
                        <Badge 
                          className={player.status === 'online' 
                            ? 'bg-green-500/20 text-green-500 border-green-500/30' 
                            : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                          }
                        >
                          <div className={`w-2 h-2 rounded-full mr-2 ${player.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                          {player.status === 'online' ? 'Онлайн' : 'Оффлайн'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{player.registeredAt}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/10">
                            <Icon name="Eye" size={16} />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive">
                            <Icon name="Ban" size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
