'use client';

import Image from "next/image";
import CKEditorComponent from './textEditor/CKEditor';


export default function Home() {
  const handleEditorChange = (content) => {
    console.log('תוכן העורך:', content);
  };

  return (
    <div>
      <h1>הוסף מתכון חדש</h1>
      <div>
      <h2>טופס עריכה</h2>
      {/* <RecipeEditorJson /> */}
      {/* <CKEditorComponent
        initialValue="<p>תוכן התחלתי...</p>"
        onChange={handleEditorChange}
      /> */}
    </div>
    </div>
  );
}
