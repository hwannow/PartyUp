
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface ChatMessage {
  id: number;
  username: string;
  message: string;
  timestamp: string;
  isHost?: boolean;
}

const Chat = () => {
  const navigate = useNavigate();
  const { partyId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 더미 파티 정보
  const partyInfo = {
    id: partyId,
    title: "랭크 같이 가실분~",
    game: "리그 오브 레전드",
    host: "김은지",
    members: 3,
    maxMembers: 5,
    tags: ["랭크", "매너"]
  };

  // 더미 채팅 데이터
  const dummyMessages: ChatMessage[] = [
    {
      id: 1,
      username: "김은지",
      message: "안녕하세요! 파티에 오신 것을 환영합니다~",
      timestamp: "14:30",
      isHost: true
    },
    {
      id: 2,
      username: "이민수",
      message: "안녕하세요! 잘 부탁드립니다",
      timestamp: "14:31"
    },
    {
      id: 3,
      username: "박서연",
      message: "반갑습니다! 언제 시작하나요?",
      timestamp: "14:32"
    },
    {
      id: 4,
      username: "김은지",
      message: "5분 후에 시작할게요! 준비 되신 분들은 댓글 남겨주세요",
      timestamp: "14:33",
      isHost: true
    }
  ];

  useEffect(() => {
    setMessages(dummyMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: messages.length + 1,
        username: "나",
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('ko-KR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
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
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="text-gray-600 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                나가기
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{partyInfo.title}</h1>
                <p className="text-sm text-gray-600">{partyInfo.game}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">
                {partyInfo.members}/{partyInfo.maxMembers}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 h-[calc(100vh-80px)] flex gap-4">
        {/* 파티 정보 사이드바 */}
        <div className="w-80 flex-shrink-0">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">파티 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">호스트</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Avatar className="h-6 w-6 cursor-pointer" onClick={() => handleProfileClick(partyInfo.host)}>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${partyInfo.host}`} />
                    <AvatarFallback className="bg-green-500 text-white text-xs">
                      {partyInfo.host[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span 
                    className="text-sm font-medium text-gray-900 cursor-pointer hover:text-green-600" 
                    onClick={() => handleProfileClick(partyInfo.host)}
                  >
                    {partyInfo.host}
                  </span>
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">호스트</Badge>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">태그</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {partyInfo.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">참여자</p>
                <div className="space-y-2 mt-1">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6 cursor-pointer" onClick={() => handleProfileClick("이민수")}>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=이민수`} />
                      <AvatarFallback className="bg-blue-500 text-white text-xs">이</AvatarFallback>
                    </Avatar>
                    <span 
                      className="text-sm text-gray-900 cursor-pointer hover:text-green-600" 
                      onClick={() => handleProfileClick("이민수")}
                    >
                      이민수
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6 cursor-pointer" onClick={() => handleProfileClick("박서연")}>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=박서연`} />
                      <AvatarFallback className="bg-purple-500 text-white text-xs">박</AvatarFallback>
                    </Avatar>
                    <span 
                      className="text-sm text-gray-900 cursor-pointer hover:text-green-600" 
                      onClick={() => handleProfileClick("박서연")}
                    >
                      박서연
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 채팅 영역 */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 bg-white border-gray-200 shadow-sm flex flex-col">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-gray-900">채팅</CardTitle>
            </CardHeader>
            
            {/* 메시지 목록 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8 cursor-pointer" onClick={() => handleProfileClick(msg.username)}>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.username}`} />
                    <AvatarFallback className="bg-gray-500 text-white text-xs">
                      {msg.username[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span 
                        className="text-sm font-medium text-gray-900 cursor-pointer hover:text-green-600" 
                        onClick={() => handleProfileClick(msg.username)}
                      >
                        {msg.username}
                      </span>
                      {msg.isHost && (
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">호스트</Badge>
                      )}
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700">{msg.message}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* 메시지 입력 */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
