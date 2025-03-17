"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState, useEffect } from 'react';

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
  const [content, setContent] = useState(`
    <h1>עוגת שוקולד קלאסית</h1>
    <h2>מצרכים:</h2>
    <ul>
      <li>2 כוסות קמח</li>
      <li>2 כוסות סוכר</li>
      <li>3/4 כוס קקאו</li>
    </ul>
  `);

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setContent(newContent);
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none p-4 focus:outline-none text-right',
        dir: 'rtl',
      },
    },
  });

  const editorView = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose max-w-none p-4 focus:outline-none text-right',
        dir: 'rtl',
      },
    },
  });

  useEffect(() => {
    if (editorView && content) {
      editorView.commands.setContent(content);
    }
  }, [content, editorView]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-right">עורך מתכונים</h1>
      <button onClick={ () => setIsEditable(old => false)} >מצב עריכה</button>
      <div className="bg-white rounded-lg shadow-md">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-right">תצוגה מקדימה</h2>
        <div className="bg-white rounded-lg shadow-md">
          <EditorContent editor={editorView} />
        </div>
      </div>
    </div>
  );
};

export default RecipeEditor;