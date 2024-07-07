import React from "react";
import CommandPalette from "./command-palette";
import { useRouter } from "next/router";
import { CommandGroup } from "./cmd-types/types";

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
