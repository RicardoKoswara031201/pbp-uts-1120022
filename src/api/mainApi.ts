import type { File } from "../types/file";

const BASE_URL = "/api";

export async function getBook(): Promise<File[]> {
  const res = await fetch(`${BASE_URL}/buku`);

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "Failed to fetch books");
  }

  const json = await res.json();
  return json.data;
}

export async function getBookById(id: string): Promise<File> {
  const res = await fetch(`${BASE_URL}/buku/${id}`);

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "Book not found");
  }

  const json = await res.json();
  return json.data;
}

export async function updateBook(id: string, data: File): Promise<File> {
  const res = await fetch(`${BASE_URL}/buku/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      judul: data.judul,
      deskripsi: data.deskripsi,
      tahun: Number(data.tahun),
      kategori: data.kategori,
    }),
  });

  let text;
  try {
    text = await res.text();
    const json = JSON.parse(text);
    if (!res.ok) throw new Error(json.message || "Gagal update buku");
    return json.data;
  } catch (err) {
    if (!res.ok) throw new Error(text || "Gagal update buku");
    throw err;
  }
}

export async function borrowBook(id: string, nama: string): Promise<File> {
  if (!nama) throw new Error("Nama peminjam tidak boleh kosong");
  const res = await fetch(`${BASE_URL}/buku/${id}/pinjam`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ peminjam: nama }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Gagal meminjam buku");
  }
  const json = await res.json();
  return json.data;
}

export async function returnBook(id: string): Promise<File> {
  const res = await fetch(`${BASE_URL}/buku/${id}/pinjam`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ peminjam: "" }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Gagal mengembalikan buku");
  }
  const json = await res.json();
  return json.data;
}