import Image from "next/image";
import Link from "next/link";

// Home Component
function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Link href="/about" className="flex flex-col items-center gap-4">
          About
        </Link>
        <Link href="/contact" className="flex flex-col items-center gap-4">
          Contact
        </Link>
      </main>
    </div>
  );
}

// Export only one default component
export default Home;