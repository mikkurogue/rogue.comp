import React, { useEffect, useRef, useState } from "react";
import { ComandPaletteProps } from "./cmd-types/types";

export default function CommandPalette({ commandGroups }: ComandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredCommands, setFilteredCommands] = useState(commandGroups);
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

  console.log(filteredCommands);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      setIsOpen(!isOpen);
    }

    if (event.key === "Escape" || event.key === "Esc") {
      event.preventDefault();
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-200/75 flex justify-center items-start pt-20">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto p-4 shadow-lg">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a command..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <ul>
          {filteredCommands.map((command, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200 rounded"
            >
              {command.group}
              <ul>
                {command.commands.map((subCommand, index) => {
                  return (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-blue-100 rounded"
                      onClick={() => {
                        subCommand.action();

                        setIsOpen(false);
                      }}
                    >
                      {subCommand.name}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
