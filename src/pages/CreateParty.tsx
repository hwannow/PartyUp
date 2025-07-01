
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
    { id: "steam", name: "스팀" },
    { id: "other", name: "기타" },
  ];

  const options = [
    { id: "rank", name: "랭크", color: "bg-blue-500" },
    { id: "newbie", name: "초보환영", color: "bg-green-500" },
    { id: "manner", name: "매너", color: "bg-purple-500" },
    { id: "fun", name: "재미", color: "bg-orange-500" },
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-gray-600 hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              돌아가기
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
              파티 만들기
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">새 파티 생성</CardTitle>
              <CardDescription className="text-gray-600">
                파티 정보를 입력하고 함께할 게이머들을 모집해보세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 파티 제목 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">파티 제목</label>
                <Input
                  value={partyTitle}
                  onChange={(e) => setPartyTitle(e.target.value)}
                  placeholder="파티 제목을 입력하세요"
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* 게임 선택 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">게임 종류</label>
                <Select value={selectedGame} onValueChange={setSelectedGame}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="게임을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    {games.map((game) => (
                      <SelectItem key={game.id} value={game.id} className="text-gray-900 hover:bg-gray-100">
                        {game.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 파티 인원 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">최대 인원</label>
                <Select value={maxMembers} onValueChange={setMaxMembers}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    {[2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()} className="text-gray-900 hover:bg-gray-100">
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
                <label className="text-sm font-medium text-gray-900">파티 옵션</label>
                <div className="flex flex-wrap gap-2">
                  {options.map((option) => (
                    <Badge
                      key={option.id}
                      className={`cursor-pointer transition-all ${
                        selectedOptions.includes(option.id)
                          ? `${option.color} hover:opacity-80 text-white`
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
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
                <label className="text-sm font-medium text-gray-900">파티 설명 (선택사항)</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="파티에 대한 추가 설명을 입력하세요"
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 min-h-[100px]"
                />
              </div>

              {/* 생성 버튼 */}
              <Button 
                onClick={handleCreateParty}
                className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-lg py-6"
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
