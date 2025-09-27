import { format, isBefore, parseISO } from 'date-fns';  

export const generateUniqueId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);  

export const formatDate = (date) => format(new Date(date), 'dd/MM/yyyy HH:mm');  

export const isEventExpired = (date) => isBefore(new Date(date), new Date());  

export const applyDiscount = (price, code, promotions) => {  
  const promo = promotions.find(p => p.code === code && !isBefore(new Date(p.expires), new Date()));  
  return promo ? price * (1 - promo.discount / 100) : price;  
};  

export const duplicateEvent = (event) => ({  
  ...event,  
  id: generateUniqueId(),  
  title: `${event.title} (Copia)`,  
  attendees: [],  
  tickets: event.tickets.map(t => ({ ...t, quantity: t.quantity }))  
});  

export const filterEvents = (events, filters) => {  
  return events.filter(event => {  
    const matchesCategory = !filters.category || event.category === filters.category;  
    const matchesDate = !filters.date || new Date(event.date).toDateString() === new Date(filters.date).toDateString();  
    const matchesLocation = !filters.location || event.location.toLowerCase().includes(filters.location.toLowerCase());  
    return matchesCategory && matchesDate && matchesLocation;  
  });  
};