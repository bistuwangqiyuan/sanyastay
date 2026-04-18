import { User, Mail, Phone, MapPin, Calendar, Camera, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { SUPPORTED_LOCALES, SUPPORTED_CURRENCIES } from '@/lib/constants';

export default function ProfilePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">个人资料</h1>

      <div className="space-y-6">
        {/* Avatar */}
        <Card>
          <CardContent className="p-6 flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">张</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div>
              <h2 className="font-semibold text-lg">张先生</h2>
              <p className="text-sm text-muted-foreground">zhang@email.com</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs"><Shield className="h-3 w-3 mr-1" /> 已认证</Badge>
                <Badge variant="outline" className="text-xs text-primary border-primary/30">旅居客</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardHeader><CardTitle className="text-base">基本信息</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>姓名</Label>
                <Input defaultValue="张先生" className="mt-1.5" />
              </div>
              <div>
                <Label>手机号</Label>
                <Input defaultValue="138****8888" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label>个人简介</Label>
              <Textarea defaultValue="退休教师，喜欢旅居生活。每年冬天来三亚过冬。" className="mt-1.5" rows={3} />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader><CardTitle className="text-base">偏好设置</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>语言</Label>
                <Select defaultValue="zh-CN">
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_LOCALES.map((l) => (<SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>货币</Label>
                <Select defaultValue="CNY">
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_CURRENCIES.map((c) => (<SelectItem key={c.code} value={c.code}>{c.symbol} {c.code}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>长辈模式</Label>
                <p className="text-xs text-muted-foreground">放大字体，简化操作界面</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Button className="bg-primary hover:bg-primary/90">保存修改</Button>
      </div>
    </div>
  );
}
