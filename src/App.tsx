import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import WhyMRG from './pages/WhyMRG';
import Contact from './pages/Contact';
import Consultation from './pages/Consultation';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-mrg" element={<WhyMRG />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/consultation" element={<Consultation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
