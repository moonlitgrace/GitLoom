'use server';

import { signOut } from '@/auth';
import { SignOutParams } from 'next-auth/react';

export async function signOutAction(params: SignOutParams) {
  await signOut({ ...params });
}
