import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import * as yup from 'yup';

const experienceSchema = yup.object({
  role: yup.string().required("Role is required"),
  company: yup.string().required("Company is required"),
  location: yup.string(),
  startDate: yup.string().required("Start Date is required"), 
  endDate: yup.string().nullable(),
  description: yup.string().required("Description is required"),
  current: yup.boolean(),
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
        validatedData = await experienceSchema.validate(body, { abortEarly: false, stripUnknown: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.errors }, { status: 400 });
    }

    const { startDate, endDate, ...rest } = validatedData;

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        ...rest,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.experience.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}
