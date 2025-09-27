import React from 'react';  
import { motion } from 'framer-motion';  
import { Calendar, MapPin, Users, Ticket } from 'lucide-react';  
import { formatDate } from '../utils/helpers';  

const EventCard = ({ event, onEdit, onView }) => {  
  const availableTickets = event.tickets.reduce((sum, t) => sum + t.quantity, 0);  

  return (  
    <motion.div  
      whileHover={{ scale: 1.05 }}  
      className={`rounded-2xl p-6 shadow-lg ${event.customStyle || 'bg-gradient-to-r from-blue-500 to-purple-500'} text-white cursor-pointer`}  
      onClick={() => onView(event)}  
    >  
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-2xl mb-4" />  
      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>  
      <p className="mb-4 text-blue-100">{event.description.substring(0, 100)}...</p>  
      <div className="flex items-center gap-2 mb-2">  
        <Calendar className="w-4 h-4" />  
        <span>{formatDate(event.date)}</span>  
      </div>  
      <div className="flex items-center gap-2 mb-2">  
        <MapPin className="w-4 h-4" />  
        <span>{event.location}</span>  
      </div>  
      <div className="flex items-center gap-2 mb-4">  
        <Users className="w-4 h-4" />  
        <span>Aforo: {event.capacity} | Disponibles: {availableTickets}</span>  
      </div>  
      <div className="flex justify-between items-center">  
        <span className="flex items-center gap-2">  
          <Ticket className="w-4 h-4" /> Categoría: {event.category}  
        </span>  
        <button  
          onClick={(e) => { e.stopPropagation(); onEdit(event); }}  
          className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold"  
        >  
          Editar  
        </button>  
      </div>  
    </motion.div>  
  );  
};  

export default EventCard;