import React from 'react';

interface TemplateNameArgs {}

const TemplateName = (args: TemplateNameArgs) => {
  return (
    <div className="template-name">
      <h1>TemplateName component</h1>
    </div>
  );
};

export default TemplateName;
export type { TemplateNameArgs };
