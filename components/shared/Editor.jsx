"use client";

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import EditorSkeleton from "../SkeletonLoaders/EditorSkeleton";

const Editor = ({ content, handleContentChange, title, handleTitleChange }) => {
  // here i use useMemo and dynamic to load it only on a client side
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        loading: () => <EditorSkeleton />,
        ssr: false,
      }),
    []
  );
  return (
    <>
      <input
        className="p-2 text-xl rounded-md bg-transparent border-[#cccccc] border outline-none"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter your Title"
      />

      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleContentChange}
        className="dark:text-white dark:bg-transparitent border-none outline-none custom-scrollbar pb-12  h-72 lg:h-[400px]"
      />
    </>
  );
};

export default Editor;
