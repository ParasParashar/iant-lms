import { Progress } from "../ui/progress";

const UserProgress = ({ value }) => {
  return (
    <div className="text-sm  font-semibold flex flex-col items-start justify-center w-full  text-muted-foreground">
      <Progress className="h-3" value={value} />
      {value || 0}% Complete
    </div>
  );
};

export default UserProgress;
