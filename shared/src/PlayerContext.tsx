import React, { createContext, useContext, useState } from "react";
import api from "@utils/api";

interface Player {
  userId: string;
  isLoggedIn: boolean;
}

interface PlayerContextValue {
  player: Player | null;
  playerPoints: number | null;
  loading: boolean;
  error: Error | null;
  login: (userId: number) => void;
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

  const login = (userId: number) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await api.post("/login", { userId: userId });
        console.log(res.data);
        if (res && res.data) {
          setPlayer({
            userId: res.data.playerId,
            isLoggedIn: true,
          });
          setPlayerPoints(res.data.points);
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
      setLoading(false);
    }, 1000);
  };

  const logout = () => {
    setPlayer(null);
    setPlayerPoints(0);
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
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
