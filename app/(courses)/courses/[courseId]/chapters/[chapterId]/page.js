const page = ({ params }) => {
  return (
    <main className="p-2">
      {params.courseId}
      <div>This is a chapter ID {params.chapterId}</div>
      div
    </main>
  );
};

export default page;
