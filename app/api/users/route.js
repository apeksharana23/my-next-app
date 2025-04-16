import User from '@/app/models/user';
import dbConnect from '@/app/config/dbConfig';
import * as bcrypt from 'bcrypt'; 

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
