interface TemplateNameArgs {}

const TemplateName = (args: TemplateNameArgs) => {
  return (
    <div data-testid='TemplateName'>
      <h1>TemplateName component</h1>
    </div>
  );
};

export default TemplateName;
export type { TemplateNameArgs };
