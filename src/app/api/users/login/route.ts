import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await connect();

  try {
    const { email, password } = await request.json();

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.TOKEN_SECRET!,
      { expiresIn: "1d" }
    );

    const res = NextResponse.json({
      message: "User logged in successfully",
      success: true,
      user: { id: user._id, username: user.username, email: user.email },
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (err: any) {
    console.error("🔥 Login error:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
