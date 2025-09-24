import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, User, Globe, Sun, Moon, Menu, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const { theme, toggleTheme, language, setLanguage } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [notificationCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translations = {
    pt: {
      home: "Início",
      services: "Serviços",
      about: "Sobre",
      contact: "Contato",
      login: "Entrar",
      register: "Cadastrar",
      dashboard: "Dashboard",
      logout: "Sair",
    },
    en: {
      home: "Home",
      services: "Services",
      about: "About",
      contact: "Contact",
      login: "Login",
      register: "Register",
      dashboard: "Dashboard",
      logout: "Logout",
    },
    es: {
      home: "Inicio",
      services: "Servicios",
      about: "Acerca",
      contact: "Contacto",
      login: "Iniciar",
      register: "Registro",
      dashboard: "Dashboard",
      logout: "Cerrar sesión",
    },
  };

  const t = translations[language];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 smooth-transition ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border card-shadow" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 smooth-transition">
            <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CIE</span>
            </div>
            <span className="text-xl font-bold text-foreground">
              StudentID
            </span>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary smooth-transition">
              {t.home}
            </Link>
            <a href="#services" className="text-foreground hover:text-primary smooth-transition">
              {t.services}
            </a>
            <a href="#about" className="text-foreground hover:text-primary smooth-transition">
              {t.about}
            </a>
            <a href="#contact" className="text-foreground hover:text-primary smooth-transition">
              {t.contact}
            </a>
            {isAuthenticated && (
              <Link to="/dashboard" className="text-foreground hover:text-primary smooth-transition">
                {t.dashboard}
              </Link>
            )}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Globe className="h-4 w-4" />
                  <span className="ml-1 text-xs font-medium">
                    {language.toUpperCase()}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("pt")}>
                  Português
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("es")}>
                  Español
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleTheme}
              className="smooth-transition"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                  {isAuthenticated && user && (
                    <span className="ml-2 hidden sm:inline text-sm">
                      {user.name.split(' ')[0]}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">{t.dashboard}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      {t.logout}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/signin">{t.login}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/signup">{t.register}</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu - Visible on mobile */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};