import React from "react";
import type { LucideProps } from "lucide-react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Braces,
  CheckCircle,
  Columns,
  Database,
  Eye,
  FileCode,
  FileText,
  Fingerprint,
  Key,
  Regex,
} from "lucide-react";

const ICON_MAP = {
  ArrowDownLeft,
  ArrowUpRight,
  Braces,
  CheckCircle,
  Columns,
  Database,
  Eye,
  FileCode,
  FileText,
  Fingerprint,
  Key,
  Regex,
} as const;

type IconName = keyof typeof ICON_MAP;

interface IconProps extends LucideProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({
  name,
  className = "",
  size = 20,
  ...props
}) => {
  const LucideIcon = ICON_MAP[name as IconName] ?? FileCode;
  return <LucideIcon className={className} size={size} {...props} />;
};

export default Icon;
