type Props = {
  level?: "low" | "medium" | "high"; // 👈 optional now
};

export default function SeverityBadge({ level }: Props) {
  const safeLevel = level || "low"; // 👈 fallback

  const colors = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  return (
    <span className={`px-3 py-1 text-white rounded ${colors[safeLevel]}`}>
      {safeLevel.toUpperCase()}
    </span>
  );
}