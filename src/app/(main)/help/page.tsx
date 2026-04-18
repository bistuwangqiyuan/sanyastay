import { Search, BookOpen, Home, Shield, MessageCircle, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SectionHeading } from '@/components/shared/section-heading';

const guides = [
  { icon: BookOpen, title: '旅居者指南', desc: '从搜索到入住的完整指南', color: 'text-primary bg-primary/10' },
  { icon: Home, title: '房东指南', desc: '如何发布和管理房源', color: 'text-sand bg-sand/10' },
  { icon: Shield, title: '安全中心', desc: '预订保障与安全须知', color: 'text-palm bg-palm/10' },
  { icon: MessageCircle, title: '联系客服', desc: '7×24小时在线客服支持', color: 'text-coral bg-coral/10' },
];

const faqs = [
  { q: '如何预订房源？', a: '在搜索页面找到心仪的房源，点击"立即预订"，选择入住日期和退房日期，填写入住信息后完成支付即可。所有款项将通过平台资金托管保护。' },
  { q: '可以月租或季租吗？', a: '可以！三亚旅居通支持日租（1-30天）、月租（1-3个月）和季租（3-6个月）多种灵活租期。长租通常有更优惠的价格。' },
  { q: '如何确保房源真实性？', a: '所有房源都经过平台工作人员实地验证和拍摄。我们提供钻石、金牌、银牌三级认证体系，认证房源的照片、设施、位置等信息都经过严格核实。' },
  { q: '支持哪些支付方式？', a: '我们支持银行卡、支付宝、微信支付，以及国际信用卡（Visa, MasterCard）。支持人民币、美元、卢布、韩元、日元五种货币。' },
  { q: '取消预订如何退款？', a: '根据房源的取消政策不同有所区别。灵活政策：入住前1天免费取消；温和政策：入住前7天免费取消；严格政策：入住前14天可退50%。详情见各房源页面。' },
  { q: '什么是"生活圈"功能？', a: '生活圈是我们的特色功能，展示每套房源周边的医院、超市、海滩、公园、公交站等生活配套设施，以及步行/驾车所需时间，帮助您全面了解生活便利度。' },
  { q: '老年人如何使用平台？', a: '我们提供"长辈模式"，开启后字体更大、操作更简化。同时支持子女代订功能，子女可以帮父母搜索和预订房源。适老化房源有专门标识。' },
  { q: '如何成为房东？', a: '注册账号时选择"房东"角色，完成身份认证后即可发布房源。我们的团队会在48小时内上门验证房源，通过后即可上线。' },
];

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">帮助中心</h1>
        <p className="text-muted-foreground mb-6">有什么可以帮助您的？</p>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="搜索常见问题..." className="pl-12 h-12 text-base rounded-xl" />
        </div>
      </div>

      {/* Guides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
        {guides.map((g) => (
          <Card key={g.title} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-5 text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${g.color}`}>
                <g.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-sm">{g.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{g.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <SectionHeading title="常见问题" />
        <Accordion multiple={false} className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-left font-medium text-sm hover:no-underline">
                <span className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                  {faq.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
