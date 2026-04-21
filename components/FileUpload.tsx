"use client";

type Props = {
  setCode: (value: string) => void;
};

export default function FileUpload({ setCode }: Props) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCode(content); // ✅ fill editor automatically
    };

    reader.readAsText(file);
  };

  return (
    <div className="mt-4">
      <input
        type="file"
        accept=".js,.ts,.py,.java,.cpp"
        onChange={handleFile}
        className="block"
      />
    </div>
  );
}