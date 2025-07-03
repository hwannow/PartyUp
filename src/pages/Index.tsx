
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, Users, Search, Plus, Lock, LogIn, UserPlus, User, LogOut, Clock, Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useParty } from "@/contexts/PartyContext";

const genres = ["전체", "AOS", "FPS", "RPG", "RTS", "스포츠", "레이싱", "샌드박스", "파티", "기타"];

const gamesByGenre = {
  "AOS": ["리그 오브 레전드"],
  "FPS": ["발로란트", "배틀그라운드", "오버워치 2", "포트나이트"],
  "RPG": ["로스트아크", "디아블로 4"],
  "RTS": ["스타크래프트 2"],
  "스포츠": ["FIFA 온라인 4"],
  "레이싱": ["카트라이더 러쉬플러스"],
  "샌드박스": ["마인크래프트"],
  "파티": ["어몽어스"],
  "기타": []
};

const Index = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { parties } = useParty();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("전체");
  const [selectedGame, setSelectedGame] = useState("전체");
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [selectedParty, setSelectedParty] = useState<any>(null);

  const availableGames = selectedGenre === "전체" 
    ? ["전체", ...Object.values(gamesByGenre).flat(), "기타"]
    : ["전체", ...(gamesByGenre[selectedGenre as keyof typeof gamesByGenre] || []), "기타"];

  const filteredParties = parties.filter((party) => {
    const searchRegex = new RegExp(searchTerm, "i");
    const genreFilter = selectedGenre === "전체" || party.genre === selectedGenre;
    const gameFilter = selectedGame === "전체" || party.game === selectedGame;
    const broadcastFilter = !showBroadcast || party.tags.includes("방송");
    return searchRegex.test(party.title) && genreFilter && gameFilter && broadcastFilter;
  });

  const handleCreateParty = () => {
    if (!isAuthenticated) {
      alert("파티를 만들려면 먼저 로그인해주세요!");
      navigate("/login");
      return;
    }
    navigate("/create-party");
  };

  const handleJoinParty = (party: any, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
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
    if (selectedParty && passwordInput === selectedParty.password) {
      navigate(`/chat/${selectedParty.id}`);
      setSelectedParty(null);
      setPasswordInput("");
    } else {
      alert("비밀번호가 올바르지 않습니다.");
    }
  };

  const handleProfileClick = (username: string, event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/profile/${username}`);
  };

  const handleCardClick = (party: any) => {
    handleJoinParty(party);
  };

  const formatGameStartTime = (timeString: string) => {
    if (!timeString) return null;
    const date = new Date(timeString);
    return date.toLocaleString('ko-KR', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
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
            
            <Button 
              onClick={handleCreateParty}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              파티 만들기
            </Button>
          </div>
        </div>

        {/* Broadcast Filter */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={showBroadcast ? "default" : "outline"}
              size="sm"
              onClick={() => setShowBroadcast(!showBroadcast)}
              className={showBroadcast 
                ? "bg-red-500 hover:bg-red-600 text-white" 
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }
            >
              <Radio className="h-4 w-4 mr-1" />
              방송용만 보기
            </Button>
          </div>
        </div>

        {/* Genre Filter */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">장르</h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedGenre(genre);
                  setSelectedGame("전체");
                }}
                className={selectedGenre === genre 
                  ? "bg-green-500 hover:bg-green-600 text-white" 
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        {/* Game Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">게임</h3>
          <div className="flex flex-wrap gap-2">
            {availableGames.map((game) => (
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
            <Card 
              key={party.id} 
              className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleCardClick(party)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-gray-900 text-lg">{party.title}</CardTitle>
                      {party.isPrivate && (
                        <Lock className="h-4 w-4 text-gray-600" />
                      )}
                      {party.tags.includes("방송") && (
                        <Radio className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <CardDescription className="text-gray-600">
                      {party.game} • {party.members}/{party.maxMembers}명
                    </CardDescription>
                    {party.gameStartTime && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">
                          {formatGameStartTime(party.gameStartTime)}
                        </span>
                      </div>
                    )}
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
                    <Avatar className="h-6 w-6 cursor-pointer" onClick={(e) => handleProfileClick(party.host, e)}>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${party.host}`} />
                      <AvatarFallback className="bg-green-500 text-white text-xs">
                        {party.host[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span 
                      className="text-sm text-gray-900 cursor-pointer hover:text-green-600" 
                      onClick={(e) => handleProfileClick(party.host, e)}
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
                    onClick={(e) => handleJoinParty(party, e)}
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
