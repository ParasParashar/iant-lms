import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center bg-secondary">
      <h2 className="text-2xl p-4  font-serif  text-muted-foreground">
        This is not valid route or page.
      </h2>
      <p className="text-lg text-muted-foreground">
        Could not find requested resource
      </p>
      <Button variant="link" size="sm">
        View <Link href="/home">Home</Link>
      </Button>
    </div>
  );
}
