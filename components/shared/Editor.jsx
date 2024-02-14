"use client";

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import EditorSkeleton from "../SkeletonLoaders/EditorSkeleton";

const Editor = ({ value, handleChange }) => {
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
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleChange}
      className="dark:text-white dark:bg-transparitent border-none outline-none custom-scrollbar pb-12  h-72 lg:h-[400px]"
    />
  );
};

export default Editor;
