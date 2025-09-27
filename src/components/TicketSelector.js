import React, { useState } from 'react';  
import { motion } from 'framer-motion';  
import { Ticket, Minus, Plus } from 'lucide-react';  
import { applyDiscount } from '../utils/helpers';  

const TicketSelector = ({ tickets, promotions, onSelect }) => {  
  const [selectedTickets, setSelectedTickets] = useState({});  
  const [promoCode, setPromoCode] = useState('');  
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });  

  const handleQuantityChange = (ticketId, quantity) => {  
    setSelectedTickets({ ...selectedTickets, [ticketId]: Math.max(0, Math.min(quantity, 5)) }); // Límite simulado  
  };  

  const totalPrice = Object.keys(selectedTickets).reduce((total, tid) => {  
    const ticket = tickets.find(t => t.id === tid);  
    const qty = selectedTickets[tid];  
    if (ticket && qty > 0) {  
      const price = applyDiscount(ticket.price, promoCode, promotions);  
      return total + (price * qty);  
    }  
    return total;  
  }, 0);  

  const handlePurchase = () => {  
    if (totalPrice > 0 && userInfo.name && userInfo.email) {  
      onSelect({ ...selectedTickets, totalPrice, userInfo, promoCode });  
      alert(`¡Compra simulada exitosa! Total: $${totalPrice.toFixed(2)}. Entradas reservadas para ${userInfo.email}.`);  
    } else {  
      alert('Completa la info y selecciona entradas.');  
    }  
  };  

  return (  
    <motion.div  
      initial={{ opacity: 0 }}  
      animate={{ opacity: 1 }}  
      className="bg-white rounded-2xl p-6 shadow-xl"  
    >  
      <h3 className="text-xl font-bold mb-4">Selecciona Entradas</h3>  
      {tickets.map((ticket) => (  
        <div key={ticket.id} className="flex justify-between items-center p-4 border-b mb-4">  
          <div>  
            <h4 className="font-semibold">{ticket.type.toUpperCase()}</h4>  
            <p>Precio: ${ticket.price} | Quedan: {ticket.quantity}</p>  
          </div>  
          <div className="flex items-center gap-2">  
            <button  
              onClick={() => handleQuantityChange(ticket.id, (selectedTickets[ticket.id] || 0) - 1)}  
              className="p-2 bg-gray-200 rounded"  
            >  
              <Minus className="w-4 h-4" />  
            </button>  
            <span className="w-8 text-center">{selectedTickets[ticket.id] || 0}</span>  
            <button  
              onClick={() => handleQuantityChange(ticket.id, (selectedTickets[ticket.id] || 0) + 1)}  
              className="p-2 bg-gray-200 rounded"  
              disabled={(selectedTickets[ticket.id] || 0) >= ticket.maxPerUser}  
            >  
              <Plus className="w-4 h-4" />  
            </button>  
          </div>  
        </div>  
      ))}  
      <div className="mb-4">  
        <input  
          type="text"  
          placeholder="Código promocional"  
          value={promoCode}  
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}  
          className="w-full p-3 border rounded-lg mb-2"  
        />  
        <p>Total: ${totalPrice.toFixed(2)}</p>  
      </div>  
      <div className="space-y-2 mb-4">  
        <input  
          type="text"  
          placeholder="Tu nombre"  
          value={userInfo.name}  
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}  
          className="w-full p-3 border rounded-lg"  
        />  
        <input  
          type="email"  
          placeholder="Tu email"  
          value={userInfo.email}  
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}  
          className="w-full p-3 border rounded-lg"  
        />  
      </div>  
      <motion.button  
        onClick={handlePurchase}  
        className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-semibold"  
        whileHover={{ scale: 1.05 }}  
      >  
        <Ticket className="w-4 h-4 inline mr-2" /> Comprar Entradas  
      </motion.button>  
    </motion.div>  
  );  
};  

export default TicketSelector;