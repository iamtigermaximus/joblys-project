import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import POST from "../src/app/api/cvRewritten/route";
import prisma from "../src/lib/prisma";

import { MockContext, Context, createMockContext } from "../context";
import { use } from "react";

describe("POST API", () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;
  let mockCtx: MockContext;
  let ctx: Context;

  const data = JSON.stringify({
    "Work Experience": {
      "Company XYZ": [
        {
          Position: "Software Developer",
          Location: "City ABC",
          StartDate: "2022-01-01",
          EndDate: "2023-01-01",
          Responsibilities: [
            "Develop new features",
            "Fix bugs",
            "Collaborate with team",
          ],
        },
        {
          Position: "Intern",
          Location: "City ABC",
          StartDate: "2022-01-01",
          EndDate: "2023-01-01",
          Responsibilities: [
            "Develop new features",
            "Fix bugs",
            "Collaborate with team",
          ],
        },
      ],
      "Company ABC": [
        {
          Position: "Software Developer",
          Location: "City ABC",
          StartDate: "2022-01-01",
          EndDate: "2023-01-01",
          Responsibilities: [
            "Develop new features",
            "Fix bugs",
            "Collaborate with team",
          ],
        },
        {
          Position: "Intern",
          Location: "City ABC",
          StartDate: "2022-01-01",
          EndDate: "2023-01-01",
          Responsibilities: [
            "Develop new features",
            "Fix bugs",
            "Collaborate with team",
          ],
        },
      ],
    },
  });
  const rewritedData = JSON.stringify({
    "Work Experience": {
      "Company XYZ": [
        {
          Position: "Software Developer",
          Location: "City ABC",
          StartDate: "2022-01-01",
          EndDate: "2023-01-01",
          Responsibilities: [
            "Developing new features",
            "Fixing bugs",
            "Collaborating with team",
          ],
        },
        {
          Position: "Intern",
          Location: "City ABC",
          StartDate: "2022-01-01",
          EndDate: "2023-01-01",
          Responsibilities: [
            "Developing new features",
            "Fixing bugs",
            "Collaborating with team",
          ],
        },
      ],
      "Company ABC": [
        {
          Position: "Software Developer",
          Location: "City ABC",
          StartDate: "2022-01-01",
          EndDate: "2023-01-01",
          Responsibilities: [
            "Developing new features",
            "Fixing bugs",
            "Collaborating with team",
          ],
        },
        {
          Position: "Intern",
          Location: "City ABC",
          StartDate: "2022-01-01",
          EndDate: "2023-01-01",
          Responsibilities: [
            "Developing new features",
            "Fixing bugs",
            "Collaborating with team",
          ],
        },
      ],
    },
  });
  let userID = "";

  beforeEach(() => {
    jest.resetAllMocks();
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    req = {
      body: { id: "1" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should make a successful request to OpenAI and print the full response", async () => {
    jest.mock("openai");
    const openAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const parserPromt = `Rewrite the following job responsibilities to enhance their professional appeal for a CV, while preserving their original meaning. 
    Please list your responsibilities in a bullet or numbered format. Ensure that the essence of each task remains the same, without introducing new facts or figures. 
    Each rewritten responsibility should correspond directly to the original ones provided, and try to maintain a concise length suitable for a CV.
    Original Responsibilities:
    "Developing new features \nFixing bugs  \nCollaborating with team"
    Focus on using a variety of dynamic action verbs and professional terminology, especially if your experience is in a specific industry (please mention if so). For clarity, see the examples below:

    Developed and optimized back-end APIs for a large-scale e-commerce platform, leading to significant improvements in response time.
    Designed and executed a comprehensive digital marketing strategy, substantially increasing online brand presence and social media engagement.
    Oversaw and directed multiple high-priority projects, ensuring completion within established timeframes and budget constraints.`;

    const result = await openAI.completions.create({
      model: "text-davinci-003",
      prompt: parserPromt,
      max_tokens: 3 * 30,
    });
    expect(result?.choices?.[0]?.text).toBeTruthy();
    console.log("Full OpenAI result:", result?.choices?.[0]?.text);
  });

  it("should respond with 200 OK on successful rewrite", async () => {
    const existingUser = await prisma.user.findUnique({
      where: { id: "1234" },
    });

    console.log(existingUser);

    if (!existingUser) {
      const createdUser = await prisma.user.create({
        data: {
          id: "1234",
          name: "John Doe",
          email: "john.doe@example.com",
        },
      });

      userID = createdUser.id;
    } else {
      userID = existingUser.id;
    }

    const createdRecord = await prisma.rewrittenCVs.create({
      data: {
        ownerId: userID,
        content: data,
        source: "someSource",
      },
    });

    const openAIChatCompletionMock = jest.spyOn(OpenAI.prototype, "request");
    openAIChatCompletionMock.mockResolvedValue({
      choices: [
        {
          text: "Developing new features \nFixing bugs  \nCollaborating with team \nDeveloping new features \nFixing bugs  \nCollaborating with team \nDeveloping new features \nFixing bugs  \nCollaborating with team \nDeveloping new features \nFixing bugs  \nCollaborating with team",
        },
      ],
    });

    req.body.id = createdRecord.id;

    await POST(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successful rewrite of CV",
    });
  });

  it("should respond with 404 if CV is not found or missing work experience", async () => {
    const prismaFindUniqueMock = jest.spyOn(prisma.parsedCVs, "findUnique");
    prismaFindUniqueMock.mockResolvedValue(null);

    await POST(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "CV not found or missing Work Experience",
    });
  });

  it("should respond with 500 if an error occurs during rewrite", async () => {
    const createdRecord = await prisma.rewrittenCVs.create({
      data: {
        ownerId: "1234",
        content: data,
        source: "someSource",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    req.body.id = createdRecord.id;

    const openAIChatCompletionMock = jest.spyOn(OpenAI.prototype, "request");
    openAIChatCompletionMock.mockRejectedValue(new Error("Some error"));

    await POST(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Unable to rewrite CV" });
  });
});
