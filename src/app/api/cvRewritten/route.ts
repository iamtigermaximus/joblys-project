import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma  from "../../../lib/prisma"
import { Content } from "next/font/google";
import OpenAI from 'openai';

// const { OpenAIApi, ChatCompletionRequest } = require("openai");

const original_responsibilities = String;

const parserPromt = `Rewrite the following job responsibilities to enhance their professional appeal for a CV, while preserving their original meaning. 
Please list your responsibilities in a bullet or numbered format. Ensure that the essence of each task remains the same, without introducing new facts or figures. 
Each rewritten responsibility should correspond directly to the original ones provided, and try to maintain a concise length suitable for a CV.
Original Responsibilities:
${original_responsibilities}
Focus on using a variety of dynamic action verbs and professional terminology, especially if your experience is in a specific industry (please mention if so). For clarity, see the examples below:

Developed and optimized back-end APIs for a large-scale e-commerce platform, leading to significant improvements in response time.
Designed and executed a comprehensive digital marketing strategy, substantially increasing online brand presence and social media engagement.
Oversaw and directed multiple high-priority projects, ensuring completion within established timeframes and budget constraints.`;

interface ResumeData {
  content: {
    "Work Experience": WorkExperience;
  };
}

interface WorkExperience {
  [companyName: string]: Position[];
}
interface Position {
  Position: string;
  Location: string;
  StartDate: string;
  EndDate: string;
  Responsibilities: string[];
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;
    const result = await prisma.rewrittenCVs.findUnique({
      where: { id: id },
      select: { content: true },
    });
    console.log('Mock Result:', result, id);
    let resumeData: ResumeData;
    if (result && typeof result.content === "string") {
      resumeData = { content: JSON.parse(result.content) };
    } else {
        return res
        .status(404)
        .json({ message: "CV not found or missing Work Experience" });
    }

    let allResponsibilities: string[] = [];
    const workExperience = resumeData.content["Work Experience"];

    for (const companyName in workExperience) {
      const positions = workExperience[companyName];
      positions.forEach((position: { Responsibilities: string[] }) => {
        if (Array.isArray(position.Responsibilities)) {
          allResponsibilities = [
            ...allResponsibilities,
            ...position.Responsibilities,
          ];
        }
      });
    }

    const formattedResponsibilities = allResponsibilities
      .map((responsibility) => `- ${responsibility}`)
      .join("\n");
    const modifiedPrompt = parserPromt.replace('{original_responsibilities}', formattedResponsibilities);
    const openAI = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, 
    });
    const openaiResponse = await openAI.chat.completions.create({
        model: "text-davinci-003", 
        messages: [{role: "system", content: modifiedPrompt}],
        max_tokens: allResponsibilities.length * 30,
    });
    const responseContent = openaiResponse?.choices?.[0]?.message?.content;

    if (responseContent !== undefined && responseContent !== null) {
      const rewrittenResponsibilities = responseContent
        .trim()
        .split("\n")
        .map((line: string) => line.trim());
      let index = 0;
      for (const companyName in workExperience) {
        workExperience[companyName].forEach((position: any) => {
          const originalResponsibilitiesCount = position.Responsibilities.length;
          const updatedResponsibilities = rewrittenResponsibilities.slice(
            index,
            index + originalResponsibilitiesCount,
          );
          position.Responsibilities = updatedResponsibilities;
          index += originalResponsibilitiesCount;
        });
      }

      const combinedData = {
        ...resumeData.content,
        "Work Experience": workExperience,
      };

      const combinedDataConvertedJSON = JSON.parse(JSON.stringify(combinedData));

      const updatedData = await prisma.rewrittenCVs.update({
        where: { id: id },
        data: {
          content: combinedDataConvertedJSON,
        },
      });

      return res.status(200).json({ message: "Successful rewrite of CV" });
    } else {
      return res.status(500).json({ message: "Unable to rewrite CV" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to rewrite CV" });
  }
}
