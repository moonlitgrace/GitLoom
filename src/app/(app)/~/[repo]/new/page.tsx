'use client';

import Editor from './_components/editor';
import Sidebar from './_components/sidebar';
import { ActiveFieldProvider } from './_providers/active-field.provider';

export default function Page() {
  return (
    <div className="grid h-full grid-cols-4 divide-x">
      <ActiveFieldProvider>
        <div className="col-span-1">
          <Sidebar />
        </div>
        <Editor />
      </ActiveFieldProvider>
    </div>
  );
}
