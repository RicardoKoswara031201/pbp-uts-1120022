import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById, updateBook } from "../api/mainApi";
import BookForm from "../components/bookForm";
import type { File } from "../types/file";

export default function UpdateFile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getBookById(id)
      .then((data) => setBook(data))
      .catch((err) => alert("Gagal mengambil data buku: " + err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Buku tidak ditemukan</p>;

  return (
    <BookForm
      initialData={book}
      onSubmit={async (data) => {
        if (!id) return;
        await updateBook(id, data);
        navigate("/");
      }}
    />
  );
}