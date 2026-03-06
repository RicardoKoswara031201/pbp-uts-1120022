import type { File } from "../types/file";
import { useState, useEffect } from "react";

export default function BookForm({
  initialData,
  onSubmit,
}: {
  initialData: File;
  onSubmit: (data: File) => Promise<void>;
}) {
  const [form, setForm] = useState<File>({
    ...initialData,
    judul: initialData.judul || "",
    deskripsi: initialData.deskripsi || "",
    tahun: initialData.tahun || 0,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.judul || !form.deskripsi || !form.tahun) {
      setError("Form tidak boleh kosong");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(form);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat update");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Judul</label>
        <input name="judul" value={form.judul} onChange={handleChange} />
      </div>

      <div>
        <label>Deskripsi</label>
        <input name="deskripsi" value={form.deskripsi} onChange={handleChange} />
      </div>

      <div>
        <label>Tahun</label>
        <input name="tahun" value={form.tahun} onChange={handleChange} />
      </div>

      <div>
        <label>Kategori</label>
        {["komik", "majalah", "novel"].map((k) => (
          <label key={k}>
            <input
              type="radio"
              name="kategori"
              value={k}
              checked={form.kategori === k}
              onChange={handleChange}
            />
            {k.charAt(0).toUpperCase() + k.slice(1)}
          </label>
        ))}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "SAVE"}
      </button>
    </form>
  );
}