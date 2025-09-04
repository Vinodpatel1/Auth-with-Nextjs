import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest) {
  try {
    await connect(); // ensure DB is connected

    const reqBody = await request.json();
    const { username, email: rawEmail, password: rawPassword } = reqBody;

    const email = rawEmail.toLowerCase().trim();
    const password = rawPassword;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    let savedUser;
    try {
      savedUser = await newUser.save();
      console.log("✅ User created:", savedUser.email);
    } catch (err: unknown) {
      console.error("❌ Failed to save user:", err);
      return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
    }

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      status: 201,
      user: { id: savedUser._id, email: savedUser.email, username: savedUser.username },
    });
  } catch (error: unknown) {
    const e = error as Error;
    console.error("🔥 Signup error:", e.message);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
