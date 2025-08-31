'use client';

import type { Decision } from '@/types/decision';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { maskCustomerId } from '@/lib/utils';

type DecisionDrawerProps = {
  decision: Decision;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function DecisionDrawer({ decision, isOpen, onOpenChange }: DecisionDrawerProps) {

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg md:max-w-2xl overflow-y-auto">
        <SheetHeader className="pr-8">
          <SheetTitle className="text-2xl">Decision Details</SheetTitle>
          <SheetDescription>
            Transaction for {decision.payee} on{' '}
            {new Date(decision.timestamp).toLocaleString()}
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 py-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Decision</p>
              <div>
                <Badge variant={decision.decision === 'Approved' ? 'secondary' : 'destructive'}
                 className={decision.decision === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}>
                  {decision.decision}
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Amount</p>
              <p className="font-semibold">${decision.amount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Customer ID</p>
              <p className="font-mono text-xs">{maskCustomerId(decision.customerId)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Latency</p>
              <p>{decision.latency}ms</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Reasons</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {decision.reasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="agent-trace">
                <AccordionTrigger>
                  <h3 className="font-semibold">Agent Trace</h3>
                </AccordionTrigger>
                <AccordionContent>
                  {decision.trace.map((item, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="font-medium text-sm mb-1">{item.step}</h4>
                      <pre className="font-code text-sm bg-muted p-3 rounded-md overflow-x-auto">
                        {item.details}
                      </pre>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
