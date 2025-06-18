'use client';

import Editor from './_components/editor';
import Sidebar from './_components/sidebar';

export default function Page() {
  return (
    <>
      {/* adding title like this cause of client component */}
      <title>New</title>
      {/* rest of the layout */}
      <div className="grid h-full grid-cols-4 divide-x">
        <Sidebar />
        <Editor />
      </div>
    </>
  );
}
