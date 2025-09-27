import React, { useState } from 'react';  
import { motion } from 'framer-motion';  
import { Plus, LayoutDashboard } from 'lucide-react';  
import EventForm from './EventForm';  
import EventCard from './EventCard';  
import { mockEvents, duplicateEvent } from '../mock/events'; // Importa mock inicial  
import { generateUniqueId } from '../utils/helpers';  

const AdminDashboard = ({ events, setEvents }) => {  
  const [showForm, setShowForm] = useState(false);  
  const [editingEvent, setEditingEvent] = useState(null);  
  const [viewingEvent, setViewingEvent] = useState(null);  

  const handleSaveEvent = (eventData) => {  
    if (editingEvent) {  
      setEvents(events.map(e => e.id === editingEvent.id ? eventData : e));  
    } else {  
      setEvents([...events, eventData]);  
    }  
    setShowForm(false);  
    setEditingEvent(null);  
    alert(editingEvent ? 'Evento actualizado.' : 'Evento creado.');  
  };  

  const handleDeleteEvent = (id) => {  
    setEvents(events.filter(e => e.id !== id));  
    alert('Evento eliminado.');  
  };  

  const handleDuplicate = (event) => {  
    const newEvent = duplicateEvent(event);  
    setEvents([...events, newEvent]);  
    alert('Evento duplicado.');  
  };  

  const handleCancel = (id) => {  
    handleDeleteEvent(id);  
  };  

  return (  
    <div className="container mx-auto px-4 py-8">  
      <motion.div  
        initial={{ opacity: 0, y: -20 }}  
        animate={{ opacity: 1, y: 0 }}  
        className="flex justify-between items-center mb-8"  
      >  
        <h1 className="text-3xl font-bold flex items-center gap-2">  
          <LayoutDashboard className="w-8 h-8" /> Mis Eventos  
        </h1>  
        <motion.button  
          onClick={() => setShowForm(true)}  
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold flex items-center gap-2"  
          whileHover={{ scale: 1.05 }}  
        >  
          <Plus className="w-5 h-5" /> Nuevo Evento  
        </motion.button>  
      </motion.div>  

      {showForm && (  
        <EventForm  
          event={editingEvent}  
          onSave={handleSaveEvent}  
          onDelete={handleDeleteEvent}  
          onDuplicate={handleDuplicate}  
          onCancel={handleCancel}  
        />  
      )}  

      {!showForm && (  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  
          {events.map((event) => (  
            <EventCard  
              key={event.id}  
              event={event}  
              onEdit={() => setEditingEvent(event)}  
              onView={() => setViewingEvent(event)}  
            />  
          ))}  
        </div>  
      )}  

      {viewingEvent && (  
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setViewingEvent(null)}>  
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>  
            <h3 className="text-2xl font-bold mb-4">{viewingEvent.title}</h3>  
            <p>{viewingEvent.description}</p>  
            <p className="mt-4">Fecha: {new Date(viewingEvent.date).toLocaleString()}</p>  
            <p>Ubicación: {viewingEvent.location}</p>  
            <button onClick={() => setViewingEvent(null)} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">Cerrar</button>  
          </div>  
        </div>  
      )}  
    </div>  
  );  
};  

export default AdminDashboard;