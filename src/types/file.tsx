export type Kategori = "majalah" | "komik" | "novel";
export type Status = "available" | "borrow"

export interface File {
  id?: string;
  judul: string;
  deskripsi: string;
  tahun: string;
  kategori: Kategori;
  status: Status;
  peminjam: string;
  imageUrl: string;
}