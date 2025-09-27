import React, { useState, useEffect } from 'react';  
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';  
import { motion } from 'framer-motion';  
import { Home, Settings, User } from 'lucide-react';  
import AdminDashboard from './components/AdminDashboard.js';  
import EventExplorer from './components/EventExplorer.js';  
import { mockEvents } from './mock/events.js';  

function App() {  
  const [events, setEvents] = useState([]);  
  const [purchases, setPurchases] = useState([]);  

  useEffect(() => {  
    // Carga inicial de mocks y simula localStorage  
    const savedEvents = localStorage.getItem('events');  
    setEvents(savedEvents ? JSON.parse(savedEvents) : mockEvents);  
  }, []);  

  useEffect(() => {  
    localStorage.setItem('events', JSON.stringify(events));  
  }, [events]);  

  const handlePurchase = (purchaseData) => {  
    setPurchases([...purchases, { ...purchaseData, id: Date.now() }]);  
    // Actualiza cantidades de tickets en el evento  
    const event = events.find(e => e.id === purchaseData.eventId);  
    if (event) {  
      const updatedTickets = event.tickets.map(t => {  
        const qty = purchaseData[t.id] || 0;  
        return qty > 0 ? { ...t, quantity: t.quantity - qty } : t;  
      });  
      setEvents(events.map(e => e.id === purchaseData.eventId ? { ...e, tickets: updatedTickets, attendees: [...e.attendees, purchaseData.userInfo.email] } : e));  
    }  
  };  

  return (  
    <Router>  
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">  
        <nav className="bg-white shadow-lg">  
          <div className="container mx-auto px-4">  
            <div className="flex justify-between items-center py-4">  
              <Link to="/" className="text-2xl font-bold text-indigo-600">EventHub</Link>  
              <div className="hidden md:flex space-x-8">  
                <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded ${isActive ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>  
                  <Home className="w-4 h-4" /> Explorar  
                </NavLink>  
                <NavLink to="/admin" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded ${isActive ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>  
                  <Settings className="w-4 h-4" /> Admin  
                </NavLink>  
                <NavLink to="/profile" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded ${isActive ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}>  
                  <User className="w-4 h-4" /> Mis Compras  
                </NavLink>  
              </div>  
            </div>  
          </div>  
        </nav>  

        <Routes>  
          <Route path="/" element={<EventExplorer events={events} onPurchase={handlePurchase} />} />  
          <Route path="/admin" element={<AdminDashboard events={events} setEvents={setEvents} />} />  
          <Route path="/profile" element={  
            <div className="container mx-auto px-4 py-8">  
              <h1 className="text-3xl font-bold mb-8">Mis Compras</h1>  
              {purchases.length === 0 ? (  
                <p>No has comprado nada aún. ¡Explora eventos!</p>  
              ) : (  
                <div className="space-y-4">  
                  {purchases.map((p, i) => (  
                    <motion.div key={i} className="bg-white p-6 rounded-2xl shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>  
                      <p>Evento ID: {p.eventId}</p>  
                      <p>Total: ${p.totalPrice}</p>  
                      <p>Email: {p.userInfo.email}</p>  
                    </motion.div>  
                  ))}  
                </div>  
              )}  
            </div>  
          } />  
        </Routes>  

        {/* Mobile nav simulada */}  
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">  
          <Link to="/" className="flex flex-col items-center text-gray-600">  
            <Home className="w-6 h-6" /> Explorar  
          </Link>  
          <Link to="/admin" className="flex flex-col items-center text-gray-600">  
            <Settings className="w-6 h-6" /> Admin  
          </Link>  
          <Link to="/profile" className="flex flex-col items-center text-gray-600">  
            <User className="w-6 h-6" /> Perfil  
          </Link>  
        </div>  
      </div>  
    </Router>  
  );  
}  

export default App;