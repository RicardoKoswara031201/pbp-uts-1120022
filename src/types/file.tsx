export type Kategori = "majalah" | "komik" | "novel";
export type Status = "available" | "borrow"

export interface File {
  id?: string;
  judul: string;
  deskripsi: string;
  tahun: number;
  kategori: Kategori;
  status: Status;
  peminjam: {nama:string} | null;
  imageUrl: string;
}