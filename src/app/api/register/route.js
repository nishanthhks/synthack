import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { Doctor } from "@/models/medical";
import dbConnect from "@/lib/dbConnect";
// import { Doctor } from "@/models/medical";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, username, password } = await req.json();
    // log info
    console.log(name, email, username, password);

    // check existing user
    const existingDoctor = await Doctor.findOne({
      $or: [{ username }, { email }],
    });
    console.log(existingDoctor);

    if (existingDoctor) {
      return NextResponse.json(
        {
          error:
            existingDoctor.email === email
              ? "Email already in use"
              : "Username already taken",
        },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // create doctor
    const doctor = await Doctor.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    // return success
    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user: {
          id: doctor._id,
          name: doctor.name,
          email: doctor.email,
          username: doctor.username,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
