/**
 * Simulation de base de données MongoDB avec Mongoose
 * En production, utilisez une vraie connexion MongoDB
 */

interface User {
  _id: string
  email: string
  firstName: string
  lastName: string
  passwordHash: string
  role: "admin" | "moderator" | "user"
  createdAt: string
  lastLogin?: string
  isActive: boolean
  emailVerified: boolean
  emailVerificationToken?: string
  twoFactorEnabled: boolean
  twoFactorSecret?: string
}

interface LoginLog {
  _id: string
  userId: string
  userEmail: string
  ip: string
  userAgent: string
  timestamp: string
  success: boolean
  reason?: string
}

interface RefreshToken {
  _id: string
  userId: string
  token: string
  ip: string
  userAgent: string
  createdAt: string
  expiresAt: string
  revoked: boolean
}

interface PasswordResetToken {
  _id: string
  userId: string
  token: string
  createdAt: string
  expiresAt: string
  used: boolean
}

// Simulation des collections MongoDB
const users: User[] = [
  {
    _id: "admin_1",
    email: "admin@secure.com",
    firstName: "Admin",
    lastName: "System",
    passwordHash: "bcrypt_salt_admin123_1640995200000",
    role: "admin",
    createdAt: "2024-01-01T00:00:00.000Z",
    lastLogin: "2024-01-15T10:30:00.000Z",
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: false,
  },
  {
    _id: "moderator_1",
    email: "moderator@secure.com",
    firstName: "Moderator",
    lastName: "User",
    passwordHash: "bcrypt_salt_mod123_1640995200000",
    role: "moderator",
    createdAt: "2024-01-02T00:00:00.000Z",
    lastLogin: "2024-01-15T09:15:00.000Z",
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: false,
  },
  {
    _id: "user_1",
    email: "user@secure.com",
    firstName: "John",
    lastName: "Doe",
    passwordHash: "bcrypt_salt_user123_1640995200000",
    role: "user",
    createdAt: "2024-01-03T00:00:00.000Z",
    lastLogin: "2024-01-15T08:45:00.000Z",
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: false,
  },
]

const loginLogs: LoginLog[] = [
  {
    _id: "log_1",
    userId: "admin_1",
    userEmail: "admin@secure.com",
    ip: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: "2024-01-15T10:30:00.000Z",
    success: true,
    reason: "Successful login",
  },
  {
    _id: "log_2",
    userId: "user_1",
    userEmail: "user@secure.com",
    ip: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    timestamp: "2024-01-15T08:45:00.000Z",
    success: true,
    reason: "Successful login",
  },
  {
    _id: "log_3",
    userId: "unknown",
    userEmail: "hacker@evil.com",
    ip: "10.0.0.1",
    userAgent: "curl/7.68.0",
    timestamp: "2024-01-15T08:00:00.000Z",
    success: false,
    reason: "User not found",
  },
]

const refreshTokens: RefreshToken[] = []
const passwordResetTokens: PasswordResetToken[] = []

// Fonctions de base de données

export async function findUserByEmail(email: string): Promise<User | null> {
  return users.find((user) => user.email === email) || null
}

export async function findUserById(id: string): Promise<User | null> {
  return users.find((user) => user._id === id) || null
}

export async function createUser(userData: Omit<User, "_id" | "createdAt">): Promise<User> {
  const newUser: User = {
    _id: `user_${Date.now()}`,
    ...userData,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  console.log(`[DB] Utilisateur créé: ${newUser.email}`)
  return newUser
}

export async function updateUserLastLogin(userId: string): Promise<void> {
  const user = users.find((u) => u._id === userId)
  if (user) {
    user.lastLogin = new Date().toISOString()
  }
}

export async function updateUserPassword(userId: string, passwordHash: string): Promise<void> {
  const user = users.find((u) => u._id === userId)
  if (user) {
    user.passwordHash = passwordHash
    console.log(`[DB] Mot de passe mis à jour pour l'utilisateur: ${userId}`)
  }
}

export async function updateUserProfile(
  userId: string,
  profileData: { firstName: string; lastName: string },
): Promise<User | null> {
  const user = users.find((u) => u._id === userId)
  if (user) {
    user.firstName = profileData.firstName
    user.lastName = profileData.lastName
    console.log(`[DB] Profil mis à jour pour l'utilisateur: ${userId}`)
    return user
  }
  return null
}

export async function createLoginLog(logData: Omit<LoginLog, "_id" | "timestamp">): Promise<LoginLog> {
  const newLog: LoginLog = {
    _id: `log_${Date.now()}`,
    ...logData,
    timestamp: new Date().toISOString(),
  }

  loginLogs.unshift(newLog) // Ajoute au début pour avoir les plus récents en premier
  console.log(`[DB] Log de connexion créé: ${newLog.userEmail} (${newLog.success ? "Succès" : "Échec"})`)
  return newLog
}

export async function getLoginLogsByUser(userId: string): Promise<LoginLog[]> {
  return loginLogs
    .filter((log) => log.userId === userId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export async function createPasswordResetToken(
  tokenData: Omit<PasswordResetToken, "_id" | "createdAt">,
): Promise<PasswordResetToken> {
  const newToken: PasswordResetToken = {
    _id: `reset_${Date.now()}`,
    ...tokenData,
    createdAt: new Date().toISOString(),
  }

  passwordResetTokens.push(newToken)
  console.log(`[DB] Token de réinitialisation créé pour l'utilisateur: ${newToken.userId}`)
  return newToken
}

export async function findPasswordResetToken(token: string): Promise<PasswordResetToken | null> {
  return passwordResetTokens.find((t) => t.token === token) || null
}

export async function markPasswordResetTokenAsUsed(tokenId: string): Promise<void> {
  const token = passwordResetTokens.find((t) => t._id === tokenId)
  if (token) {
    token.used = true
    console.log(`[DB] Token de réinitialisation marqué comme utilisé: ${tokenId}`)
  }
}

export async function findRefreshToken(token: string): Promise<RefreshToken | null> {
  return refreshTokens.find((t) => t.token === token) || null
}

export async function revokeRefreshToken(token: string): Promise<void> {
  const refreshToken = refreshTokens.find((t) => t.token === token)
  if (refreshToken) {
    refreshToken.revoked = true
    console.log(`[DB] Refresh token révoqué: ${token.substring(0, 20)}...`)
  }
}

// Fonctions admin
export async function getAllUsers(): Promise<User[]> {
  return users.map((user) => ({
    ...user,
    passwordHash: "[HIDDEN]",
  })) as User[]
}

export async function getAllLoginLogs(): Promise<LoginLog[]> {
  return [...loginLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export async function deleteUser(userId: string): Promise<User | null> {
  const userIndex = users.findIndex((user) => user._id === userId)
  if (userIndex === -1) return null

  const deletedUser = users[userIndex]
  users.splice(userIndex, 1)

  console.log(`[DB] Utilisateur supprimé: ${deletedUser.email}`)
  return deletedUser
}
