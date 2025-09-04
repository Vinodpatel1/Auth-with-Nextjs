import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
  await connect();

  try {
    const reqBody = await request.json();
    let { username, email, password } = reqBody;

    email = email.toLowerCase().trim();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    console.log("✅ User created:", savedUser.email);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      status: 201,
      user: { id: savedUser._id, email: savedUser.email, username: savedUser.username },
    });
  } catch (err: any) {
    console.error("🔥 Signup error:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
