// Simple in-memory mock store for user points
const userPointsStore: Record<string, number> = {};

// Initialize some users with default points
userPointsStore["user1"] = 100;
userPointsStore["user2"] = 50;

export async function getUserPoints(userId: string): Promise<number> {
  // Simulate async DB call delay
  await new Promise((res) => setTimeout(res, 100));
  return userPointsStore[userId] ?? 0;
}

export async function updateUserPoints(
  userId: string,
  points: number
): Promise<void> {
  await new Promise((res) => setTimeout(res, 100));
  userPointsStore[userId] = points;
}
