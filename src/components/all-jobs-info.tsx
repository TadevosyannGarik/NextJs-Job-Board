import prisma from "@/lib/prisma";


export default async function JobInfo() {

    const countPromise = prisma.job

    const totalResults = await countPromise.count();

    return (
        <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[300px]">
            <form>
                <div className="text-center text-2xl bg-primary text-white p-5 rounded-lg">
                    All games count
                </div>
                <div className="text-center text-xl font-bold pt-12 pb-14">
                    {totalResults}
                </div>
            </form>
        </aside>
    );
}
