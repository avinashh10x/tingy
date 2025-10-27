import { Progress } from '@/components/ui/progress';

interface CompressionProgressProps {
  savings: number;
}

export function CompressionProgress({ savings }: CompressionProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Compression Efficiency</span>
        <span className="font-medium">{savings}% reduction</span>
      </div>
      <Progress value={savings} className="h-3" />
    </div>
  );
}
