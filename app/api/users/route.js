import User from '@/app/models/user';
import dbConnect from '@/app/config/dbConfig';
import * as bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';

export async function POST(request) {
    try {
        await dbConnect();

        const { name, email, password, confirm_password } = await request.json();

        if (password !== confirm_password) {
            return new Response(JSON.stringify({
                status: false,
                message: "Passwords do not match"
            }), { status: 400 });
        }

        const plainText = "jdhhidbdndm#4545564";
        const saltRounds = 10;
        const token = await bcrypt.hash(plainText, saltRounds);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken: token,
            status: 0
        });

        await user.save();
        return new Response(JSON.stringify({
            status: true,
            message: "User Created Successfully",
            data: user
        }), { status: 201 });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({
            status: false,
            message: err.message
        }), { status: 500 });
    }
}

export async function GET(request) {
    try {
        await dbConnect();
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new Response(JSON.stringify({
                status: false,
                message: "Authorization token missing or malformed",
            }), { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);
        const {payload, protectedHeader} = await jwtVerify(token, encodedKey);
        const userId = payload.id;
        const user = await User.findById(userId);
        if (user) {
            return new Response(JSON.stringify({
                status: true,
                user: user
            }), { status: 200 });
        } else {
            return new Response(JSON.stringify({
                status: false,
                message: "User not found"
            }), { status: 400 });
        }

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({
            status: false,
            message: err.message
        }), { status: 500 });
    }
}
