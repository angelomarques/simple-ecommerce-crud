import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="max-w-7xl mx-auto p-5 w-full flex-1">
      <h1 className="text-2xl font-bold">Order placed successfully</h1>

      <p className="text-slate-400 mt-3">
        Thank you for your purchase. We will send you an email with the order
        details.
      </p>

      <Link href="/" className={buttonVariants({ className: "mt-5" })}>
        Go to Home
      </Link>
    </main>
  );
}
