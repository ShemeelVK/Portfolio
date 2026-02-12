import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import * as yup from 'yup';

const profileSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email(),
  headline: yup.string(),
  bio: yup.string(),
  avatarUrl: yup.string(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    let validatedData;
    try {
        validatedData = await profileSchema.validate(body, { abortEarly: false, stripUnknown: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.errors }, { status: 400 });
    }

    // Update the user. We use findFirst or findUnique by email.
    // Since we are updating the logged in user:
    const user = await prisma.user.update({
        where: { email: session.user.email },
        data: validatedData,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
