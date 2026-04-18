import { ArrowLeft, Calendar, User, CreditCard, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <Link href={`/properties/${id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> 返回房源详情
      </Link>

      <h1 className="text-2xl font-bold mb-8">确认预订</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-3 space-y-8">
          {/* Trip Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> 行程信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>入住日期</Label>
                  <Input type="date" className="mt-1.5" />
                </div>
                <div>
                  <Label>退房日期</Label>
                  <Input type="date" className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label>住客人数</Label>
                <Input type="number" defaultValue={2} min={1} max={4} className="mt-1.5 w-32" />
              </div>
              <div>
                <Label>租期类型</Label>
                <RadioGroup defaultValue="monthly" className="mt-2 flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">日租</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">月租</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seasonal" id="seasonal" />
                    <Label htmlFor="seasonal">季租</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Guest Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> 入住人信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>姓名</Label>
                  <Input className="mt-1.5" placeholder="入住人姓名" />
                </div>
                <div>
                  <Label>手机号</Label>
                  <Input className="mt-1.5" placeholder="联系电话" />
                </div>
              </div>
              <div>
                <Label>特殊要求</Label>
                <Textarea className="mt-1.5" placeholder="如有特殊需求请在此说明..." rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" /> 支付方式
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="card" className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="card" />
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-sm">银行卡支付</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="alipay" />
                  <span className="text-blue-500 font-bold text-sm">A</span>
                  <span className="font-medium text-sm">支付宝</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="wechat" />
                  <span className="text-green-500 font-bold text-sm">W</span>
                  <span className="font-medium text-sm">微信支付</span>
                </label>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Agreement */}
          <div className="space-y-3">
            <label className="flex items-start gap-2 cursor-pointer">
              <Checkbox className="mt-0.5" />
              <span className="text-sm text-muted-foreground">
                我已阅读并同意<Link href="/about" className="text-primary hover:underline">服务条款</Link>和<Link href="/about" className="text-primary hover:underline">取消政策</Link>
              </span>
            </label>
          </div>

          <Button className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90">
            确认支付 ¥4,380
          </Button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-4">
                <div className="w-24 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-sand/20 shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm line-clamp-2">海景花园精装两居 · 三亚湾一线海景</h3>
                  <p className="text-xs text-muted-foreground mt-1">三亚湾 · 金牌认证</p>
                </div>
              </div>
              <Separator />
              <h4 className="font-semibold">费用明细</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">月租费用 × 1个月</span><span>¥3,800</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">服务费</span><span>¥380</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">清洁费</span><span>¥200</span></div>
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span>总计</span>
                  <span className="text-primary">¥4,380</span>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p>您的付款受到平台资金托管保护。款项将在您入住确认后才释放给房东。</p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-palm" /> 免费取消（入住前7天）
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-palm" /> 24小时客服支持
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-palm" /> 品质认证房源
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
