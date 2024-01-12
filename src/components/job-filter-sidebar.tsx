import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { jobTypes } from "@/lib/job-types";
import { Button } from "@/components/ui/button";
import { jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

async function folterJob(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const {q, type, location, remote} = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote  && { remote: "true" })
  })

  redirect(`/?${searchParams.toString()}`)
}

export default async function JobFilterSidebar() {
  const distinctLocation = (await prisma?.job.findMany({
    where: {
      approved: true
    },
    select: {
      location: true
    },
    distinct: ["location"]
  })
  .then(location => 
    location.map(({location}) => location).filter(Boolean)  
  )) as string[];
  
  return (
    <aside className="md:w-[260px] p-4 sticky top-0 h-fit bg-background border rounded-lg">
      <form action={folterJob}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">
              Search
            </Label>
            <Input
              id="q"
              name="q" 
              placeholder="Title, company, etc."
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">
              Type
            </Label>
            <Select id="type" name="type" defaultValue="">
              <option value="">
                All Location
              </option>
              {jobTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">
              Location
            </Label>
            <Select id="location" name="location" defaultValue="">
              <option>
                All Location
              </option>
              {distinctLocation.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="remote"
              className="scale-125 accent-slate-900"
            />
            <Label htmlFor="remote">
              Remote jobs
            </Label>
          </div>
          <Button type="submit" className="w-full">
            Filter jobs
          </Button>
        </div>
      </form>
    </aside>
  )
}