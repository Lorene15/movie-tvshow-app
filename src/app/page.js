import { Box, Button } from "@mui/joy";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="container">
        <h1 style={{ textAlign: "center" }}>WOULD YOU LIKE :</h1>
        <Box
          sx={{
            width: 200,
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey",
            "&:hover": {
              bgcolor: "grey",
            },
          }}
        >
          <Button color="success">
            <Link href="/Movie">Movie app</Link>
          </Button>
        </Box>
        <h1 style={{ textAlign: "center" }}>OR</h1>
        <Box
          sx={{
            width: 200,
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey",
            "&:hover": {
              bgcolor: "grey",
            },
          }}
        >
          <Button color="primary">
            <Link href="/TvShow">TvShow app</Link>
          </Button>
        </Box>
      </div>
    </div>
  );
}
