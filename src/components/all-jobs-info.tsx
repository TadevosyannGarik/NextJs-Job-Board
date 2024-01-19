import prisma from "@/lib/prisma";
import { Button } from "./ui/button";


export default async function JobInfo() {
    const countPromise = prisma.job

    const totalResults = await countPromise.count();
    
    const freeGames = await countPromise.count({
        where: {
            locationType: "Free"
        }
    })

    const paidGames = await countPromise.count({
        where: {
            locationType: "Paid"
        }
    })

    return (
        <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[300px]">
            <form>
                <Button className="w-full rounded-none text-lg">
                    Total games - {totalResults}
                </Button>
                <Button className="rounded-none w-full text-lg">
                    Free games - {freeGames}
                </Button>
                <Button className="rounded-none w-full text-lg">
                    Paid games - {paidGames}
                </Button>
            </form>
        </aside>
    );
}
