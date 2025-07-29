import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserPoints, updateUserPoints } from "./mockDbClient";

interface Player {
  userId: string;
  isLoggedIn: boolean;
  points: number;
}

interface PlayerContextValue {
  player: Player | null;
  playerPoints: number;
  loading: boolean;
  error: Error | null;
  login: (userId: string) => void;
  logout: () => void;
  betPoints: (amount: number) => Promise<void>;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [playerPoints, setPlayerPoints] = useState<number>(player?.points || 0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const betPoints = async (amount: number) => {
    if (!player) {
      setError(new Error("Not logged in"));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (amount > playerPoints) throw new Error("Not enough points to bet");
      const newPoints = playerPoints - amount;
      await updateUserPoints(player.userId, newPoints);
      setPlayerPoints(newPoints);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // const login = (userId: string) => {
  //   const points = 100;
  //   setPlayer({ userId, isLoggedIn: true, points });
  //   setPlayerPoints(points);
  // };

  //delayed to test loading state
  const login = (userId: string) => {
    setLoading(true);
    setTimeout(() => {
      const points = 100;
      setPlayer({ userId, isLoggedIn: true, points });
      setPlayerPoints(points);
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
        betPoints,
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
