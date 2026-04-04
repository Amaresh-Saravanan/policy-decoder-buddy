import { cn } from "@/lib/utils";

type RiskLevel = "low" | "medium" | "high";

const config: Record<RiskLevel, { label: string; className: string }> = {
  low: { label: "Low Risk", className: "bg-success/10 text-success border-success/20" },
  medium: { label: "Medium Risk", className: "bg-warning/10 text-warning border-warning/20" },
  high: { label: "High Risk", className: "bg-danger/10 text-danger border-danger/20" },
};

const RiskBadge = ({ level, className }: { level: RiskLevel; className?: string }) => {
  const { label, className: badgeClass } = config[level];
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border", badgeClass, className)}>
      {level === "high" ? "🔴" : level === "medium" ? "🟡" : "🟢"} {label}
    </span>
  );
};

export default RiskBadge;
