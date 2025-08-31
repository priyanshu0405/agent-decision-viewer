import { NextResponse } from 'next/server';
import type { Decision, TraceStep } from '@/types/decision';

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sampleReasons = {
  approved: [
    'Customer has a good transaction history.',
    'Amount is within the approved daily limit.',
    'Payee is a known and trusted vendor.',
    'Fraud detection score is low.',
  ],
  declined: [
    "Insufficient funds in the customer's account.",
    "Transaction amount exceeds the customer's credit limit.",
    'Unusual payee for this customer profile.',
    'High fraud risk detected based on transaction pattern.',
    'Customer account is currently on hold.',
  ],
};

const sampleTraceSteps: Omit<TraceStep, 'details'>[] = [
  { step: 'Initiate Transaction Validation' },
  { step: 'Fetch Customer Account Details' },
  { step: 'Check Account Balance & Limits' },
  { step: 'Perform Fraud Analysis' },
  { step: 'Evaluate Payee Reputation' },
  { step: 'Compile Decision Factors' },
  { step: 'Finalize Decision' },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, payee, customerId } = body;

    if (
      !amount ||
      typeof amount !== 'number' ||
      !payee ||
      !customerId
    ) {
      return NextResponse.json({ message: 'Missing or invalid required fields' }, { status: 400 });
    }

    const start = Date.now();

    // Simulate network delay and processing time
    await new Promise(resolve => setTimeout(resolve, randomInt(300, 1500)));

    const decision: 'Approved' | 'Declined' = Math.random() > 0.4 ? 'Approved' : 'Declined';

    const reasons = [...sampleReasons[decision.toLowerCase() as 'approved' | 'declined']]
      .sort(() => 0.5 - Math.random())
      .slice(0, randomInt(1, 3));

    const trace: TraceStep[] = sampleTraceSteps.map(s => ({
      step: s.step,
      details: `Completed in ${randomInt(10, 100)}ms. Status: OK.`,
    }));

    const latency = Date.now() - start;

    const responseData: Omit<Decision, 'id'> = {
      decision,
      amount,
      payee,
      customerId,
      reasons,
      trace,
      latency,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
