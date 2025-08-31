'use client';

import type { Decision } from '@/types/decision';
import { maskCustomerId } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

type DecisionTableProps = {
  decisions: Decision[];
  onRowClick: (decision: Decision) => void;
  isSubmitting: boolean;
};

export function DecisionTable({ decisions, onRowClick, isSubmitting }: DecisionTableProps) {
  if (!isSubmitting && decisions.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-md border border-dashed">
        <p className="text-muted-foreground">No data yet. Submit a request to see decisions.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Decision</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead className="text-right">Latency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isSubmitting && (
            <TableRow>
              <TableCell>
                <Skeleton className="h-5 w-20" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-16 ml-auto" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-24" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-5 w-12 ml-auto" />
              </TableCell>
            </TableRow>
          )}
          {decisions.map(decision => (
            <TableRow
              key={decision.id}
              onClick={() => onRowClick(decision)}
              className="cursor-pointer"
            >
              <TableCell>
                <Badge variant={decision.decision === 'Approved' ? 'secondary' : 'destructive'}
                 className={decision.decision === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}>
                  {decision.decision}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium">
                ${decision.amount.toFixed(2)}
              </TableCell>
              <TableCell className="font-mono text-sm">{maskCustomerId(decision.customerId)}</TableCell>
              <TableCell className="text-right text-muted-foreground">{decision.latency}ms</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
