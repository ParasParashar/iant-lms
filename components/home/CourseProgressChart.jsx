"use client";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { Card } from "@/components/ui/card";

// export const CourseProgressChart = ({ data }) => {
//   const dispalyWidth = window.innerWidth;
//   console.log(dispalyWidth, "data of the width");
//   return (
//     <Card>
//       <ResponsiveContainer width="100%" height={350}>
//         <BarChart
//           width={200}
//           height={300}
//           data={data}
//           margin={{
//             top: 20,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <XAxis
//             dataKey="courseTitle"
//             stroke="#888888"
//             fontSize={dispalyWidth > 600 ? 12 : 6}
//             tickLine={false}
//             axisLine={true}
//             angle={-45}
//           />
//           <YAxis
//             dataKey="Total_Percent"
//             stroke="#888888"
//             fontSize={15}
//             tickLine={false}
//             axisLine={true}
//             tickFormatter={(value) => `${value}%`}
//           />
//           {/* <Tooltip /> */}
//           <Legend />
//           <Bar dataKey="Course_Complete" stackId="a" fill="#3d5992" />
//           <Bar dataKey="Total_Percent" stackId="a" fill="#8f9cef" />
//         </BarChart>
//       </ResponsiveContainer>
//     </Card>
//   );
// };
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
  const dispalyWidth = window.innerWidth;

  return (
    <Card>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 50, // Adjust bottom margin to make space for the x-axis labels
          }}
        >
          <XAxis
            dataKey="courseTitle"
            stroke="#888888"
            fontSize={dispalyWidth > 600 ? 8 : 3}
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
          <Tooltip
            contentStyle={{ backgroundColor: "#ffffff", color: "#000000" }} // Set the font color to black (#000000)
          />
          <Legend />
          <Bar
            dataKey="Course_Complete"
            stackId="a"
            fill="#3d5992"
            shape={(props) => {
              const { x, y, width, height, payload } = props;
              return (
                <g>
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={props.fill}
                  />
                  <text
                    x={x + width / 2}
                    y={y + height / 2}
                    fill="#ffffffd0"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={dispalyWidth > 600 ? 8 : 4}
                    transform={`rotate(-90, ${x + width / 2}, ${
                      y + height / 2
                    })`}
                  >
                    {payload.courseTitle}
                  </text>
                </g>
              );
            }}
          />
          <Bar dataKey="Total_Percent" stackId="a" fill="#8f9cef" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
