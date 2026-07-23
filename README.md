# 三亚旅居通 SanyaStay

三亚旅居民宿平台:提供短租、月租、季租一站式服务,含房源搜索、预订支付、房东后台、旅居社区等模块。

技术栈:Next.js (App Router) + TypeScript + Tailwind CSS + Supabase + Stripe,部署于 Netlify。

## 本地开发

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

环境变量参考 `.env.example`(Supabase / Stripe / OpenAI 等,均为可选,缺失时 API 会优雅降级)。

## 构建与测试

```bash
npm run build   # 生产构建
npm run lint    # ESLint
npm test        # 冒烟测试
```

## 部署

站点通过 Netlify 自动部署:推送到 GitHub `master` 分支后自动构建上线。构建配置见 `netlify.toml`,环境变量在 Netlify 控制台 Site settings → Environment variables 中配置。

## 联系方式

- 邮箱:mingxinai@agentmail.to / 13426086861@139.com
- 电话:13426086861
