/**
 * Rate limiter pour prévenir les attaques par force brute
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private attempts: Map<string, RateLimitEntry> = new Map()
  private limits = {
    login: { maxAttempts: 5, windowMs: 15 * 60 * 1000 }, // 5 tentatives par 15 minutes
    "forgot-password": { maxAttempts: 3, windowMs: 60 * 60 * 1000 }, // 3 tentatives par heure
    register: { maxAttempts: 3, windowMs: 60 * 60 * 1000 }, // 3 inscriptions par heure
  }

  async check(identifier: string, action: keyof typeof this.limits): Promise<{ success: boolean; resetTime?: number }> {
    const key = `${action}:${identifier}`
    const limit = this.limits[action]
    const now = Date.now()

    let entry = this.attempts.get(key)

    // Si pas d'entrée ou si la fenêtre est expirée, créer une nouvelle entrée
    if (!entry || now > entry.resetTime) {
      entry = {
        count: 1,
        resetTime: now + limit.windowMs,
      }
      this.attempts.set(key, entry)
      return { success: true }
    }

    // Incrémenter le compteur
    entry.count++

    // Vérifier si la limite est dépassée
    if (entry.count > limit.maxAttempts) {
      const resetTime = Math.ceil((entry.resetTime - now) / 1000)
      return { success: false, resetTime }
    }

    return { success: true }
  }

  // Nettoyer les entrées expirées (à appeler périodiquement)
  cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.attempts.entries()) {
      if (now > entry.resetTime) {
        this.attempts.delete(key)
      }
    }
  }
}

export const rateLimiter = new RateLimiter()

// Nettoyer les entrées expirées toutes les heures
setInterval(
  () => {
    rateLimiter.cleanup()
  },
  60 * 60 * 1000,
)
