'use client';

import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent = ({ initialValue = '', onChange }) => {
  const [editorData, setEditorData] = useState(initialValue);

  const editorConfiguration = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'blockQuote',
      'insertTable',
      'undo',
      'redo'
    ],
    language: 'he',
    removePlugins: ['Title'],
  };

  return (
    <div className="ckeditor-wrapper" dir="rtl">
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={editorData}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          if (onChange) onChange(data);
        }}
      />
    </div>
  );
};

export default CKEditorComponent;