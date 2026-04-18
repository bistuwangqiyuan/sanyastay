import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-sand/5 p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl">
          S
        </div>
        <div>
          <div className="font-bold text-xl">三亚旅居通</div>
          <div className="text-xs text-muted-foreground">SanyaStay</div>
        </div>
      </Link>
      {children}
    </div>
  );
}
