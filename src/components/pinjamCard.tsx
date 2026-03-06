interface Props {
  buku: {
    id: string;
    judul: string;
    deskripsi: string;
    kategori: string;
    peminjam: string;
    imageUrl: string;
  };
}

export default function PinjamCard({ buku }: Props) {
  return (
    <div style={{ border: "1px solid gray", padding: 10, margin: 10 }}>
      <h2>{buku.judul}</h2>
      <p>{buku.deskripsi}</p>
      <p>Kategori: {buku.kategori}</p>
      <p>Peminjam: {buku.peminjam || "-"}</p>
      {buku.peminjam && <p style={{ color: "green" }}>Buku sedang dipinjam</p>}
    </div>
  );
}