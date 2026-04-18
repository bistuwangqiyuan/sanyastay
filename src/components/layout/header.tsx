'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Heart, MessageCircle, User, Globe, ChevronDown, Sun, Moon, Accessibility } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/app-store';
import { SUPPORTED_LOCALES, SUPPORTED_CURRENCIES } from '@/lib/constants';

const navLinks = [
  { href: '/properties', label: '找房源', labelEn: 'Properties' },
  { href: '/community', label: '社区', labelEn: 'Community' },
  { href: '/about', label: '关于', labelEn: 'About' },
  { href: '/help', label: '帮助', labelEn: 'Help' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, elderMode, toggleElderMode, locale, setLocale, currency, setCurrency } = useAppStore();
  const isZh = locale === 'zh-CN';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
            S
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-lg leading-tight text-foreground">
              {isZh ? '三亚旅居通' : 'SanyaStay'}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {isZh ? link.label : link.labelEn}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Elder Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleElderMode}
            className={cn('hidden sm:flex', elderMode && 'text-primary bg-primary/10')}
            title={isZh ? '长辈模式' : 'Elder Mode'}
          >
            <Accessibility className="h-4 w-4" />
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {SUPPORTED_LOCALES.map((loc) => (
                <DropdownMenuItem
                  key={loc.code}
                  onClick={() => setLocale(loc.code)}
                  className={cn(locale === loc.code && 'bg-accent')}
                >
                  {loc.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {SUPPORTED_CURRENCIES.map((cur) => (
                <DropdownMenuItem
                  key={cur.code}
                  onClick={() => setCurrency(cur.code)}
                  className={cn(currency === cur.code && 'bg-accent')}
                >
                  {cur.symbol} {cur.code}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <>
              <Link href="/dashboard/favorites">
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Heart className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard/messages">
                <Button variant="ghost" size="icon" className="hidden sm:flex relative">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {user.full_name?.[0] || user.email[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-3 w-3 hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.full_name || user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">{isZh ? '个人中心' : 'Dashboard'}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/bookings">{isZh ? '我的预订' : 'My Bookings'}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/favorites">{isZh ? '我的收藏' : 'Favorites'}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/messages">{isZh ? '消息' : 'Messages'}</Link>
                  </DropdownMenuItem>
                  {user.role === 'host' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/host">{isZh ? '房东管理' : 'Host Dashboard'}</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">{isZh ? '个人资料' : 'Profile'}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    {isZh ? '退出登录' : 'Log Out'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {isZh ? '登录' : 'Log In'}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  {isZh ? '注册' : 'Sign Up'}
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col gap-2 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      pathname === link.href
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground hover:bg-accent'
                    )}
                  >
                    {isZh ? link.label : link.labelEn}
                  </Link>
                ))}
                <div className="border-t border-border my-4" />
                <Button
                  variant="ghost"
                  onClick={() => { toggleElderMode(); }}
                  className="justify-start px-4"
                >
                  <Accessibility className="h-4 w-4 mr-2" />
                  {isZh ? '长辈模式' : 'Elder Mode'}
                  {elderMode && <Badge variant="secondary" className="ml-auto">ON</Badge>}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
