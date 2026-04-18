import { Shield, Heart, Globe, Award, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '@/components/shared/section-heading';

const values = [
  { icon: Shield, title: '诚信至上', desc: '真实房源，透明价格，让每一次交易都值得信赖。' },
  { icon: Heart, title: '温暖服务', desc: '从搜索到入住，全程贴心服务，让您感受家的温暖。' },
  { icon: Globe, title: '开放包容', desc: '连接全球旅居者，打造多元文化交融的旅居社区。' },
  { icon: Award, title: '品质保障', desc: '严格的认证体系，确保每一套房源都达到高标准。' },
  { icon: Users, title: '社区共建', desc: '鼓励邻里互助，共同营造温馨和谐的旅居生活。' },
  { icon: TrendingUp, title: '持续创新', desc: 'AI赋能服务体验，不断探索旅居生活的更多可能。' },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">关于三亚旅居通</h1>
        <p className="text-lg text-muted-foreground">让每一位旅居者在三亚都能找到理想的第二个家</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Mission */}
        <section className="text-center">
          <SectionHeading title="我们的使命" />
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            三亚旅居通致力于解决旅居者在三亚找房的信息不对称问题。通过技术创新和严格的品质认证，
            我们为旅居者提供真实可靠的房源信息，安全便捷的预订体验，以及温暖互助的社区平台。
            无论您是来三亚过冬的候鸟老人，还是远程办公的数字游民，三亚旅居通都能帮您找到理想的旅居之所。
          </p>
        </section>

        {/* Story */}
        <section>
          <SectionHeading title="我们的故事" />
          <div className="bg-muted/30 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground leading-relaxed">
              三亚旅居通诞生于2024年。创始团队在三亚旅居期间，深切感受到旅居找房的种种痛点：
              房源信息混乱、照片与实际不符、中介乱收费、缺乏社区归属感。
              我们决心用技术改变这一切。如今，三亚旅居通已服务超过50,000名旅居者，
              覆盖三亚及海南9大旅居区域，成为海南领先的旅居服务平台。
            </p>
          </div>
        </section>

        {/* Values */}
        <section>
          <SectionHeading title="核心价值观" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <Card key={v.title} className="text-center border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
