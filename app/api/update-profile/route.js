import path from "path";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import User from '@/app/models/user';
import dbConnect from '@/app/config/dbConfig';


export async function POST(req) {
    try {
        await dbConnect();
        const formData = await req.formData();
        const id = formData.get("id");
        const name = formData.get("name");
        const email = formData.get("email");
        const profile = formData.get("profileImage");


        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ status: false, message: "Invalid user" }, { status: 400 });
        }

        user.name = name;
        user.email = email;

        if (profile) {
            const buffer = Buffer.from(await profile.arrayBuffer());
            const filename = Date.now() + profile.name.replaceAll(" ", "_");
            await writeFile(path.join(process.cwd(), "public/uploads/" + filename), buffer);
            user.profile = `/uploads/${filename}`;
        }

        await user.save(); 
        return NextResponse.json({ status: true, message: "Profile updated", data: user });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ status: false, message: err.message }, { status: 500 });
    }
}
