
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    userId: "",
    password: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = () => {
    if (!formData.userId || !formData.password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    // 더미 로그인 처리
    login(formData.userId, formData.userId);
    alert("로그인되었습니다!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md p-4">
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/")}
                className="text-gray-600 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
            </div>
            <CardTitle className="text-gray-900 text-2xl">로그인</CardTitle>
            <CardDescription className="text-gray-600">
              PartyUp에 오신 것을 환영합니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">아이디</label>
              <Input
                value={formData.userId}
                onChange={(e) => handleInputChange("userId", e.target.value)}
                placeholder="아이디를 입력하세요"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">비밀번호</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <Button 
              onClick={handleLogin}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              로그인
            </Button>

            <div className="text-center text-sm text-gray-600">
              계정이 없으신가요?{" "}
              <button 
                onClick={() => navigate("/signup")}
                className="text-green-600 hover:text-green-500 underline"
              >
                회원가입
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
