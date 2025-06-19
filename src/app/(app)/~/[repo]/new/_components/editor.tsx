import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useActiveField } from '../_contexts/active-field.context';
import { FieldId } from '../_types/field';
import Sortable from './dnd/sortable';
import TextInput from './fields/text-input';

export default function Editor() {
  const { activeFields, setActiveFields } = useActiveField();

  function getField(fieldId: FieldId) {
    switch (fieldId) {
      case 'text':
        return TextInput;
    }
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      setActiveFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newArr = arrayMove(items, oldIndex, newIndex);
        return newArr;
      });
    }
  }

  return (
    <div className="col-span-3 flex flex-col gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-medium">Editor</h3>
        <span className="text-muted-foreground text-xs">
          Arrange and edit frontmatter fields below
        </span>
      </div>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
        <SortableContext items={activeFields} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2">
            {activeFields.map(({ id, fieldId }) => {
              const field = getField(fieldId);
              if (!field) return null;

              return (
                <Sortable key={id} id={id}>
                  {({ gripProps }) => field({ id, gripProps })}
                </Sortable>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
