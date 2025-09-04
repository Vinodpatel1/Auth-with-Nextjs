import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connect(); // ensure DB is connected

    const reqBody = await request.json();
    const { email: rawEmail, password: rawPassword } = reqBody;

    const email = rawEmail.toLowerCase().trim();
    const password = rawPassword;

    console.log("📥 Login request:", reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found for email:", email);
      return NextResponse.json(
        { message: "User not found, please signup" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const tokenData = { id: user._id, username: user.username, email: user.email };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

    const response = NextResponse.json({
      message: "User logged in successfully",
      success: true,
      user: tokenData,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error: unknown) {
    const e = error as Error;
    console.error("🔥 Login error:", e.message);
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
