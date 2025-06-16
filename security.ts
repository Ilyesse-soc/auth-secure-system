/**
 * Fonctions de sécurité pour valider et nettoyer les inputs
 */

export function validateTarget(target: string): boolean {
  // Regex pour IP v4
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

  // Regex pour nom de domaine
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  return ipRegex.test(target) || domainRegex.test(target)
}

export function sanitizeInput(input: string): string {
  // Supprime les caractères dangereux pour éviter les injections shell
  return input
    .trim()
    .replace(/[;&|`$(){}[\]\\]/g, "") // Supprime les caractères shell dangereux
    .replace(/\s+/g, "") // Supprime les espaces
    .toLowerCase()
}

export function isValidIP(ip: string): boolean {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return ipRegex.test(ip)
}

export function isValidDomain(domain: string): boolean {
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return domainRegex.test(domain)
}

/**
 * Valide que la cible n'est pas une IP privée ou localhost (optionnel)
 */
export function isPublicTarget(target: string): boolean {
  if (isValidIP(target)) {
    // Vérifie si c'est une IP privée
    const parts = target.split(".").map(Number)

    // 127.x.x.x (localhost)
    if (parts[0] === 127) return false

    // 10.x.x.x (privé)
    if (parts[0] === 10) return false

    // 172.16.x.x - 172.31.x.x (privé)
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return false

    // 192.168.x.x (privé)
    if (parts[0] === 192 && parts[1] === 168) return false
  }

  return true
}
