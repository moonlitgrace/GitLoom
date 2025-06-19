import { nanoid } from 'nanoid';
import { useActiveField } from '../_contexts/active-field.context';
import { FieldId } from '../_types/field';
import { FIELD } from '../constants';
import FieldItem from './field-item';

export default function Sidebar() {
  const { setActiveFields } = useActiveField();

  function addField(fieldId: FieldId) {
    setActiveFields((prev) => [
      ...prev,
      { id: `${fieldId}-${nanoid()}`, fieldId: fieldId, key: '', value: '' },
    ]);
  }

  return (
    <div className="sticky top-0 flex flex-col gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-medium">Fields</h3>
        <span className="text-muted-foreground text-xs">Click on a field below to add</span>
      </div>
      <div className="flex flex-col gap-2">
        {Object.entries(FIELD).map(([id, { label, Icon }]) => (
          <FieldItem key={id} id={id as FieldId} label={label} Icon={Icon} addField={addField} />
        ))}
      </div>
    </div>
  );
}
