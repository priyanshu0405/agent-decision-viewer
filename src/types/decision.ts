export type TraceStep = {
  step: string;
  details: string;
};

export type Decision = {
  id: string;
  decision: 'Approved' | 'Declined';
  amount: number;
  payee: string;
  customerId: string;
  reasons: string[];
  trace: TraceStep[];
  latency: number;
  timestamp: string;
};

export type DecisionRequest = {
  amount: number;
  payee: string;
  customerId: string;
};
