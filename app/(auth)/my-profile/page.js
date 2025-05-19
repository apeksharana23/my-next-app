import ProfileForm from "./components/profileForm";
import { cookies } from 'next/headers';

export default async function MyProfile() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    return (
        <div className="my-3">
            <h1 className="text-center">My Profile</h1>
            <p className="text-center">Welcome to my profile page. Here you can find information about my projects and experiences.</p>
            <ProfileForm token={token} />
        </div>);
}