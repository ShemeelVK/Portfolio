import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import * as yup from 'yup';

const projectSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  imageUrl: yup.string(),
  demoUrl: yup.string(),
  githubUrl: yup.string(),
  // yup handles arrays differently. safe to check for array of strings
  tags: yup.array().of(yup.string().required()).default([]), 
  featured: yup.boolean(),
});

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
      include: {
        tags: true, // Include related tags
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    let validatedData;
    try {
        validatedData = await projectSchema.validate(body, { abortEarly: false, stripUnknown: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.errors }, { status: 400 });
    }

    const { tags, ...projectData } = validatedData;

    // Handle tags: connect existing or create new
    // For SQLite many-to-many, we need to create tags if they don't exist and connect them.
    // However, Prisma standard `connectOrCreate` for arrays is tricky.
    // Better to map them.
    
    // Simplification for now: Fetch tag IDs or create them one by one. Or use `connectOrCreate` inside `create`.
    
    const project = await prisma.project.create({
      data: {
        ...projectData,
        tags: tags ? {
            connectOrCreate: tags.map((tag) => ({
                where: { name: tag },
                create: { name: tag },
            })),
        } : undefined
      },
      include: {
        tags: true,
      }
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Project creation error:", error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
