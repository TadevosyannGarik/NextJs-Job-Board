"use client";
import { Button } from "@/components/ui/button";
import { Swords } from 'lucide-react';
import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";


export default function Navbar() {
  	return (
    	<header className="">
      		<nav className="w-full m-auto py-5 flex items-center justify-between border-b">
        		<Link
          			href="/" className="flex items-center gap-3 pl-10"
        		>
          			<Swords size={30} />
          			<span className="text-xl font-bold tracking-tight ">
            			Flow Games
          			</span>
        		</Link>
        		<div className="pr-10">
        			<ThemeToggleButton />
        			<Button asChild>
          				<Link href="/jobs/new">
            				Post a game
          				</Link>
        			</Button>
        		</div>
      		</nav>
    	</header>
  	)
}