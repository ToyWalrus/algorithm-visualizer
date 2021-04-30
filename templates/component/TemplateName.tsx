import React from 'react';
import './TemplateName.css';

interface TemplateNameArgs {}

const TemplateName: React.FC<TemplateNameArgs> = args => {
  return (
    <div className="template-name">
      <h1>TemplateName component</h1>
    </div>
  );
};

export default TemplateName;
export type { TemplateNameArgs };
