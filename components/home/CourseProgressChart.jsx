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
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          width={200}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="courseTitle"
            stroke="#888888"
            fontSize={15}
            tickLine={false}
            axisLine={true}
          />
          <YAxis
            dataKey="Total_Percent"
            stroke="#888888"
            fontSize={15}
            tickLine={false}
            axisLine={true}
            tickFormatter={(value) => `${value}%`}
          />
          {/* <Tooltip /> */}
          <Legend />
          <Bar dataKey="Course_Complete" stackId="a" fill="#3d5992" />
          <Bar dataKey="Total_Percent" stackId="a" fill="#8f9cef" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};