import { NextResponse } from 'next/server';

// Auth majburiy emas (shaxsiy intervyu tayyorgarlik platformasi).
// Hammasi ochiq.
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
