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
  tags: yup.array().of(yup.string().required()).default([]),
  featured: yup.boolean(),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
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

    // Disconnect all tags first? Or smart update?
    // Prisma set: [] disconnects all.
    // Then connect/create new ones.

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...projectData,
        tags: tags ? {
            set: [], // Disconnect all existing
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

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
