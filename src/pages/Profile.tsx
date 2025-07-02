
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ArrowLeft, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    displayName: user?.displayName || "김은지",
    mannerScore: 4.8
  });
  const [editForm, setEditForm] = useState({
    displayName: userInfo.displayName
  });

  const handleSave = () => {
    setUserInfo(prev => ({
      ...prev,
      displayName: editForm.displayName
    }));
    setIsEditing(false);
    alert("프로필이 수정되었습니다!");
  };

  const handleCancel = () => {
    setEditForm({ displayName: userInfo.displayName });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
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
            <h1 className="text-2xl font-bold text-gray-900">
              내 프로필
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
                    <CardDescription className="text-gray-600 flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>매너 점수: {userInfo.mannerScore}</span>
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  {isEditing ? "취소" : "수정"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">표시할 이름</label>
                    <Input
                      value={editForm.displayName}
                      onChange={(e) => setEditForm({ displayName: e.target.value })}
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      저장
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handleCancel}
                      className="border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      취소
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
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
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
