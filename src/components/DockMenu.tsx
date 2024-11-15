import React from "react";
// import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { ModeToggle } from "@/components/mode-toggle";
import { Dock, DockIcon } from "./ui/dock";
import Project from "../assets/project-1.svg";
import Temp from "../assets/projectTemp.svg";
import Promp from "../assets/prompt.svg";
import Lib from "../assets/library.svg";
import Comp from "../assets/user-info.svg";
export type IconProps = React.HTMLAttributes<SVGElement>;

const DATA = {
  navbar: [
    { href: "#", icon: Project, label: "Project Information" },
    { href: "#", icon: Temp, label: "Template" },
    // { href: "#", icon: FileInput, label: "Porject Information" },
    // { href: "#", icon: FileInput, label: "Template" },
  ],
  contact: {
    social: {
      Prompt: {
        name: "Prompt",
        url: "#",
        icon: Promp,
      },
      Library: {
        name: "Library",
        url: "#",
        icon: Lib,
      },
      // Prompt: {
      //   name: "Prompt",
      //   url: "#",
      //   icon: MessageSquare,
      // },
      // Library: {
      //   name: "Library",
      //   url: "#",
      //   icon: BookOpen,
      // },
    },
    other: {
      CompanyInfo: {
        name: "Company Info",
        url: "#",
        icon: Comp,
      },
      // CompanyInfo: {
      //   name: "Company Info",
      //   url: "#",
      //   icon: Building,
      // },
    },
  },
};
type prop = {
  setActiveModal: React.Dispatch<React.SetStateAction<string | null>>;
};
const DockMenu = ({ setActiveModal }: prop) => {
  const handleTopItemClick = (text: string | null) => {
    setActiveModal((prev: string | null) => (prev === text ? null : text));
  };
  return (
    <div>
      <TooltipProvider>
        <Dock direction="middle">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  > */}
                  <img
                    src={item.icon}
                    className="size-8  text-white"
                    onClick={() => handleTopItemClick(item.label)}
                  />
                  {/* <item.icon className="size-6  text-white" /> */}
                  {/* </Link> */}
                </TooltipTrigger>
                <TooltipContent className="bg-[#2a2a2a]">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* <Link
                    href={social.url}
                    aria-label={social.name}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  > */}
                  {/* <social.icon className="size-6  text-white" /> */}
                  <img
                    src={social.icon}
                    className="size-8  text-white"
                    onClick={() => handleTopItemClick(name)}
                  />
                  {/* </Link> */}
                </TooltipTrigger>
                <TooltipContent className="bg-[#2a2a2a]">
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full py-2" />
          {Object.entries(DATA.contact.other).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* <Link
                    href={social.url}
                    aria-label={social.name}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  > */}
                  {/* <social.icon className="size-6  text-white" /> */}
                  <img
                    src={social.icon}
                    className="size-8  text-white"
                    onClick={() => handleTopItemClick("Company Information")}
                  />
                  {/* </Link> */}
                </TooltipTrigger>
                <TooltipContent className="bg-[#2a2a2a]">
                  <p>Company Information</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
    </div>
  );
};

export default DockMenu;
