import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <h1>KFC</h1>
      
      {/* <Navbar /> */}

      <Routes>
        {/* <Route path="/" element={<ListMenu />} />
        <Route path="/add" element={<AddMenu />} />
        <Route path="/update/:id" element={<UpdateMenu />} /> */}
      </Routes>
    </BrowserRouter>
  );
}