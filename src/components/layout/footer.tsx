import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-foreground/[0.03] border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                S
              </div>
              <div>
                <div className="font-bold text-lg">三亚旅居通</div>
                <div className="text-xs text-muted-foreground">SanyaStay</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              在三亚，住出生活的模样。三亚领先的旅居民宿平台，提供短租、月租、季租一站式服务。
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>海南省三亚市天涯区</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>400-888-STAY</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>hello@sanyastay.com</span>
              </div>
            </div>
          </div>

          {/* For Guests */}
          <div>
            <h3 className="font-semibold mb-4">旅居者</h3>
            <ul className="space-y-2.5">
              <li><Link href="/properties" className="text-sm text-muted-foreground hover:text-foreground transition-colors">找房源</Link></li>
              <li><Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">旅居指南</Link></li>
              <li><Link href="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">旅居社区</Link></li>
              <li><Link href="/community/events" className="text-sm text-muted-foreground hover:text-foreground transition-colors">社区活动</Link></li>
              <li><Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">安全保障</Link></li>
            </ul>
          </div>

          {/* For Hosts */}
          <div>
            <h3 className="font-semibold mb-4">房东</h3>
            <ul className="space-y-2.5">
              <li><Link href="/host" className="text-sm text-muted-foreground hover:text-foreground transition-colors">成为房东</Link></li>
              <li><Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">房东指南</Link></li>
              <li><Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">定价建议</Link></li>
              <li><Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">房源认证</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">关于</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">关于我们</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">加入我们</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">媒体报道</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">服务条款</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">隐私政策</Link></li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted-foreground leading-relaxed max-w-4xl">
          <span className="font-medium text-foreground">公开数据口径说明：</span>
          平台对外展示的宏观经济与旅游统计，以《三亚旅居民宿平台商业计划书》所载为准，包括但不限于：海南自贸港封关与免签表述（新华社，2025-12-18）、三亚市 GDP
          与过夜游客花费（三亚市统计局公开数据）、企业所得税鼓励类 15% 税率（国家税务总局海南省税务局政策摘要）。具体数值随政府发布更新，请以主管部门最新公报为准。
        </p>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; 2026 三亚旅居通 SanyaStay. 保留所有权利。</p>
          <div className="flex items-center gap-4">
            <span>琼ICP备XXXXXXXX号</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
