import React from 'react';

interface TemplateNameArgs {}

const TemplateName: React.FC<TemplateNameArgs> = (args) => {
  return (
    <div className="TemplateName" data-testid="TemplateName">
      <h1>TemplateName component</h1>
    </div>
  );
};

export default TemplateName;
export type { TemplateNameArgs };
