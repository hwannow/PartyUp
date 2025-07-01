
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateParty = () => {
  const navigate = useNavigate();
  const [partyTitle, setPartyTitle] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [maxMembers, setMaxMembers] = useState("5");
  const [description, setDescription] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const games = [
    { id: "lol", name: "리그 오브 레전드" },
    { id: "valorant", name: "발로란트" },
    { id: "overwatch", name: "오버워치" },
    { id: "apex", name: "에이펙스" },
  ];

  const options = [
    { id: "rank", name: "랭크", color: "bg-blue-600" },
    { id: "newbie", name: "초보환영", color: "bg-green-600" },
    { id: "manner", name: "매너", color: "bg-purple-600" },
    { id: "fun", name: "재미", color: "bg-orange-600" },
  ];

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleCreateParty = () => {
    if (!partyTitle || !selectedGame) {
      alert("파티 제목과 게임을 선택해주세요.");
      return;
    }

    // TODO: 실제 파티 생성 로직 구현
    console.log({
      title: partyTitle,
      game: selectedGame,
      maxMembers: parseInt(maxMembers),
      description,
      options: selectedOptions
    });

    alert("파티가 생성되었습니다!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-slate-300 hover:bg-slate-800"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              돌아가기
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              파티 만들기
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">새 파티 생성</CardTitle>
              <CardDescription className="text-slate-400">
                파티 정보를 입력하고 함께할 게이머들을 모집해보세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 파티 제목 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">파티 제목</label>
                <Input
                  value={partyTitle}
                  onChange={(e) => setPartyTitle(e.target.value)}
                  placeholder="파티 제목을 입력하세요"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              {/* 게임 선택 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">게임 종류</label>
                <Select value={selectedGame} onValueChange={setSelectedGame}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="게임을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {games.map((game) => (
                      <SelectItem key={game.id} value={game.id} className="text-white hover:bg-slate-600">
                        {game.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 파티 인원 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">최대 인원</label>
                <Select value={maxMembers} onValueChange={setMaxMembers}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {[2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()} className="text-white hover:bg-slate-600">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {num}명
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 옵션 선택 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">파티 옵션</label>
                <div className="flex flex-wrap gap-2">
                  {options.map((option) => (
                    <Badge
                      key={option.id}
                      className={`cursor-pointer transition-all ${
                        selectedOptions.includes(option.id)
                          ? `${option.color} hover:opacity-80`
                          : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                      }`}
                      onClick={() => toggleOption(option.id)}
                    >
                      {option.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 설명 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">파티 설명 (선택사항)</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="파티에 대한 추가 설명을 입력하세요"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px]"
                />
              </div>

              {/* 생성 버튼 */}
              <Button 
                onClick={handleCreateParty}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-6"
              >
                파티 생성하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateParty;
