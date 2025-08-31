'use client';

import { useState, useCallback } from 'react';
import type { Decision, DecisionRequest } from '@/types/decision';
import { DecisionForm } from '@/components/decision-form';
import { DecisionTable } from '@/components/decision-table';
import { DecisionDrawer } from '@/components/decision-drawer';
import { Logo } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DecisionDashboardPage() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleFormSubmit = useCallback(
    async (data: DecisionRequest) => {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/decide', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const newDecisionData = await response.json();
        const newDecision: Decision = {
          ...newDecisionData,
          id: crypto.randomUUID(),
        };

        setDecisions(prev => [newDecision, ...prev].slice(0, 20));
      } catch (error) {
        console.error('Failed to get decision:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const handleRowClick = useCallback((decision: Decision) => {
    setSelectedDecision(decision);
    setIsDrawerOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight text-foreground">DecisionFlow</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>New Decision Request</CardTitle>
              </CardHeader>
              <CardContent>
                <DecisionForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Decisions</CardTitle>
              </CardHeader>
              <CardContent>
                <DecisionTable
                  decisions={decisions}
                  onRowClick={handleRowClick}
                  isSubmitting={isSubmitting}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {selectedDecision && (
        <DecisionDrawer
          decision={selectedDecision}
          isOpen={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
        />
      )}
    </div>
  );
}
