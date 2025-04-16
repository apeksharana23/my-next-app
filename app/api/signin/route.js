import User from '@/app/models/user';
import dbConnect from '@/app/config/dbConfig';
import * as bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';

export async function POST(request) {
    try {
        await dbConnect();
        const { email, password } = await request.json();
        const user = await User.findOne({email: email });
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);
                const token = await new SignJWT({ id: user._id }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(encodedKey);
                return new Response(JSON.stringify({
                    status: true,
                    message: "User Sign In Successfully",
                    data: user,
                    token: token
                }), { status: 200 });
            }else{
                return new Response(JSON.stringify({
                    status: false,
                    message: "Invalid Password",
                }), { status: 401 });
            }
        }else{
            return new Response(JSON.stringify({
                status: false,
                message: "Email id not found in our database",
                data: user
            }), { status: 404 });
        }       

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({
            status: false,
            message: err.message
        }), { status: 500 });
    }
}
