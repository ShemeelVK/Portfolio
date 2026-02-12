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

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: { startDate: 'desc' },
    });
    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
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
        validatedData = await experienceSchema.validate(body, { abortEarly: false, stripUnknown: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.errors }, { status: 400 });
    }

    const { startDate, endDate, ...rest } = validatedData;

    const experience = await prisma.experience.create({
      data: {
        ...rest,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
