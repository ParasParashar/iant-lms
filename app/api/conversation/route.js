import { getAllUserEnrolledCourses } from "@/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// getting user enrolled courses
async function getUserCoursesName() {
  const userEnrolledCourses = await getAllUserEnrolledCourses();
  return userEnrolledCourses?.map((course) => course.title).join(",");
}

// creating post route
export async function POST(req) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    const data = messages.map((item) => {
      return {
        role: item.role,
        content: item.content,
      };
    });

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    // putting the instruction message
    const courses = await getUserCoursesName();
    const userCourses =
      courses?.length > 0 ? courses : "various indemand Courses";
    // creating a instruction me{ssage
    const instructionMessage = {
      role: "system",
      content: `You are a virtual AI teacher of IANT Learning management system ,you can answer all type of question related to  ${userCourses}, You can use code snippets or you can use code comments for the explanations and give answer of coding question in markdowns`,
    };
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...data],
    });
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("chat ai error", error.message);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
