import { cn } from "@/lib/utils"; // Utilitário padrão do shadcn

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn(
      "p-2 md:p-4 space-y-8 bg-background min-h-screen text-foreground",
      className
    )}>
      {children}
    </div>
  );
}

// Sub-componente para o Header (opcional, mas ajuda muito no DRY)
export function PageHeader({ title, description, children }: { 
  title: string; 
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {children && <div className="flex gap-2">{children}</div>}
    </div>
  );
}