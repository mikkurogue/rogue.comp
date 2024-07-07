import { ReactNode } from "react";

export type ComandPaletteProps = {
  commandGroups: CommandGroup[];
};

export type CommandGroup = {
  group: string;
  commands: Command[];
};

export type Command = {
  name: string;
  action: () => void;
};

export type CommandCompProps = {
  icon: ReactNode;
  label: string;
};
