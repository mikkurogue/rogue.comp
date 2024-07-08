import React from "react";
import { CommandGroup } from "./cmd-types/types";
import { useRouter } from "next/router";
import CommandPalette from "./core/CommandPalette";

export default function Wrapper() {
  const router = useRouter();

  const commands: CommandGroup[] = [
    {
      group: "Navigation",
      commands: [
        {
          name: "Home",
          action() {
            router.push("/");
          },
        },
        {
          name: "About",
          action() {
            router.push("/about");
          },
        },
      ],
    },
  ];

  return <CommandPalette commandGroups={commands} />;
}
