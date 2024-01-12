import { JobFilterValues } from "@/lib/validation";
import JobListItem from "./job-list-item";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";

interface JobResultsProps {
  filterValue?: JobFilterValues;
}

export default async function JobResults({
  filterValue: { q = "", type = "", location = "", remote = false } = {},
}: JobResultsProps) {
  const searchString: Prisma.StringFilter | undefined = q
    ? {
        search: q.split(" ").filter((word) => word.length > 0).join(" & "),
      }
    : undefined;

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: searchString },
          { companyName: searchString },
          { type: searchString },
          { location: searchString },
          { locationType: searchString },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4 grow">
      {jobs.map((job) => (
        <Link key={job.id} href={`jobs/${job.slug}`} className="block">
          <JobListItem job={job} key={job.id} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="text-center m-auto">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
    </div>
  );
}
