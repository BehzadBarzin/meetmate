import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-extrabold m-6 ">Hello World!</h1>
      <Button>Click Me!</Button>
    </main>
  );
}
