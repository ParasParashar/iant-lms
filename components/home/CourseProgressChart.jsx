"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

export const CourseProgressChart = ({ data }) => {
  return (
    <Card>
      {data?.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 50,
            }}
          >
            <XAxis
              dataKey="courseTitle"
              stroke="#888888"
              tickLine={false}
              axisLine={true}
              fontSize={0}
            />
            <YAxis
              dataKey="Total_Percent"
              stroke="#888888"
              fontSize={15}
              tickLine={false}
              axisLine={true}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#ffffff", color: "#000000" }} // Set the font color to black (#000000)
            />
            <Legend />
            <Bar dataKey="Course_Complete" stackId="a" fill="#3d5992" />
            {/* <Bar dataKey="Total_Percent" stackId="a" fill="#ECEEFC" /> */}
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[350px] flex flex-col items-center gap-2 justify-center">
          <p className="text-center px-4 text-4xl font-serif font-bold antialiased animate-pulse">Transform Your Future: Plant the Seed with One Enrollment! 
          </p>
          <span className="animate-bounce w-10 h-10 text-[60px]">👇</span>
        </div>
      )}

    </Card>
  );
};
