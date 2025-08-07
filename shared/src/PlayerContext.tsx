import React, { createContext, useContext, useState } from "react";
import api from "@utils/api";

interface Player {
  userId: number;
  username: string;
  name1: string;
  name2: string;
  isLoggedIn: boolean;
}

interface PlayerContextValue {
  player: Player | null;
  playerPoints: number | null;
  setPlayerPoints: (newPoints: number) => void;
  loading: boolean;
  error: Error | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [playerPoints, setPlayerPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/login", { username, password });
      if (res && res.data) {
        setPlayer({
          userId: res.data.bbsNo,
          username: res.data.memberId,
          name1: res.data.memberName,
          name2: res.data.memberName2,
          isLoggedIn: true,
        });
        setPlayerPoints(res.data.point);
      } else {
        setError(new Error("Invalid login response"));
      }
    } catch (err: any) {
      setError(err);
      setPlayer(null);
      setPlayerPoints(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setPlayer(null);
    setPlayerPoints(null);
    setError(null);
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        setPlayerPoints,
        playerPoints,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
