import { Metadata } from "next";
import { TeamGrid } from "@/sections/team-grid";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Team | DeadZone",
  description: "Meet the talented team behind DeadZone and DeadZone.",
};

async function getTeamMembers() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: [
        { role: "asc" },
        { order: "asc" },
      ],
    });
    return members;
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-blue-400 font-medium mb-4 block">Our Team</span>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Meet the Minds Behind DeadZone
          </h1>
          <p className="text-lg text-muted-foreground">
            A passionate group of developers, designers, and enthusiasts dedicated to 
            creating the best Android experience for MediaTek devices.
          </p>
        </div>
      </div>

      <TeamGrid members={members} />
    </div>
  );
}
