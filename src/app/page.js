import { Button } from "@mui/joy";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Button
        color="neutral"
        size="lg"
        variant="solid"
        style={{ width: "500px", height: "300px" }}
      >
        <Link href="/Movie">Movie app</Link>
      </Button>
      <Button
        color="neutral"
        size="lg"
        variant="solid"
        style={{ width: "500px", height: "300px" }}
      >
        <Link href="/TvShow">TvShow app</Link>
      </Button>
    </div>
  );
}
