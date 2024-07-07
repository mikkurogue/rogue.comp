import React from "react";
import { CommandCompProps } from "./cmd-types/types";

export default function CommandComp({ icon, label }: CommandCompProps) {
  return (
    <div className="flex rounded p-3 bg-blue-100">
      {icon} {label}
    </div>
  );
}
