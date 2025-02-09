import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="max-w-7xl mx-auto p-5 w-full flex-1 flex items-center justify-center flex-col gap-5">
      <Image
        src="/in-construction.svg"
        alt="Product"
        width={500}
        height={500}
      />
      <p className="text-xl max-w-2xl text-center">
        Oops! It looks like this page doesn{"'"}t exist or is currently under
        construction. We{"'"}re working hard to get it up and running soon.
        Thanks for your patience!
      </p>
      <Link className={buttonVariants()} href="/">
        Go back to home page
      </Link>
    </div>
  );
}
