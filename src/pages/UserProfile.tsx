import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, MessageCircle, UserX } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useParty } from "@/contexts/PartyContext";

const UserProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { kickMember } = useParty();

  // URL에서 partyId와 hostName을 가져옵니다
  const searchParams = new URLSearchParams(location.search);
  const partyId = searchParams.get('partyId');
  const hostName = searchParams.get('host');

  // 현재 사용자가 호스트인지 확인
  const isHost = isAuthenticated && user?.displayName === hostName;

  const userData = {
    username: username,
    rating: 4.5,
    reviewCount: 123,
    preferredGames: ["리그 오브 레전드", "발로란트", "배틀그라운드"],
    playStyle: ["공격적", "팀워크", "전략적"]
  };

  const stats = {
    totalGames: 542,
    winRate: 67,
    avgPlayTime: 2.5,
    partiesJoined: 32,
    partiesHosted: 8,
    completionRate: 89
  };

  const recentActivities = [
    {
      title: "롤 5인 랭크",
      game: "리그 오브 레전드",
      date: "2023년 12월 10일",
      type: "host"
    },
    {
      title: "발로란트 내전",
      game: "발로란트",
      date: "2023년 12월 9일",
      type: "join"
    },
    {
      title: "배그 스쿼드",
      game: "배틀그라운드",
      date: "2023년 12월 8일",
      type: "join"
    }
  ];

  const handleDirectMessage = () => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    navigate(`/dm/${username}`);
  };

  const handleKickMember = () => {
    if (!partyId || !username) return;
    
    const confirmKick = window.confirm(`${username}님을 강제 퇴장시키시겠습니까?`);
    if (confirmKick) {
      kickMember(partyId, username);
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
              사용자 프로필
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 프로필 정보 */}
            <div className="lg:col-span-1">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader className="text-center">
                  <Avatar className="h-32 w-32 mx-auto mb-4">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} />
                    <AvatarFallback className="bg-green-500 text-white text-2xl">
                      {username?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-gray-900 text-2xl">{username}</CardTitle>
                  <CardDescription className="text-gray-600">게이머</CardDescription>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{userData.rating}</span>
                    <span className="text-sm text-gray-600">({userData.reviewCount}개 리뷰)</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">선호 게임</h3>
                    <div className="flex flex-wrap gap-1">
                      {userData.preferredGames.map((game, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          {game}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">플레이 스타일</h3>
                    <div className="flex flex-wrap gap-1">
                      {userData.playStyle.map((style, index) => (
                        <Badge key={index} variant="outline" className="border-gray-300 text-gray-700 text-xs">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={handleDirectMessage}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    1:1 채팅하기
                  </Button>

                  {/* 강제 퇴장 버튼 - 호스트만 볼 수 있음 */}
                  {isHost && partyId && username !== user?.displayName && (
                    <Button 
                      onClick={handleKickMember}
                      variant="destructive"
                      className="w-full bg-red-500 hover:bg-red-600 text-white"
                    >
                      <UserX className="h-4 w-4 mr-2" />
                      강제 퇴장
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 통계 정보 */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* 게임 통계 */}
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">게임 통계</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">총 게임 수</span>
                      <span className="font-medium text-gray-900">{stats.totalGames}게임</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">승률</span>
                      <span className="font-medium text-gray-900">{stats.winRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">평균 플레이 시간</span>
                      <span className="font-medium text-gray-900">{stats.avgPlayTime}시간</span>
                    </div>
                  </CardContent>
                </Card>

                {/* 파티 참여 통계 */}
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">파티 활동</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">참여한 파티</span>
                      <span className="font-medium text-gray-900">{stats.partiesJoined}개</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">호스트한 파티</span>
                      <span className="font-medium text-gray-900">{stats.partiesHosted}개</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">완료율</span>
                      <span className="font-medium text-gray-900">{stats.completionRate}%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 최근 활동 */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">최근 활동</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 py-2">
                        <div className={`w-2 h-2 rounded-full ${activity.type === 'host' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-600">{activity.game} • {activity.date}</p>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={activity.type === 'host' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                        >
                          {activity.type === 'host' ? '호스트' : '참여'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
