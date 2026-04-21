// components/SectionCard.tsx

type Issue = {
  message: string;
  severity?: "low" | "medium" | "high";
};

type Props = {
  title: string;
  items: (string | Issue)[];
};

export default function SectionCard({ title, items }: Props) {
  return (
  <div className="rounded-2xl backdrop-blur-md bg-white/80 border border-gray-200 shadow-md p-5 hover:shadow-xl transition">
  <h3 className="text-lg font-semibold text-gray-800 mb-3">
    {title}
  </h3>

  {items.length === 0 ? (
    <p className="text-gray-400 text-sm">Nothing found ✅</p>
  ) : (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="p-3 bg-white rounded-xl border hover:bg-gray-50 transition"
        >
          {typeof item === "string" ? item : item.message}
        </li>
      ))}
    </ul>
  )}
</div>
  );
}