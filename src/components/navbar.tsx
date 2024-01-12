import Link from "next/link";
import { CircleDollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="">
      <nav className="w-full m-auto py-5 flex items-center justify-between border">
        <Link
          href="/" className="flex items-center gap-3 pl-10"
        >
          <CircleDollarSign size={30} />
          <span className="text-xl font-bold tracking-tight ">
            Flow Jobs
          </span>
        </Link>
        <div className="pr-10">
        <Button asChild>
          <Link href="/jobs/new">
            Post a job
          </Link>
        </Button>
        </div>
      </nav>
    </header>
  )
}