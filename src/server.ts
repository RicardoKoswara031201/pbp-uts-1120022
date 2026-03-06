import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

type Buku = {
  id: string;
  judul: string;
  deskripsi: string;
  tahun: number;
  kategori: string;
  peminjam: string;
  imageUrl: string;
};

let bukuList: Buku[] = [
  { id: "1", judul: "Naruto", deskripsi: "Komik Ninja", tahun: 2000, kategori: "komik", peminjam: "", imageUrl: "" },
  { id: "2", judul: "Majalah Science", deskripsi: "Majalah sains", tahun: 2022, kategori: "majalah", peminjam: "", imageUrl: "" }
];

app.put("/api/buku/:id", (req, res) => {
  const idx = bukuList.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Buku tidak ditemukan" });

  const { judul, deskripsi, tahun, kategori } = req.body;
  bukuList[idx] = { ...bukuList[idx], judul, deskripsi, tahun: Number(tahun), kategori };
  res.json({ success: true, data: bukuList[idx] });
});

app.post("/api/buku/:id/pinjam", (req, res) => {
  const idx = bukuList.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Buku tidak ditemukan" });

  const { peminjam } = req.body;
  bukuList[idx].peminjam = peminjam || "";
  res.json({ success: true, data: bukuList[idx] });
});

const PORT = 5174;
app.listen(PORT, () => console.log(`Backend lokal jalan di http://localhost:${PORT}`));