"use client";

import Editor from "@monaco-editor/react";

type CodeEditorProps = {
  code: string;
  setCode: (value: string) => void;
};

export default function CodeEditor({ code, setCode }: CodeEditorProps) {
    
  return (
    <Editor
      height="400px"
      defaultLanguage="javascript"
      value={code}
      onChange={(value) => setCode(value ?? "")} // ✅ safe handling
      theme="vs-dark"
    />
  );
}