import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { type ComponentsId, components } from '../_constants/components';
import ComponentItem from './component-item';

export default function Sidebar() {
  const [activeFieldIds, setActiveFieldIds] = useState<Array<ComponentsId>>(['text', 'slug']);

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      setActiveFieldIds((items) => {
        const oldIndex = items.indexOf(active.id as ComponentsId);
        const newIndex = items.indexOf(over.id as ComponentsId);

        const newArr = arrayMove(items, oldIndex, newIndex);
        console.log(newArr);
        return newArr;
      });
    }
  }

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
      <SortableContext items={activeFieldIds} strategy={verticalListSortingStrategy}>
        <div className="sticky top-0 flex flex-col gap-4 p-4">
          <div className="flex flex-col">
            <h3 className="font-medium">Fields</h3>
            <span className="text-muted-foreground text-xs">Click on a field below to edit</span>
          </div>
          <div className="flex flex-col gap-2">
            {activeFieldIds.map((id) => {
              const { label, Icon } = components[id];
              return <ComponentItem key={id} id={id} label={label} Icon={Icon} />;
            })}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}
