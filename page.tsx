"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Settings, Activity, LogOut, User, Crown, Zap } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-red-600" />
      case "moderator":
        return <Shield className="h-4 w-4 text-blue-600" />
      default:
        return <User className="h-4 w-4 text-green-600" />
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "moderator":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Système d'Authentification</h1>
              <p className="text-gray-600">Tableau de bord sécurisé</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {getRoleIcon(user.role)}
              <span className="font-medium">{user.email}</span>
              <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-1" />
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Welcome Card */}
        <Card className="border-l-4 border-l-indigo-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-indigo-600" />
              Bienvenue, {user.firstName || user.email} !
            </CardTitle>
            <CardDescription>
              Vous êtes connecté avec le rôle <strong>{user.role}</strong>. Votre dernière connexion était le{" "}
              {user.lastLogin ? new Date(user.lastLogin).toLocaleString("fr-FR") : "première fois"}.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <Link href="/profile" className="block">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Mon Profil</p>
                    <p className="text-lg font-semibold">Gérer</p>
                  </div>
                  <User className="h-8 w-8 text-blue-600" />
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <Link href="/security" className="block">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Sécurité</p>
                    <p className="text-lg font-semibold">Paramètres</p>
                  </div>
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
              </Link>
            </CardContent>
          </Card>

          {(user.role === "admin" || user.role === "moderator") && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Link href="/admin/users" className="block">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
                      <p className="text-lg font-semibold">Gérer</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </Link>
              </CardContent>
            </Card>
          )}

          {user.role === "admin" && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Link href="/admin/logs" className="block">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Logs</p>
                      <p className="text-lg font-semibold">Activité</p>
                    </div>
                    <Activity className="h-8 w-8 text-orange-600" />
                  </div>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Role-specific content */}
        {user.role === "admin" && (
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Crown className="h-5 w-5" />
                Panneau Administrateur
              </CardTitle>
              <CardDescription>
                Vous avez accès à toutes les fonctionnalités d'administration du système.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/admin/users">
                    <Users className="h-4 w-4 mr-2" />
                    Gestion des utilisateurs
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/admin/roles">
                    <Shield className="h-4 w-4 mr-2" />
                    Gestion des rôles
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/admin/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Paramètres système
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {user.role === "moderator" && (
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Shield className="h-5 w-5" />
                Panneau Modérateur
              </CardTitle>
              <CardDescription>Vous pouvez modérer les utilisateurs et le contenu.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/admin/users">
                    <Users className="h-4 w-4 mr-2" />
                    Modération utilisateurs
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/admin/reports">
                    <Activity className="h-4 w-4 mr-2" />
                    Rapports d'activité
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activité Récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Connexion réussie</p>
                  <p className="text-xs text-gray-600">Il y a quelques instants</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Token rafraîchi automatiquement</p>
                  <p className="text-xs text-gray-600">Il y a 5 minutes</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Profil consulté</p>
                  <p className="text-xs text-gray-600">Il y a 1 heure</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
