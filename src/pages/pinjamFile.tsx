import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, borrowBook, returnBook } from "../api/mainApi";
import PinjamCard from "../components/pinjamCard";

interface Buku {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: string;
  peminjam: string;
  imageUrl: string;
}

function fileToBuku(file: any): Buku {
  return {
    id: file.id!,
    judul: file.judul || "",
    deskripsi: file.deskripsi || "",
    kategori: file.kategori || "",
    peminjam: file.peminjam || "",
    imageUrl: file.imageUrl || "",
  };
}

export default function Pinjam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [buku, setBuku] = useState<Buku | null>(null);
  const [loading, setLoading] = useState(true);
  const [peminjam, setPeminjam] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getBookById(id)
      .then((data) => setBuku(fileToBuku(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

const handlePinjam = async () => {
  if (!buku) return;
  if (buku.peminjam) {
    await returnBook(buku.id);
    setBuku({ ...buku, peminjam: "" });
  } else {
    const nama = prompt("Masukkan nama peminjam") || "";
    if (!nama) return;
    await borrowBook(buku.id, nama);
    setBuku({ ...buku, peminjam: nama });
  }
};

  const handleKembalikan = async () => {
    if (!id || !buku) return;
    setIsSubmitting(true);
    setError("");
    try {
      const updatedBook = await returnBook(id);
      setBuku(fileToBuku(updatedBook));
      navigate(`/buku/${id}`);
    } catch (err: any) {
      setError(err.message || "Gagal mengembalikan buku");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!buku) return <p>Buku tidak ditemukan</p>;

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <PinjamCard buku={buku} />

      <div style={{ marginTop: 10 }}>
        {buku.peminjam ? (
          <button onClick={handleKembalikan} disabled={isSubmitting}>
            {isSubmitting ? "Memproses..." : "Kembalikan Buku"}
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Nama peminjam"
              value={peminjam}
              onChange={(e) => setPeminjam(e.target.value)}
              disabled={isSubmitting}
            />
            <button onClick={handlePinjam} disabled={isSubmitting}>
              {isSubmitting ? "Memproses..." : "Pinjam Buku"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}