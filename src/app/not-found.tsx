import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="max-w-7xl mx-auto p-5 w-full flex-1 flex items-center justify-center flex-col gap-5">
      <p className="text-4xl">Sorry! Page Not Found...</p>
      <Link className={buttonVariants()} href="/">
        Go back to home page
      </Link>
    </div>
  );
}
