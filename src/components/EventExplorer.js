import React, { useState } from 'react';  
import { motion } from 'framer-motion';  
import { Search, Filter } from 'lucide-react';  
import EventCard from './EventCard';  
import TicketSelector from './TicketSelector';  
import { filterEvents } from '../utils/helpers';  

const EventExplorer = ({ events, onPurchase }) => {  
  const [filters, setFilters] = useState({ category: '', date: '', location: '' });  
  const [selectedEvent, setSelectedEvent] = useState(null);  
  const [search, setSearch] = useState('');  

  const filteredEvents = filterEvents(events.filter(e =>  
    e.title.toLowerCase().includes(search.toLowerCase()) ||  
    e.description.toLowerCase().includes(search.toLowerCase())  
  ), filters);  

  return (  
    <div className="container mx-auto px-4 py-8">  
      <div className="flex gap-4 mb-8">  
        <div className="flex-1 relative">  
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />  
          <input  
            type="text"  
            placeholder="Buscar eventos..."  
            value={search}  
            onChange={(e) => setSearch(e.target.value)}  
            className="w-full pl-10 pr-4 py-3 border rounded-lg"  
          />  
        </div>  
        <div className="flex gap-2">  
          <input  
            type="date"  
            value={filters.date}  
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}  
            className="p-3 border rounded-lg"  
          />  
          <select  
            value={filters.category}  
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}  
            className="p-3 border rounded-lg"  
          >  
            <option value="">Todas categorías</option>  
            <option value="fiesta">Fiesta</option>  
            <option value="taller">Taller</option>  
          </select>  
          <input  
            type="text"  
            placeholder="Ubicación"  
            value={filters.location}  
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}  
            className="p-3 border rounded-lg"  
          />  
        </div>  
        <button className="p-3 bg-blue-500 text-white rounded-lg flex items-center gap-2">  
          <Filter className="w-4 h-4" /> Filtros  
        </button>  
      </div>  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">  
        <div className="md:col-span-2 space-y-6">  
          {filteredEvents.map((event) => (  
            <EventCard  
              key={event.id}  
              event={event}  
              onEdit={() => {}} // No editable en explorer  
              onView={() => setSelectedEvent(event)}  
            />  
          ))}  
          {filteredEvents.length === 0 && (  
            <p className="text-center text-gray-500 col-span-full">No hay eventos que coincidan. ¡Prueba otros filtros!</p>  
          )}  
        </div>  
        {selectedEvent && (  
          <div className="md:col-span-1">  
            <TicketSelector  
              tickets={selectedEvent.tickets}  
              promotions={selectedEvent.promotions}  
              onSelect={(purchase) => {  
                onPurchase({ ...purchase, eventId: selectedEvent.id });  
                setSelectedEvent(null);  
              }}  
            />  
          </div>  
        )}  
      </div>  
    </div>  
  );  
};  

export default EventExplorer;