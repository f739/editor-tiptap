'use client';
import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';
import Mention from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';

// נניח שזו פונקציה שמטפלת בהעלאת קבצים
const uploadFile = async (file) => {
  // בפועל, כאן היית מעלה את הקובץ לשרת
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      if (input.files?.length) {
        const url = await uploadFile(input.files[0]);
        editor.chain().focus().setImage({ src: url }).run();
      }
    };
    input.click();
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
  };

  const addCodeBlock = () => {
    editor.chain().focus().setCodeBlock().run();
  };

  const addMention = () => {
    editor.chain().focus().insertContent('@').run();
  };

  const insertTemplate = (template) => {
    editor.commands.setContent(template);
  };

  return (
    <div className="border-b p-2 mb-4 flex flex-wrap gap-2 justify-end">
      {/* עיצוב בסיסי */}
      <div className="flex gap-2 border-l pl-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        >
          מודגש
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        >
          נטוי
        </button>
      </div>

      {/* טבלאות */}
      <div className="flex gap-2 border-l pl-2">
        <button onClick={insertTable} className="p-2 rounded">
          הוסף טבלה
        </button>
        <button
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          className="p-2 rounded"
        >
          הוסף עמודה
        </button>
        <button
          onClick={() => editor.chain().focus().addRowBefore().run()}
          className="p-2 rounded"
        >
          הוסף שורה
        </button>
      </div>

      {/* תמונות וקוד */}
      <div className="flex gap-2 border-l pl-2">
        <button onClick={addImage} className="p-2 rounded">
          העלה תמונה
        </button>
        <button onClick={addCodeBlock} className="p-2 rounded">
          בלוק קוד
        </button>
      </div>

      {/* אזכורים ואימוג'ים */}
      <div className="flex gap-2 border-l pl-2">
        <button onClick={addMention} className="p-2 rounded">
          הוסף אזכור
        </button>
      </div>

      {/* תבניות */}
      <div className="flex gap-2">
        <button
          onClick={() => insertTemplate(recipeTemplate)}
          className="p-2 rounded"
        >
          תבנית מתכון
        </button>
        <button
          onClick={() => insertTemplate(instructionsTemplate)}
          className="p-2 rounded"
        >
          תבנית הוראות
        </button>
      </div>
    </div>
  );
};

// תבניות מוכנות מראש
const recipeTemplate = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'שם המתכון' }]
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'מצרכים' }]
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [{ type: 'paragraph', content: [{ type: 'text', text: 'מצרך 1' }] }]
        },
        {
          type: 'listItem',
          content: [{ type: 'paragraph', content: [{ type: 'text', text: 'מצרך 2' }] }]
        }
      ]
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'אופן ההכנה' }]
    },
    {
      type: 'orderedList',
      content: [
        {
          type: 'listItem',
          content: [{ type: 'paragraph', content: [{ type: 'text', text: 'שלב 1' }] }]
        },
        {
          type: 'listItem',
          content: [{ type: 'paragraph', content: [{ type: 'text', text: 'שלב 2' }] }]
        }
      ]
    }
  ]
};

const instructionsTemplate = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 1 },
      content: [{ type: 'text', text: 'הוראות שימוש' }]
    },
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'כתוב כאן את ההוראות...' }]
    },
    {
      type: 'codeBlock',
      attrs: { language: 'javascript' },
      content: [{ type: 'text', text: '// דוגמת קוד כאן' }]
    }
  ]
};

const CustomMention = {
  items: ({ query }) => {
    return [
      'שף רון',
      'שף משה',
      'שף דנה',
      'שף רותם'
    ].filter(item => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5);
  },
  render: () => {
    return {
      onStart: props => {
        // כאן היית מציג את רשימת ההצעות
      },
      onUpdate: props => {
        // כאן היית מעדכן את רשימת ההצעות
      },
      onKeyDown: props => {
        // כאן היית מטפל בניווט במקלדת
      },
      onExit: () => {
        // כאן היית מנקה את הרשימה
      }
    };
  }
};

const AdvancedEditor = () => {
  const [content, setContent] = useState(recipeTemplate);
  const lowlight = createLowlight(all);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true
      }),
      Table.configure({
        resizable: true
      }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlockLowlight.configure({
        lowlight
      }),
      Mention.configure({
        suggestion: CustomMention
      }),
      Placeholder.configure({
        placeholder: 'התחל לכתוב כאן...'
      }),
      TextStyle,
      Color,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full rounded-lg shadow-lg'
        }
      })
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none p-4 focus:outline-none text-right',
        dir: 'rtl',
      },
    },
    immediatelyRender: false
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-right">עורך מתכונים מתקדם</h1>
      <div className="bg-white rounded-lg shadow-md">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-right">תצוגת JSON</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-left" dir="ltr">
          {JSON.stringify(content, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default AdvancedEditor;