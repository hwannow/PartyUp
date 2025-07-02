import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Party {
  id: string;
  title: string;
  game: string;
  genre: string;
  host: string;
  members: number;
  maxMembers: number;
  tags: string[];
  rating: number;
  isPrivate: boolean;
  description?: string;
  gameStartTime?: string;
}

interface PartyContextType {
  parties: Party[];
  addParty: (party: Omit<Party, 'id' | 'members' | 'rating'>) => void;
  kickMember: (partyId: string, username: string) => void;
}

const PartyContext = createContext<PartyContextType | undefined>(undefined);

export const useParty = () => {
  const context = useContext(PartyContext);
  if (context === undefined) {
    throw new Error('useParty must be used within a PartyProvider');
  }
  return context;
};

const initialParties: Party[] = [
  {
    id: "1",
    title: "롤 5인 랭크",
    game: "리그 오브 레전드",
    genre: "AOS",
    host: "김은지",
    members: 3,
    maxMembers: 5,
    tags: ["랭크", "5인", "듀오"],
    rating: 4.5,
    isPrivate: false
  },
  {
    id: "2",
    title: "발로란트 내전",
    game: "발로란트",
    genre: "FPS",
    host: "장은영",
    members: 4,
    maxMembers: 5,
    tags: ["내전", "5인"],
    rating: 4.8,
    isPrivate: true
  },
  {
    id: "3",
    title: "배그 스쿼드",
    game: "배틀그라운드",
    genre: "FPS",
    host: "박지민",
    members: 2,
    maxMembers: 4,
    tags: ["스쿼드", "배린이"],
    rating: 4.2,
    isPrivate: false
  },
  {
    id: "4",
    title: "오버워치 경쟁전",
    game: "오버워치 2",
    genre: "FPS",
    host: "박소영",
    members: 2,
    maxMembers: 5,
    tags: ["경쟁전", "힐러"],
    rating: 4.9,
    isPrivate: false
  },
  {
    id: "5",
    title: "로스트아크 레이드",
    game: "로스트아크",
    genre: "RPG",
    host: "이민수",
    members: 6,
    maxMembers: 8,
    tags: ["레이드", "고수"],
    rating: 4.7,
    isPrivate: true
  },
  {
    id: "6",
    title: "디아블로 4 쩔",
    game: "디아블로 4",
    genre: "RPG",
    host: "박서연",
    members: 3,
    maxMembers: 4,
    tags: ["쩔", "고행"],
    rating: 4.0,
    isPrivate: false
  },
  {
    id: "7",
    title: "마인크래프트 서버",
    game: "마인크래프트",
    genre: "샌드박스",
    host: "이준호",
    members: 5,
    maxMembers: 10,
    tags: ["건축", "생존"],
    rating: 4.4,
    isPrivate: false
  },
  {
    id: "8",
    title: "스타크래프트 2 래더",
    game: "스타크래프트 2",
    genre: "RTS",
    host: "최민수",
    members: 2,
    maxMembers: 2,
    tags: ["래더", "1:1"],
    rating: 4.6,
    isPrivate: false
  },
  {
    id: "9",
    title: "FIFA 온라인 4",
    game: "FIFA 온라인 4",
    genre: "스포츠",
    host: "김태현",
    members: 8,
    maxMembers: 11,
    tags: ["축구", "온라인"],
    rating: 4.1,
    isPrivate: false
  },
  {
    id: "10",
    title: "카트라이더 러쉬플러스",
    game: "카트라이더 러쉬플러스",
    genre: "레이싱",
    host: "박수진",
    members: 3,
    maxMembers: 8,
    tags: ["레이싱", "아이템"],
    rating: 4.3,
    isPrivate: false
  },
  {
    id: "11",
    title: "리그 오브 레전드 칼바람",
    game: "리그 오브 레전드",
    genre: "AOS",
    host: "정현우",
    members: 4,
    maxMembers: 5,
    tags: ["칼바람", "캐주얼"],
    rating: 4.2,
    isPrivate: false
  },
  {
    id: "12",
    title: "어몽어스 추리",
    game: "어몽어스",
    genre: "파티",
    host: "한지영",
    members: 6,
    maxMembers: 10,
    tags: ["추리", "음성"],
    rating: 4.5,
    isPrivate: false
  },
  {
    id: "13",
    title: "포트나이트 스쿼드",
    game: "포트나이트",
    genre: "FPS",
    host: "강민호",
    members: 2,
    maxMembers: 4,
    tags: ["배틀로얄", "건축"],
    rating: 4.0,
    isPrivate: false
  }
];

interface PartyProviderProps {
  children: ReactNode;
}

export const PartyProvider: React.FC<PartyProviderProps> = ({ children }) => {
  const [parties, setParties] = useState<Party[]>(initialParties);

  const addParty = (newParty: Omit<Party, 'id' | 'members' | 'rating'>) => {
    const party: Party = {
      ...newParty,
      id: Date.now().toString(),
      members: 3, // 호스트 포함 3명으로 하드코딩 (호스트 기능 확인을 위해)
      rating: 4.0
    };
    setParties(prev => [party, ...prev]);
  };

  const kickMember = (partyId: string, username: string) => {
    console.log(`Kicking ${username} from party ${partyId}`);
    // In a real app, this would make an API call
    alert(`${username}님이 강제 퇴장되었습니다.`);
  };

  const value = {
    parties,
    addParty,
    kickMember
  };

  return <PartyContext.Provider value={value}>{children}</PartyContext.Provider>;
};
