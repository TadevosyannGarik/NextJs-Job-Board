import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { jobTypes } from "@/lib/job-types";
import { Button } from "@/components/ui/button";
import { JobFilterValues, jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./form-submit-button";

async function folterJob(formData: FormData) {
  "use server";
  
  const values = Object.fromEntries(formData.entries());

  const {q, type, location, remote} = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && location !== "All Location" && { location }),
    ...(remote && { remote: remote.toString() }),
  })

  redirect(`/?${searchParams.toString()}`)
}

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

export default async function JobFilterSidebar({defaultValues}: JobFilterSidebarProps) {
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
              defaultValue={defaultValues.q}
            />
          
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">
              Type
            </Label>
            <Select id="type" name="type" defaultValue={defaultValues.type || ""}>
              <option value="">
                All type
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
            <Select id="location" name="location" defaultValue={defaultValues.location || ""}>
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
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">
              Remote jobs
            </Label>
          </div>
          <FormSubmitButton className="w-full">
            Filter jobs
          </FormSubmitButton>
        </div>
      </form>
    </aside>
  )
}