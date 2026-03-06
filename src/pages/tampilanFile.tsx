import { useEffect, useState } from "react";
import { getBook, borrowBook } from "../api/mainApi";
import type { File } from "../types/file";
import { useNavigate } from "react-router-dom";

export default function TampilanFile() {
  const [books, setBooks] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBook()
      .then(setBooks)
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to fetch books");
      });
  }, []);

  async function handleBorrow(id: string) {
    const nama = prompt("Masukkan nama peminjam:");
    if (!nama) return;

    try {
      await borrowBook(id, nama);
      alert("Buku berhasil dipinjam");
    } catch {
      alert("Gagal meminjam buku");
    }
  }

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Daftar Buku</h2>

      {books.map((book) => (
        <div key={book.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <h3>{book.judul}</h3>
          <p>{book.deskripsi}</p>
          <p>Tahun: {book.tahun}</p>
          <p>Kategori: {book.kategori}</p>
          <p>Status: {book.status}</p>

          <button onClick={() => navigate(`/update/${book.id}`)}>
            Update
          </button>

          <button onClick={() => handleBorrow(book.id!)}>
            Pinjam
          </button>
        </div>
      ))}
    </div>
  );
}