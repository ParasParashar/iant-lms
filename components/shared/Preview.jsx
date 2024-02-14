"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
const Preview = ({ value }) => {
  return <ReactQuill value={value} theme="bubble" readOnly />;
};

export default Preview;
