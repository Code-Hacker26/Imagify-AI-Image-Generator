import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Result from './pages/Result';
import BuyCredit from './pages/BuyCredit';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/Appcontext';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { showLogin } = useContext(AppContext); // Correct useContext import

  return (
    <div
      className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b 
    from-teal-50 to-orange-50 flex flex-col"
    >

      <ToastContainer position="bottom-right"/>
      {/* Navbar */}
      <Navbar />

      {/* Login Modal */}
      {showLogin && <Login />}

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/buy" element={<BuyCredit />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
