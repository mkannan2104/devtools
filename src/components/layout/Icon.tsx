import React from "react";
import * as Lucide from "lucide-react";

interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = "", size = 20, ...props }) => {
  // Map string to Lucide component
  const LucideIcon = (Lucide as any)[name];

  if (!LucideIcon) {
    // Fallback icon
    return <Lucide.FileCode className={className} size={size} {...props} />;
  }

  return <LucideIcon className={className} size={size} {...props} />;
};

export default Icon;
