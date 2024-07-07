import React, { useEffect, useRef, useState } from "react";
import { ComandPaletteProps, Command, CommandGroup } from "./cmd-types/types";

export default function CommandPalette({ commandGroups }: ComandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredCommands, setFilteredCommands] =
    useState<CommandGroup[]>(commandGroups);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef?.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const filteredGroups = commandGroups
      .map((group) => ({
        group: group.group,
        commands: group.commands.filter((command) =>
          command.name.toLowerCase().includes(query.toLowerCase()),
        ),
      }))
      .filter((group) => group.commands.length > 0);

    setFilteredCommands(filteredGroups);
  }, [query, commandGroups]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      setIsOpen(!isOpen);
    }

    if (event.key === "Enter" && isOpen) {
      event.preventDefault();
      const top = getTop(filteredCommands);
      if (top) {
        top.action();
        setIsOpen(false);
      }
    }

    if (event.key === "Escape" || event.key === "Esc") {
      setIsOpen(false);
    }
  };

  const getTop = (groups: CommandGroup[]): Command | undefined => {
    for (const group of groups) {
      if (group.commands.length > 0) {
        return group.commands[0];
      }
    }
    return undefined;
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, filteredCommands]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleCommandClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-200/75 flex justify-center items-start pt-20">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto p-4 shadow-lg">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a command..."
          value={query}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <ul>
          {filteredCommands.map((group, groupIndex) => (
            <li key={groupIndex} className="mb-2">
              <h3 className="font-bold">{group.group}</h3>
              <ul>
                {group.commands.map((command, commandIndex) => (
                  <li
                    key={commandIndex}
                    className="p-2 cursor-pointer hover:bg-gray-200 rounded"
                    onClick={() => handleCommandClick(command.action)}
                  >
                    {command.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
