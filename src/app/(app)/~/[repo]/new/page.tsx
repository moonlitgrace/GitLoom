'use client';

import { nanoid } from 'nanoid';
import { useState } from 'react';
import Editor from './_components/editor';
import Sidebar from './_components/sidebar';
import { ActiveField } from './_lib/types';

export default function Page() {
  const [activeFields, setActiveFields] = useState<Array<ActiveField>>([
    { id: `text-${nanoid()}`, componentId: 'text' },
  ]);

  return (
    <>
      {/* adding title like this cause of client component */}
      <title>New</title>
      {/* rest of the layout */}
      <div className="grid h-full grid-cols-4 divide-x">
        <div className="col-span-1">
          <Sidebar activeFields={activeFields} setActiveFields={setActiveFields} />
        </div>
        <Editor />
      </div>
    </>
  );
}
