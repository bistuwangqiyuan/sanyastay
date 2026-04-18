import Link from 'next/link';
import { Home, Calendar, Heart, MessageCircle, Star, User, Settings, ChevronLeft } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: '概览' },
  { href: '/dashboard/bookings', icon: Calendar, label: '我的预订' },
  { href: '/dashboard/favorites', icon: Heart, label: '我的收藏' },
  { href: '/dashboard/messages', icon: MessageCircle, label: '消息' },
  { href: '/dashboard/reviews', icon: Star, label: '我的评价' },
  { href: '/dashboard/profile', icon: User, label: '个人资料' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex flex-1">
        <aside className="hidden md:flex w-60 border-r border-border bg-card flex-col p-4 gap-1">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 px-3">
            <ChevronLeft className="h-4 w-4" /> 返回首页
          </Link>
          {sidebarLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="ghost" className="w-full justify-start gap-3 font-normal">
                <link.icon className="h-4 w-4" />
                {link.label}
              </Button>
            </Link>
          ))}
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  );
}
