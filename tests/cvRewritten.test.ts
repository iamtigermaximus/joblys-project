import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from "@prisma/client";
import OpenAI from 'openai';
import POST from "../src/app/api/cvRewritten/route"
import prisma  from "../src/lib/prisma"
import { prismaMock } from '../singleton'


import { MockContext, Context, createMockContext } from '../context'

jest.mock('../src/lib/prisma.ts');


describe('POST API', () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;
  let mockCtx: MockContext
  let ctx: Context

  beforeEach(() => {
    jest.resetAllMocks();
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
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
    const prismaFindUniqueMock = jest.spyOn(prismaMock.rewrittenCVs, 'findUnique');
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

    const openAIChatCompletionMock = jest.spyOn(OpenAI.prototype, 'request');
    openAIChatCompletionMock.mockResolvedValue({
       choices: [{ message: { content: "Developing new features \nFixing bugs  \nCollaborating with team" } }] },
    );

    const prismaUpdateMock = jest.spyOn(prismaMock.rewrittenCVs, 'update');
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


    await POST(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Successful rewrite of CV' });
  });

  it('should respond with 404 if CV is not found or missing work experience', async () => {
    const prismaFindUniqueMock = jest.spyOn(prismaMock.parsedCVs, 'findUnique');
    prismaFindUniqueMock.mockResolvedValue(null);

    await POST(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'CV not found or missing Work Experience' });
  });

  it('should respond with 500 if an error occurs during rewrite', async () => {
    const prismaFindUniqueMock = jest.spyOn(prismaMock.rewrittenCVs, 'findUnique');
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

    const openAIChatCompletionMock = jest.spyOn(OpenAI.prototype, 'request');
    openAIChatCompletionMock.mockRejectedValue(new Error('Some error'));
  

    await POST(req as NextApiRequest, res as NextApiResponse);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unable to rewrite CV' });
  });
});