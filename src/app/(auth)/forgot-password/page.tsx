'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
      });
      if (error) toast.error(error.message);
      else setSent(true);
    } catch {
      toast.error('发送失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-palm/10 text-palm mb-4">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold mb-2">邮件已发送</h2>
          <p className="text-sm text-muted-foreground mb-6">重置密码链接已发送到 {email}，请查收邮件。</p>
          <Link href="/login">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> 返回登录
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">忘记密码</CardTitle>
        <CardDescription>输入您的邮箱，我们将发送密码重置链接</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">邮箱地址</Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="pl-10" required />
            </div>
          </div>
          <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90" disabled={loading}>
            {loading ? '发送中...' : '发送重置链接'}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link href="/login" className="text-primary hover:underline flex items-center justify-center gap-1">
            <ArrowLeft className="h-3 w-3" /> 返回登录
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
