
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    displayName: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignup = () => {
    if (!formData.userId || !formData.password || !formData.displayName) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 더미 회원가입 처리 - 바로 로그인 상태로 만들기
    login(formData.userId, formData.displayName);
    alert("회원가입이 완료되었습니다!");
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
            <CardTitle className="text-gray-900 text-2xl">회원가입</CardTitle>
            <CardDescription className="text-gray-600">
              새로운 계정을 만들어보세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">아이디</label>
              <Input
                value={formData.userId}
                onChange={(e) => handleInputChange("userId", e.target.value)}
                placeholder="사용할 아이디를 입력하세요"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">표시할 이름</label>
              <Input
                value={formData.displayName}
                onChange={(e) => handleInputChange("displayName", e.target.value)}
                placeholder="다른 사용자에게 보여질 이름"
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">비밀번호 확인</label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <Button 
              onClick={handleSignup}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              회원가입
            </Button>

            <div className="text-center text-sm text-gray-600">
              이미 계정이 있으신가요?{" "}
              <button 
                onClick={() => navigate("/login")}
                className="text-green-600 hover:text-green-500 underline"
              >
                로그인
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
