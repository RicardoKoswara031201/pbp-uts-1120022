import { BrowserRouter, Routes, Route } from "react-router-dom";
import TampilanFile from "./pages/tampilanFile";
import PinjamFile from "./pages/pinjamFile";
import UpdateFile from "./pages/updateFile";

export default function App() {
  return (
    <BrowserRouter>
      <h1>Daftar Buku</h1>

      <Routes>
        <Route path="/" element={<TampilanFile />} />
        <Route path="/pinjam/:id" element={<PinjamFile />} />
        <Route path="/update/:id" element={<UpdateFile />} />
      </Routes>
    </BrowserRouter>
  );
}