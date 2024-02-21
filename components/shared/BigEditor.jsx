"use client";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import EditorSkeleton from "../SkeletonLoaders/EditorSkeleton";

const BigEditor = ({ Content, HandleContentChange, Title, HandleTitleChange }) => {
  // here i use useMemo and dynamic to load it only on a client side
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill"),{
        loading: () => <EditorSkeleton />,
        ssr: false,
      }),
    []
  );
  return (
    <>
      <input
        className="p-2 w-full  text-xl rounded-md bg-transparent border-[#cccccc] border outline-none dark:text-white"
        value={Title}
        onChange={HandleTitleChange}
        placeholder="Enter your Title"
      />

      <ReactQuill
        theme="snow"
        value={Content}
        onChange={HandleContentChange}
        className="dark:text-white dark:bg-transparitent border-none outline-none w-full custom-scrollbar pb-12 h-[80vh] mainEditerHight rounded-lg"
      />
    </>
  );
};

export default BigEditor