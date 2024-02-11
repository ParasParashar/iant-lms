"use client";
const ChapterVideo = ({ src }) => {
  if (!src) {
    return (
      <p className="text-lg w-full p-8 text-center text-muted-foreground">
        Chapter Don't have any Video
      </p>
    );
  }
  return (
    // <section className=" w-full  lg:w-3/5">
    <section className="w-full">
      {src && (
        <iframe
          className=" w-full h-[200px] md:h-[300px]  lg:h-[410px] rounded-lg"
          allowFullScreen
          src={src}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture "
          title="Chapter Video"
        />
      )}
    </section>
  );
};

export default ChapterVideo;
