import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ title, subtitle, className, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={cn('mb-8', align === 'center' && 'text-center', className)}>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
