import Link from "next/link";

export default function Blog(){
    function calcSum(...num){
        let total = 0;
        for(let i= 0; i < num.length; i++){
            total += num[i];
        }
        return total;
    }

    const c = calcSum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    console.log(`The sum of 1 and 2 is: ${c}`);
    return (
        <div>
            <h1>Blog</h1>
            <ul>
                <li><Link href="/blog/post-1">Post 1</Link></li>
                <li><Link href="/blog/post-2">Post 2</Link></li>
                <li><Link href="/blog/post-3">Post 3</Link></li>
                <li><Link href="/blog/post-4">Post 4</Link></li>
            </ul>
        </div>
    );
}