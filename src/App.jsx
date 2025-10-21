import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Header from "./shared/Header";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
