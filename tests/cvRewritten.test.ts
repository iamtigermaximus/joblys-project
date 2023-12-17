import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from "@prisma/client";
import OpenAI from 'openai';
import POST from "../src/app/api/cvRewritten/route"

jest.mock('../src/lib/prisma.ts');
const prisma = new PrismaClient();


describe('POST API', () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;

  beforeEach(() => {
    jest.resetAllMocks();
    req = {
      body: { id: '1' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  

  it('should respond with 200 OK on successful rewrite', async () => {
    // Mock Prisma response
    const prismaFindUniqueMock = jest.spyOn(prisma.rewrittenCVs, 'findUnique');
    prismaFindUniqueMock.mockResolvedValue({
        id: '1',
        ownerId: 'someOwnerId',
        content: {
          "Work Experience": {
            "Company XYZ": [
              {
                Position: "Software Developer",
                Location: "City ABC",
                StartDate: "2022-01-01",
                EndDate: "2023-01-01",
                Responsibilities: ["Develop new features", "Fix bugs", "Collaborate with team"],
              },
            ],
          },
        },
        source: 'someSource',
        createdAt: new Date(),
        updatedAt: new Date(),
        cVId: 0
      });

    // Mock OpenAI response
   
    
    const openAIChatCompletionMock = jest.spyOn(OpenAI.prototype, 'request');
    openAIChatCompletionMock.mockResolvedValue({
      data: { choices: [{ message: { content: "Developing new features/n Fixing bugs  /n Collaborating with team" } }] },
    });

    // Mock Prisma update function
    const prismaUpdateMock = jest.spyOn(prisma.rewrittenCVs, 'update');
    prismaFindUniqueMock.mockResolvedValue({
      id: 'someId',
      ownerId: 'someOwnerId',
      content: {
        "Work Experience": {
          "Company XYZ": [
            {
              Position: "Software Developer",
              Location: "City ABC",
              StartDate: "2022-01-01",
              EndDate: "2023-01-01",
              Responsibilities: ["Developing new features", "Fixing bugs", "Collaborating with team"],
            },
          ],
        },
      },
      source: 'someSource',
      createdAt: new Date(),
      updatedAt: new Date(),
      cVId: 0
    });


    // Call the API function
    await POST(req as NextApiRequest, res as NextApiResponse);

    // Check the response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Successful rewrite of CV' });
  });

  it('should respond with 404 if CV is not found or missing work experience', async () => {
    // Mock Prisma response to simulate CV not found or missing work experience
    const prismaFindUniqueMock = jest.spyOn(prisma.parsedCVs, 'findUnique');
    prismaFindUniqueMock.mockResolvedValue(null);

    // Call the API function
    await POST(req as NextApiRequest, res as NextApiResponse);

    // Check the response
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'CV not found or missing Work Experience' });
  });

  it('should respond with 500 if an error occurs during rewrite', async () => {
    // Mock Prisma response
    const prismaFindUniqueMock = jest.spyOn(prisma.parsedCVs, 'findUnique');
    prismaFindUniqueMock.mockResolvedValue({
        id: 'someId',
        ownerId: 'someOwnerId',
        content: '{"Work Experience": {}}',
        source: 'someSource',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    // Mock OpenAI response to simulate an error
    const openAIChatCompletionMock = jest.spyOn(OpenAI.prototype, 'request');
    openAIChatCompletionMock.mockRejectedValue(new Error('Some error'));
  

    // Call the API function
    await POST(req as NextApiRequest, res as NextApiResponse);

    // Check the response
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unable to rewrite CV' });
  });
});
