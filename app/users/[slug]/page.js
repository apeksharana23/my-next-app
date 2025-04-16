

export default async function UserDetails({ params }) {
    const { slug } = await params;
    const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${slug}`)
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.error(err));
        
    return (
        <div className="container ml-auto mr-auto flex flex-wrap items-start">
            {
                user ? (
                    <div className="w-full pl-5 lg:pl-2 mb-4 mt-4">
                        <h1>{user.username}</h1>
                        <p>{user.email}</p>
                    </div>
                ) : (<h2>No User Found.</h2>)
            }
        </div>
    );
}