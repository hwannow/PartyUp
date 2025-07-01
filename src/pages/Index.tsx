
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, Shield, Search, Filter, Plus, Crown } from "lucide-react";

const Index = () => {
  const [selectedGame, setSelectedGame] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const games = [
    { id: "lol", name: "리그 오브 레전드", icon: "🎮", color: "bg-blue-600" },
    { id: "valorant", name: "발로란트", icon: "🔫", color: "bg-red-600" },
    { id: "overwatch", name: "오버워치", icon: "⚡", color: "bg-orange-600" },
    { id: "apex", name: "에이펙스", icon: "🏆", color: "bg-purple-600" },
  ];

  const partyRooms = [
    {
      id: 1,
      title: "랭크 같이 가실분~",
      game: "lol",
      host: "김은지",
      hostRank: "골드",
      mannerScore: 4.8,
      members: 3,
      maxMembers: 5,
      tags: ["랭크", "골드+", "매너"],
      isNewbie: false,
      type: "public"
    },
    {
      id: 2,
      title: "초보자 환영! 함께 배워요",
      game: "valorant",
      host: "장은영",
      hostRank: "아이언",
      mannerScore: 4.9,
      members: 2,
      maxMembers: 5,
      tags: ["초보환영", "친목", "학습"],
      isNewbie: true,
      type: "public"
    },
    {
      id: 3,
      title: "[시청자 게임] 방송용 파티",
      game: "overwatch",
      host: "박지민",
      hostRank: "다이아",
      mannerScore: 4.7,
      members: 1,
      maxMembers: 6,
      tags: ["방송", "시청자게임", "재미"],
      isNewbie: false,
      type: "private"
    }
  ];

  const filteredRooms = partyRooms.filter(room => {
    const matchesGame = selectedGame === "all" || room.game === selectedGame;
    const matchesSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.host.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGame && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                PartyUp
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                로그인
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-white mb-6">
            게임 파티를 찾는 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">가장 쉬운 방법</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            혼자서도 괜찮아요! 매너 있는 게이머들과 함께 즐거운 게임을 시작해보세요
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8">
              <Plus className="mr-2 h-5 w-5" />
              파티 만들기
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8">
              파티 찾기
            </Button>
          </div>
        </div>
      </section>

      {/* Game Selection */}
      <section className="py-12 border-t border-slate-700">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">게임 선택</h3>
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              variant={selectedGame === "all" ? "default" : "outline"}
              onClick={() => setSelectedGame("all")}
              className={selectedGame === "all" ? "bg-gradient-to-r from-purple-500 to-pink-500" : "border-slate-600 text-slate-300 hover:bg-slate-800"}
            >
              전체
            </Button>
            {games.map((game) => (
              <Button
                key={game.id}
                variant={selectedGame === game.id ? "default" : "outline"}
                onClick={() => setSelectedGame(game.id)}
                className={selectedGame === game.id ? "bg-gradient-to-r from-purple-500 to-pink-500" : "border-slate-600 text-slate-300 hover:bg-slate-800"}
              >
                <span className="mr-2">{game.icon}</span>
                {game.name}
              </Button>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex justify-center space-x-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="파티방 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <Filter className="h-4 w-4 mr-2" />
              필터
            </Button>
          </div>

          {/* Party Rooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                        {room.title}
                      </CardTitle>
                      <CardDescription className="text-slate-400 mt-1">
                        {games.find(g => g.id === room.game)?.name}
                      </CardDescription>
                    </div>
                    {room.type === "private" && (
                      <Crown className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Host Info */}
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${room.host}`} />
                        <AvatarFallback className="bg-purple-600 text-white text-xs">
                          {room.host[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{room.host}</p>
                        <p className="text-xs text-slate-400">{room.hostRank}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-white">{room.mannerScore}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {room.isNewbie && (
                        <Badge className="bg-green-600 hover:bg-green-700 text-white">
                          초보환영
                        </Badge>
                      )}
                      {room.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Members */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-slate-300">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">
                          {room.members}/{room.maxMembers}
                        </span>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        참여하기
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-slate-700">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            왜 PartyUp을 선택해야 할까요?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">매너 점수 시스템</h4>
              <p className="text-slate-400">
                게임 후 평가를 통해 매너 있는 유저들과 함께 플레이하세요
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">맞춤형 매칭</h4>
              <p className="text-slate-400">
                실력, 게임 모드, 성향에 따라 완벽한 파티원을 찾아보세요
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">초보자 친화적</h4>
              <p className="text-slate-400">
                처음 시작하는 분들도 부담 없이 함께할 수 있는 환경을 제공합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">
            © 2024 PartyUp. 게이머들을 위한 파티 매칭 플랫폼
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
