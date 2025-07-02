
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface DirectMessage {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
  isMe: boolean;
}

const DirectMessage = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 더미 대화 데이터
  const dummyMessages: DirectMessage[] = [
    {
      id: 1,
      sender: username || "사용자",
      message: "안녕하세요! 파티 같이 하실래요?",
      timestamp: "14:30",
      isMe: false
    },
    {
      id: 2,
      sender: "나",
      message: "네, 좋아요! 언제 하실 건가요?",
      timestamp: "14:31",
      isMe: true
    },
    {
      id: 3,
      sender: username || "사용자",
      message: "지금 당장도 괜찮아요~",
      timestamp: "14:32",
      isMe: false
    }
  ];

  useEffect(() => {
    setMessages(dummyMessages);
  }, [username]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: DirectMessage = {
        id: messages.length + 1,
        sender: "나",
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('ko-KR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isMe: true
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
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} />
                <AvatarFallback className="bg-green-500 text-white text-sm">
                  {username?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-bold text-gray-900">{username}님과의 채팅</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 h-[calc(100vh-80px)]">
        <Card className="h-full bg-white border-gray-200 shadow-sm flex flex-col">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-gray-900">1:1 채팅</CardTitle>
          </CardHeader>
          
          {/* 메시지 목록 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-xs ${msg.isMe ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {!msg.isMe && (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.sender}`} />
                      <AvatarFallback className="bg-gray-500 text-white text-xs">
                        {msg.sender[0]}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`rounded-lg px-3 py-2 ${
                    msg.isMe 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.isMe ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
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
                className="bg-green-500 hover:bg-green-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DirectMessage;
