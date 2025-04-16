import next from 'next';
import Link from 'next/link';

export default async function Users() {

    const users = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
        .then((res) => res.json())
        .then((data) => data).catch((err) => console.error(err));
        console.log(users);
    return (
        <div className="flex items-center bg-indigo-100 w-screen min-h-screen">
            <div className="container ml-auto mr-auto flex flex-wrap items-start">
                <div className="w-full pl-5 lg:pl-2 mb-4 mt-4">
                    <h1 className="text-3xl lg:text-4xl text-gray-700 font-extrabold">
                        Users
                    </h1>
                </div>
                {
                    users && users.map((user, key) => {
                        return (
                            <div key={`user-index-${key}`} className="w-full md:w-1/2 lg:w-1/4 p-2">
                                <div className="bg-white rounded-lg shadow-lg p-4">
                                    <Link href={`/users/${user.id}`} className="text-blue-500 hover:text-blue-700 mb-2">
                                    </Link>
                                    <h2 className="text-xl font-bold mb-2">{user.username}</h2>
                                    <p className="text-gray-600 mb-4">{user.email}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}