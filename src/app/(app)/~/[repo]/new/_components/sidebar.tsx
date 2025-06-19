import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import { components } from '../_constants';
import { useActiveField } from '../_hooks/use-active-field';
import { ComponentsId } from '../_types';
import ActiveFieldItem from './active-field-item';
import FieldItem from './field-item';

export default function Sidebar() {
  const { activeFields, setActiveFields } = useActiveField();

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      setActiveFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newArr = arrayMove(items, oldIndex, newIndex);
        console.log(newArr);
        return newArr;
      });
    }
  }

  function addField(componentId: ComponentsId) {
    setActiveFields((prev) => [
      ...prev,
      { id: `${componentId}-${nanoid()}`, componentId, key: '', value: '' },
    ]);
  }

  function deleteField(id: string) {
    setActiveFields((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="sticky top-0 flex flex-col gap-4 p-4">
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
        <SortableContext items={activeFields} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col">
            <h3 className="font-medium">Fields</h3>
            <span className="text-muted-foreground text-xs">Click on a field below to edit</span>
          </div>
          <div className="flex flex-col gap-2">
            {activeFields.map(({ id, componentId }) => {
              const component = Object.keys(components).find((c) => c === componentId);
              if (!component) return null;

              const { label, Icon } = components[component as ComponentsId];
              return (
                <ActiveFieldItem
                  key={id}
                  id={id}
                  label={label}
                  Icon={Icon}
                  onDelete={deleteField}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
      <span className="text-muted-foreground text-xs">Click on a field below to add</span>
      <div className="flex flex-col gap-2">
        {Object.entries(components).map(([id, { label, Icon }]) => (
          <FieldItem
            key={id}
            id={id as ComponentsId}
            label={label}
            Icon={Icon}
            addField={addField}
          />
        ))}
      </div>
    </div>
  );
}
