import { cookies } from 'next/headers';


export default async function Dashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    return (
        <div className="container">
            Dashboard token : {token}
        </div>
    );
}