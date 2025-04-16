import User from '@/app/models/user';
import dbConnect from '@/app/config/dbConfig';
import * as bcrypt from 'bcrypt'; 

export async function GET(request) {
    try {
        await dbConnect();
        

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({
            status: false,
            message: err.message
        }), { status: 500 });
    }
}
