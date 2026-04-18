import { z } from 'zod/v4';

export const loginSchema = z.object({
  email: z.email('请输入有效的邮箱地址'),
  password: z.string().min(8, '密码至少8位'),
});

export const registerSchema = z.object({
  email: z.email('请输入有效的邮箱地址'),
  password: z.string().min(8, '密码至少8位'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, '姓名至少2个字符'),
  phone: z.string().optional(),
  role: z.enum(['guest', 'host']),
  agreeTerms: z.literal(true, { error: '请同意服务条款' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: '两次密码输入不一致',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z.email('请输入有效的邮箱地址'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
