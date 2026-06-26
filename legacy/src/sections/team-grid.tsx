"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, MessageCircle, Globe, Crown, Code, Bug, Palette, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@/types";

interface TeamGridProps {
  members: TeamMember[];
}

const roleConfig: Record<string, { icon: typeof Code; color: string; label: string }> = {
  LEADER: { icon: Crown, color: "from-purple-500/20 to-purple-600/20 text-purple-400", label: "Leader" },
  DEVELOPER: { icon: Code, color: "from-blue-500/20 to-blue-600/20 text-blue-400", label: "Developer" },
  TESTER: { icon: Bug, color: "from-green-500/20 to-green-600/20 text-green-400", label: "Tester" },
  DESIGNER: { icon: Palette, color: "from-pink-500/20 to-pink-600/20 text-pink-400", label: "Designer" },
  CONTRIBUTOR: { icon: User, color: "from-orange-500/20 to-orange-600/20 text-orange-400", label: "Contributor" },
};

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const role = roleConfig[member.role];
  const RoleIcon = role.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group glass border-white/5 hover:border-white/10 transition-all duration-300 hover-lift overflow-hidden h-full">
        <CardContent className="p-0">
          {/* Avatar Section */}
          <div className={`relative h-48 bg-gradient-to-br ${role.color} overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white/10 group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border-4 border-white/10 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold">{member.name[0]}</span>
                </div>
              )}
            </div>
            
            {/* Role Badge */}
            <div className="absolute top-4 right-4">
              <Badge className={`bg-gradient-to-r ${role.color} border-0`}>
                <RoleIcon className="w-3 h-3 mr-1" />
                {role.label}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-400 transition-colors">
              {member.name}
            </h3>
            
            {member.bio && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {member.bio}
              </p>
            )}

            {/* Social Links */}
            <div className="flex gap-2">
              {member.github && (
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" asChild>
                  <Link href={member.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                  </Link>
                </Button>
              )}
              {member.twitter && (
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" asChild>
                  <Link href={member.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4" />
                  </Link>
                </Button>
              )}
              {member.telegram && (
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" asChild>
                  <Link href={member.telegram} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" />
                  </Link>
                </Button>
              )}
              {member.website && (
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" asChild>
                  <Link href={member.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function TeamGrid({ members }: TeamGridProps) {
  if (members.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Team members coming soon</h3>
            <p className="text-muted-foreground">
              We are working on updating our team page. Check back later!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
