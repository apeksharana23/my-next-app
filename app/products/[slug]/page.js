

export default async function ProductDetails({ params }) {
    const { slug } = await params;
    const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`)
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.error(err));
    return (
        <div className="container ml-auto mr-auto flex flex-wrap items-start">
            {
                product ? (
                    <div className="w-full pl-5 lg:pl-2 mb-4 mt-4">
                        <img src={product.image} alt={product.title} className="h-auto max-w-full" />
                        <p className="text-gray-800 font-bold">${product.price}</p>
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                    </div>
                ) :  (<h2>No Product Found.</h2>)
            }
        </div>
    )
}