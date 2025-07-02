
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ArrowLeft, MessageCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  // 더미 사용자 정보
  const getUserInfo = (username: string) => {
    const users = {
      "김은지": { displayName: "김은지", mannerScore: 4.8 },
      "장은영": { displayName: "장은영", mannerScore: 4.9 },
      "박지민": { displayName: "박지민", mannerScore: 4.7 },
      "박소영": { displayName: "박소영", mannerScore: 4.6 },
      "이민수": { displayName: "이민수", mannerScore: 4.5 },
      "박서연": { displayName: "박서연", mannerScore: 4.3 }
    };
    return users[username as keyof typeof users] || { displayName: username, mannerScore: 4.0 };
  };

  const userInfo = getUserInfo(username || "");

  const handleDirectMessage = () => {
    navigate(`/dm/${username}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              돌아가기
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              사용자 프로필
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userInfo.displayName}`} />
                    <AvatarFallback className="bg-green-500 text-white text-xl">
                      {userInfo.displayName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-gray-900 text-xl">{userInfo.displayName}</CardTitle>
                    <CardDescription className="text-gray-600 flex items-center space-x-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>매너 점수: {userInfo.mannerScore}</span>
                    </CardDescription>
                  </div>
                </div>
                <Button
                  onClick={handleDirectMessage}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  1:1 채팅
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-gray-900 font-medium mb-2">기본 정보</h3>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">이름:</span> {userInfo.displayName}</p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2">매너 점수:</span>
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    {userInfo.mannerScore}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-gray-900 font-medium mb-2">게임 정보</h3>
                <p className="text-gray-600 text-sm">
                  게임별 랭크 정보는 파티방에서 확인할 수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
