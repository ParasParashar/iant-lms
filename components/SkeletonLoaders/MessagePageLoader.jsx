"use client";
import { Comment } from "react-loader-spinner";

export default function MessagePageLoader() {
  return (
    <div className="flex items-center justify-center  h-full w-full">
      <Comment
        visible={true}
        height="80"
        width="80"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#ffff"
        backgroundColor="#190ee4"
      />
    </div>
  );
}
