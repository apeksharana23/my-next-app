import Link from 'next/link';

export default async function Products() {

    const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
        .then((res) => res.json())
        .then((data) => data).catch((err) => console.error(err));

    return (
        <div className="flex items-center bg-indigo-100 w-screen min-h-screen">
            <div className="container ml-auto mr-auto flex flex-wrap items-start">
                <div className="w-full pl-5 lg:pl-2 mb-4 mt-4">
                    <h1 className="text-3xl lg:text-4xl text-gray-700 font-extrabold">
                        Best Sellers
                    </h1>
                </div>
                {
                    products && products.map((product, key) => {
                        return (
                            <div key={`product-index-${key}`} className="w-full md:w-1/2 lg:w-1/4 p-2">
                                <div className="bg-white rounded-lg shadow-lg p-4">
                                    <Link href={`/products/${product.id}`} className="text-blue-500 hover:text-blue-700 mb-2">
                                        <img src={product.image} alt={product.title} width={300} height={300} className="w-full h-48 object-cover rounded-lg mb-4" />
                                        <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                                    </Link>
                                    <p className="text-gray-600 mb-4">{product.description}</p>
                                    <p className="text-gray-800 font-bold">${product.price}</p>
                                </div>
                            </div>
                        )
                    })
                }



            </div>
        </div>
    );
}