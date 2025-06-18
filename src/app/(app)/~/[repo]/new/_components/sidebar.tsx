import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { type ComponentsId, components } from '../_constants/components';
import ComponentItem from './component-item';

export default function Sidebar() {
  const [activeFieldIds] = useState<Array<ComponentsId>>(['text', 'slug']);

  return (
    <DndContext modifiers={[restrictToVerticalAxis]}>
      <SortableContext items={activeFieldIds} strategy={verticalListSortingStrategy}>
        <div className="col-span-1 flex flex-col gap-4 p-4">
          <div className="flex flex-col">
            <h3 className="font-medium">Fields</h3>
            <span className="text-muted-foreground text-xs">Click on a field below to edit</span>
          </div>
          <div className="flex flex-col gap-2">
            {Object.entries(components).map(([id, { label, Icon }]) => (
              <ComponentItem key={id} id={id} label={label} Icon={Icon} />
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}
