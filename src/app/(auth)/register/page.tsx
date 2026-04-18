'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '', fullName: '', phone: '', role: 'guest',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('两次密码输入不一致');
      return;
    }
    if (!agreeTerms) {
      toast.error('请同意服务条款');
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            role: formData.role,
          },
        },
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('注册成功！请查收验证邮件。');
        router.push('/login');
      }
    } catch {
      toast.error('注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">注册三亚旅居通</CardTitle>
        <CardDescription>创建账号，开始旅居之旅</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <Label>我是</Label>
            <RadioGroup value={formData.role} onValueChange={(v) => update('role', v)} className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer p-3 border border-border rounded-lg flex-1 hover:bg-accent has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                <RadioGroupItem value="guest" />
                <span className="text-sm font-medium">旅居客</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-3 border border-border rounded-lg flex-1 hover:bg-accent has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                <RadioGroupItem value="host" />
                <span className="text-sm font-medium">房东</span>
              </label>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="fullName">姓名</Label>
            <div className="relative mt-1.5">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="fullName" value={formData.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="您的姓名" className="pl-10" required />
            </div>
          </div>
          <div>
            <Label htmlFor="email">邮箱</Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" value={formData.email} onChange={(e) => update('email', e.target.value)} placeholder="your@email.com" className="pl-10" required />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">手机号 (选填)</Label>
            <div className="relative mt-1.5">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="phone" value={formData.phone} onChange={(e) => update('phone', e.target.value)} placeholder="手机号码" className="pl-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="password">密码</Label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => update('password', e.target.value)} placeholder="至少8位" className="pl-10 pr-10" required minLength={8} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <Label htmlFor="confirmPassword">确认密码</Label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} placeholder="再次输入密码" className="pl-10" required />
            </div>
          </div>
          <label className="flex items-start gap-2 cursor-pointer">
            <Checkbox checked={agreeTerms} onCheckedChange={(v) => setAgreeTerms(v === true)} className="mt-0.5" />
            <span className="text-xs text-muted-foreground">
              我已阅读并同意<Link href="/about" className="text-primary hover:underline">服务条款</Link>和<Link href="/about" className="text-primary hover:underline">隐私政策</Link>
            </span>
          </label>
          <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90" disabled={loading}>
            {loading ? '注册中...' : '注册'}
          </Button>
        </form>

        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">或者使用</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="h-11">微信</Button>
          <Button variant="outline" className="h-11">Google</Button>
          <Button variant="outline" className="h-11">Apple</Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          已有账号？{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">立即登录</Link>
        </p>
      </CardContent>
    </Card>
  );
}
