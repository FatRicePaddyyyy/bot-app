"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  PieChart,
  SquareTerminal,
  Twitter,
} from "lucide-react";
import { signOut } from "next-auth/react";

import { NavMain } from "~/components/nav-main";
import { NavProjects } from "~/components/nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import { Button } from "./ui/button";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "ダッシュボード",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "単発ツイートの作成",
      url: "/dashboard/tweet",
      icon: Frame,
    },
    {
      name: "定期ツイートの作成",
      url: "#",
      icon: PieChart,
    },
    {
      name: "プロンプトの管理",
      url: "/dashboard/prompt",
      icon: Map,
    },
    {
      name: "ツイッターアカウントの設定",
      url: "#",
      icon: Map,
    },
    {
      name: "apiの設定",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-[spin_3s_linear_infinite] rounded-full border-2 border-t-transparent" />
            <div className="p-2">
              <Twitter className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <Button variant="outline" onClick={() => signOut()}>
          <LogOut />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
