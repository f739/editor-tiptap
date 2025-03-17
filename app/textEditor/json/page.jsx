'use client';

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b p-2 mb-4 flex gap-2 justify-end">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
      >
        כותרת 1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
      >
        כותרת 2
      </button>
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
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
      >
        רשימה
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
      >
        רשימה ממוספרת
      </button>
    </div>
  );
};

const RecipeEditor = () => {
  const initialContent = {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [{ type: 'text', text: 'עוגת שוקולד קלאסית' }]
      },
      {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'מצרכים:' }]
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: '2 כוסות קמח' }]
              }
            ]
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: '2 כוסות סוכר' }]
              }
            ]
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: '3/4 כוס קקאו' }]
              }
            ]
          }
        ]
      }
    ]
  };

  const [content, setContent] = useState(initialContent);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-right">עורך מתכונים</h1>
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

export default RecipeEditor;