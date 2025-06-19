import { useActiveField } from '../_hooks/use-active-field';
import { ComponentsId } from '../_types';
import TextInput from './fields/text-input';

export default function Editor() {
  const { activeFields } = useActiveField();

  return (
    <div className="col-span-3 flex flex-col gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-medium">Editor</h3>
        <span className="text-muted-foreground text-xs">
          Arrange and edit frontmatter fields below
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {activeFields.map((field) => (
          <RenderField key={field.id} componentId={field.componentId} />
        ))}
      </div>
    </div>
  );
}

function RenderField({ componentId }: { componentId: ComponentsId }) {
  switch (componentId) {
    case 'text':
      return <TextInput />;
  }
}
