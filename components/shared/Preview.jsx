"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
const Preview = ({ value }) => {
  return <ReactQuill value={value} theme="bubble" readOnly className=" dark:text-white/70 text-[14px]"/>;
};

export default Preview;
