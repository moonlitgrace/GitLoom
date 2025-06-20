'use client';

import Editor from './_components/editor';
import Sidebar from './_components/sidebar';
import { ActiveFieldProvider } from './_providers/active-field.provider';

export default function ClientPage() {
  return (
    <ActiveFieldProvider>
      <div className="col-span-1">
        <Sidebar />
      </div>
      <Editor />
    </ActiveFieldProvider>
  );
}
