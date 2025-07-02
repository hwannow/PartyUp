import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Users, Search, Plus, Crown, Lock, LogIn, UserPlus, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Party {
  id: string;
  title: string;
  game: string;
  host: string;
  members: number;
  maxMembers: number;
  tags: string[];
  rating: number;
  isPrivate: boolean;
}

const dummyParties: Party[] = [
  {
    id: "1",
    title: "롤 5인 랭크",
    game: "리그 오브 레전드",
    host: "김은지",
    members: 3,
    maxMembers: 5,
    tags: ["랭크", "5인", "듀오"],
    rating: 4.5,
    isPrivate: false
  },
  {
    id: "2",
    title: "발로란트 내전",
    game: "발로란트",
    host: "장은영",
    members: 4,
    maxMembers: 5,
    tags: ["내전", "5인"],
    rating: 4.8,
    isPrivate: true
  },
  {
    id: "3",
    title: "배그 스쿼드",
    game: "배틀그라운드",
    host: "박지민",
    members: 2,
    maxMembers: 4,
    tags: ["스쿼드", "배린이"],
    rating: 4.2,
    isPrivate: false
  },
  {
    id: "4",
    title: "오버워치 경쟁전",
    game: "오버워치 2",
    host: "박소영",
    members: 2,
    maxMembers: 5,
    tags: ["경쟁전", "힐러"],
    rating: 4.9,
    isPrivate: false
  },
  {
    id: "5",
    title: "로스트아크 레이드",
    game: "로스트아크",
    host: "이민수",
    members: 6,
    maxMembers: 8,
    tags: ["레이드", "고수"],
    rating: 4.7,
    isPrivate: true
  },
  {
    id: "6",
    title: "디아블로 4 쩔",
    game: "디아블로 4",
    host: "박서연",
    members: 3,
    maxMembers: 4,
    tags: ["쩔", "고행"],
    rating: 4.0,
    isPrivate: false
  }
];

const gameTypes = ["전체", "리그 오브 레전드", "발로란트", "배틀그라운드", "오버워치 2", "로스트아크", "디아블로 4"];

const Index = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState("전체");
  const [passwordInput, setPasswordInput] = useState("");
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);

  const filteredParties = dummyParties.filter((party) => {
    const searchRegex = new RegExp(searchTerm, "i");
    const gameFilter = selectedGame === "전체" || party.game === selectedGame;
    return searchRegex.test(party.title) && gameFilter;
  });

  const handleCreateParty = () => {
    if (!isAuthenticated) {
      alert("파티를 만들려면 먼저 로그인해주세요!");
      navigate("/login");
      return;
    }
    navigate("/create-party");
  };

  const handleJoinParty = (party: Party) => {
    if (!isAuthenticated) {
      alert("파티에 참여하려면 먼저 로그인해주세요!");
      navigate("/login");
      return;
    }

    if (party.isPrivate) {
      setSelectedParty(party);
      setPasswordInput("");
    } else {
      navigate(`/chat/${party.id}`);
    }
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === "1234") {
      if (selectedParty) {
        navigate(`/chat/${selectedParty.id}`);
        setSelectedParty(null);
        setPasswordInput("");
      }
    } else {
      alert("비밀번호가 올바르지 않습니다.");
    }
  };

  const handleProfileClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">PartyUp</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-700">안녕하세요, {user?.displayName}님!</span>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/profile")}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <User className="h-4 w-4 mr-2" />
                    프로필
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={logout}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    로그아웃
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/login")}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    로그인
                  </Button>
                  <Button 
                    onClick={() => navigate("/signup")}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    회원가입
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Create Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="파티 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <Search className="h-4 w-4 mr-2" />
                검색
              </Button>
              <Button 
                onClick={handleCreateParty}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                파티 만들기
              </Button>
            </div>
          </div>
        </div>

        {/* Game Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {gameTypes.map((game) => (
              <Button
                key={game}
                variant={selectedGame === game ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGame(game)}
                className={selectedGame === game 
                  ? "bg-green-500 hover:bg-green-600 text-white" 
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }
              >
                {game}
              </Button>
            ))}
          </div>
        </div>

        {/* Party List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParties.map((party) => (
            <Card key={party.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-gray-900 text-lg">{party.title}</CardTitle>
                      {party.isPrivate && (
                        <Lock className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <CardDescription className="text-gray-600">
                      {party.game} • {party.members}/{party.maxMembers}명
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">{party.members}/{party.maxMembers}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6 cursor-pointer" onClick={() => handleProfileClick(party.host)}>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${party.host}`} />
                      <AvatarFallback className="bg-green-500 text-white text-xs">
                        {party.host[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span 
                      className="text-sm text-gray-900 cursor-pointer hover:text-green-600" 
                      onClick={() => handleProfileClick(party.host)}
                    >
                      {party.host}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600">{party.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {party.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => handleJoinParty(party)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    disabled={party.members >= party.maxMembers}
                  >
                    {party.members >= party.maxMembers ? "파티 가득참" : "참여하기"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Password Dialog */}
      <Dialog open={!!selectedParty} onOpenChange={() => setSelectedParty(null)}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900">비밀방 입장</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-700">비밀번호를 입력해주세요:</p>
            <Input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="비밀번호"
              className="bg-white border-gray-300 text-gray-900"
              onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            />
            <div className="flex space-x-2">
              <Button 
                onClick={handlePasswordSubmit}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              >
                입장하기
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedParty(null)}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                취소
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
