# Task backlog (Kiro-style)

状态：`[ ]` 待办、`[~]` 进行中、`[x]` 完成（随迭代更新）。

## Phase A — 可发布基线

- [x] A-1 Netlify 配置与官方 npm registry（`.npmrc`、`netlify.toml`）。
- [x] A-2 `next build --webpack` 规避 Turbopack 在部分环境下的路径问题。
- [x] A-3 AI Chat 使用 `toTextStreamResponse`；无 Key 时 503。
- [x] A-4 Stripe 懒加载，避免构建期导入即实例化。
- [x] A-5 Supabase 中间件在无环境变量时 no-op。
- [x] A-6 区域与占位图下载至 `public/`。
- [ ] A-7 在 Netlify 控制台配置全部 `NEXT_PUBLIC_*` 与密钥；打通预览环境登录回调 URL。

## Phase B — 计划书 P0 产品深化

- [ ] B-1 `properties` 列表 API 与前端对接，替换纯 Mock（对齐 3414）。
- [ ] B-2 地图：Mapbox 组件封装 + 详情页生活圈 POI 读表 `life_circle_pois`。
- [ ] B-3 预订创建写 `bookings` + 支付意图关联 `booking_id` 状态机。
- [ ] B-4 电子合同：外链法大大/e签宝或占位签署流（3418）。

## Phase C — 社区与国际化

- [ ] C-1 社区帖子 CRUD + 评论 API 与页面数据绑定。
- [ ] C-2 `next-intl` 全面替换硬编码（路由 `[locale]` 或 cookie 策略二选一）。
- [ ] C-3 微信小程序（计划书 5337）：独立 Taro 仓库或 monorepo 子包。

## Phase D — 数据与商业叙事

- [ ] D-1 落地页数据看板组件：引用计划书表 1-1、SAM 测算表并附脚注链接。
- [ ] D-2 埋点：Plausible / 自建事件表，支撑「数据驱动」章节。
