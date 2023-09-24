import { connect } from '@/db/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();
// In NextJs we get everything from request.json unlike in express where we have take it from 'req.body'
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // create a new user
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const userSaved = await newUser.save();
    console.log(userSaved);

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      userSaved,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
