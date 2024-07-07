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
