import React, { useState } from 'react';  
import { motion } from 'framer-motion';  
import { Plus, Edit, Trash2, Copy, Calendar, MapPin, Users, Image as ImageIcon, DollarSign } from 'lucide-react';  
import { formatDate, generateUniqueId } from '../utils/helpers';  

const EventForm = ({ event, onSave, onDelete, onDuplicate, onCancel }) => {  
  const [formData, setFormData] = useState(event || {  
    id: generateUniqueId(),  
    title: '', description: '', date: '', location: '', capacity: 0,  
    image: '', customStyle: 'bg-blue-500', tickets: [], promotions: [], attendees: [], category: ''  
  });  
  const [newTicket, setNewTicket] = useState({ type: '', price: 0, quantity: 0, maxPerUser: 1 });  
  const [newPromo, setNewPromo] = useState({ code: '', discount: 0, expires: '' });  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    onSave(formData);  
  };  

  const addTicket = () => {  
    if (newTicket.type && newTicket.price > 0 && newTicket.quantity > 0) {  
      setFormData({ ...formData, tickets: [...formData.tickets, { ...newTicket, id: generateUniqueId() }] });  
      setNewTicket({ type: '', price: 0, quantity: 0, maxPerUser: 1 });  
    }  
  };  

  const addPromo = () => {  
    if (newPromo.code && newPromo.discount > 0 && newPromo.expires) {  
      setFormData({ ...formData, promotions: [...formData.promotions, newPromo] });  
      setNewPromo({ code: '', discount: 0, expires: '' });  
    }  
  };  

  const handleCancel = () => {  
    if (formData.attendees.length > 0) {  
      alert(`¡Evento cancelado! Notificación enviada a ${formData.attendees.length} asistentes: "Lo sentimos, el evento se canceló."`);  
    }  
    onCancel(formData.id);  
  };  

  return (  
    <motion.div  
      initial={{ opacity: 0, scale: 0.95 }}  
      animate={{ opacity: 1, scale: 1 }}  
      className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto"  
    >  
      <form onSubmit={handleSubmit} className="space-y-6">  
        <div>  
          <label className="block text-sm font-medium mb-2">Título</label>  
          <input  
            type="text"  
            value={formData.title}  
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}  
            className="w-full p-3 border rounded-lg"  
            required  
          />  
        </div>  
        <div>  
          <label className="block text-sm font-medium mb-2">Descripción</label>  
          <textarea  
            value={formData.description}  
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}  
            className="w-full p-3 border rounded-lg"  
            rows="3"  
          />  
        </div>  
        <div className="grid grid-cols-2 gap-4">  
          <div>  
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">  
              <Calendar className="w-4 h-4" /> Fecha  
            </label>  
            <input  
              type="datetime-local"  
              value={formData.date}  
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}  
              className="w-full p-3 border rounded-lg"  
              required  
            />  
          </div>  
          <div>  
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">  
              <MapPin className="w-4 h-4" /> Ubicación  
            </label>  
            <input  
              type="text"  
              value={formData.location}  
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}  
              className="w-full p-3 border rounded-lg"  
              required  
            />  
          </div>  
        </div>  
        <div>  
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">  
            <Users className="w-4 h-4" /> Aforo  
          </label>  
          <input  
            type="number"  
            value={formData.capacity}  
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}  
            className="w-full p-3 border rounded-lg"  
            required  
          />  
        </div>  
        <div>  
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">  
            <ImageIcon className="w-4 h-4" /> Imagen (URL o placeholder)  
          </label>  
          <input  
            type="text"  
            value={formData.image}  
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}  
            placeholder="https://via.placeholder.com/400x200?text=Tu+Evento"  
            className="w-full p-3 border rounded-lg"  
          />  
        </div>  
        <div>  
          <label className="block text-sm font-medium mb-2">Estilo Personalizado (clase CSS)</label>  
          <input  
            type="text"  
            value={formData.customStyle}  
            onChange={(e) => setFormData({ ...formData, customStyle: e.target.value })}  
            placeholder="bg-gradient-to-r from-blue-500 to-purple-500"  
            className="w-full p-3 border rounded-lg"  
          />  
        </div>  
        <div>  
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">  
            <DollarSign className="w-5 h-5" /> Entradas  
          </h3>  
          <div className="space-y-4 mb-4">  
            {formData.tickets.map((ticket) => (  
              <div key={ticket.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">  
                <span>{ticket.type}: ${ticket.price} (Quedan: {ticket.quantity})</span>  
                <span>Límite por usuario: {ticket.maxPerUser}</span>  
              </div>  
            ))}  
          </div>  
          <div className="grid grid-cols-4 gap-2">  
            <input  
              type="text"  
              placeholder="Tipo (ej: VIP)"  
              value={newTicket.type}  
              onChange={(e) => setNewTicket({ ...newTicket, type: e.target.value })}  
              className="p-2 border rounded"  
            />  
            <input  
              type="number"  
              placeholder="Precio"  
              value={newTicket.price}  
              onChange={(e) => setNewTicket({ ...newTicket, price: parseFloat(e.target.value) })}  
              className="p-2 border rounded"  
            />  
            <input  
              type="number"  
              placeholder="Cantidad"  
              value={newTicket.quantity}  
              onChange={(e) => setNewTicket({ ...newTicket, quantity: parseInt(e.target.value) })}  
              className="p-2 border rounded"  
            />  
            <input  
              type="number"  
              placeholder="Máx por usuario"  
              value={newTicket.maxPerUser}  
              onChange={(e) => setNewTicket({ ...newTicket, maxPerUser: parseInt(e.target.value) })}  
              className="p-2 border rounded"  
            />  
          </div>  
          <button type="button" onClick={addTicket} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">+ Entrada</button>  
        </div>  
        <div>  
          <h3 className="text-lg font-bold mb-4">Promociones</h3>  
          <div className="space-y-4 mb-4">  
            {formData.promotions.map((promo) => (  
              <div key={promo.code} className="flex justify-between items-center p-3 bg-gray-50 rounded">  
                <span>{promo.code}: {promo.discount}% hasta {formatDate(promo.expires)}</span>  
              </div>  
            ))}  
          </div>  
          <div className="grid grid-cols-3 gap-2">  
            <input  
              type="text"  
              placeholder="Código"  
              value={newPromo.code}  
              onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}  
              className="p-2 border rounded"  
            />  
            <input  
              type="number"  
              placeholder="Descuento %"  
              value={newPromo.discount}  
              onChange={(e) => setNewPromo({ ...newPromo, discount: parseInt(e.target.value) })}  
              className="p-2 border rounded"  
            />  
            <input  
              type="datetime-local"  
              value={newPromo.expires}  
              onChange={(e) => setNewPromo({ ...newPromo, expires: e.target.value })}  
              className="p-2 border rounded"  
            />  
          </div>  
          <button type="button" onClick={addPromo} className="mt-2 px-4 py-2 bg-purple-500 text-white rounded">+ Promo</button>  
        </div>  
        <div className="flex gap-4 pt-4">  
          <motion.button  
            type="submit"  
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold"  
            whileHover={{ scale: 1.05 }}  
          >  
            {event ? 'Guardar Cambios' : 'Crear Evento'} {event ? <Edit className="w-4 h-4 ml-2" /> : <Plus className="w-4 h-4 ml-2" />}  
          </motion.button>  
          {event && (  
            <>  
              <motion.button  
                type="button"  
                onClick={() => onDuplicate(event)}  
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg"  
                whileHover={{ scale: 1.05 }}  
              >  
                <Copy className="w-4 h-4" />  
              </motion.button>  
              <motion.button  
                type="button"  
                onClick={handleCancel}  
                className="px-6 py-3 bg-red-500 text-white rounded-lg"  
                whileHover={{ scale: 1.05 }}  
              >  
                <Trash2 className="w-4 h-4" /> Cancelar  
              </motion.button>  
            </>  
          )}  
        </div>  
      </form>  
    </motion.div>  
  );  
};  

export default EventForm;