
import { NextRequest, NextResponse } from 'next/server';
import { submitContactForm } from '@/lib/actions';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  
  // Create a dummy initial state
  const initialState = {
    success: false,
    message: '',
  };

  const result = await submitContactForm(initialState, formData);

  if (!result.success) {
    return NextResponse.json({
      success: false,
      error: result.message,
      errors: result.errors
    }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    message: result.message,
  });
}
