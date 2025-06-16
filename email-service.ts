/**
 * Service d'envoi d'emails
 * En production, utilisez un service comme SendGrid, Mailgun, ou AWS SES
 */

export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  // En production, utilisez un vrai service d'email
  console.log(`[EMAIL] Envoi d'email de vérification à ${email}`)
  console.log(`[EMAIL] Lien de vérification: ${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`)

  // Simulation d'envoi d'email
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  // En production, utilisez un vrai service d'email
  console.log(`[EMAIL] Envoi d'email de réinitialisation à ${email}`)
  console.log(`[EMAIL] Lien de réinitialisation: ${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`)

  // Simulation d'envoi d'email
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

export async function sendWelcomeEmail(email: string, firstName: string): Promise<void> {
  console.log(`[EMAIL] Envoi d'email de bienvenue à ${email}`)
  console.log(`[EMAIL] Bienvenue ${firstName} !`)

  // Simulation d'envoi d'email
  await new Promise((resolve) => setTimeout(resolve, 500))
}

export async function sendSecurityAlert(email: string, action: string, ip: string): Promise<void> {
  console.log(`[EMAIL] Alerte de sécurité pour ${email}`)
  console.log(`[EMAIL] Action: ${action} depuis l'IP ${ip}`)

  // Simulation d'envoi d'email
  await new Promise((resolve) => setTimeout(resolve, 500))
}
