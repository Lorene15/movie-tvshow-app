import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>
        <Link href="/Movie">Movie app</Link>
      </div>
      <div>
        <Link href="/TvShow">TvShow app</Link>
      </div>
    </div>
  );
}
