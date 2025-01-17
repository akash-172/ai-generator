import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost, GenerateAudio } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-28 object-contain" />
        </Link>
        <div>
          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 mx-2 rounded-md hover:shadow-md"
          >
            Image
          </Link>
          <Link
            to="/generate-audio"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md hover:shadow-md"
          >
            Audio
          </Link>
        </div>
      </header>
      <main className="sm:px-8 px-4 py-4 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/generate-audio" element={<GenerateAudio />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
