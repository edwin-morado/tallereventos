export const mockEvents = [  
  {  
    id: '1',  
    title: 'Fiesta de Verano Épica',  
    description: 'Una noche loca con música en vivo y baile hasta el amanecer.',  
    date: new Date('2024-07-20T20:00:00'),  
    location: 'Playa Central, Miami',  
    capacity: 500,  
    image: 'https://via.placeholder.com/400x200?text=Fiesta+Verano',  
    customStyle: 'bg-gradient-to-r from-orange-400 to-pink-500',  
    tickets: [  
      { id: 't1', type: 'general', price: 20, quantity: 400, maxPerUser: 4 },  
      { id: 't2', type: 'vip', price: 50, quantity: 100, maxPerUser: 2 },  
      { id: 't3', type: 'earlybird', price: 15, quantity: 50, maxPerUser: 3 }  
    ],  
    promotions: [  
      { code: 'SUMMER10', discount: 10, expires: new Date('2024-07-15T23:59:00') }  
    ],  
    attendees: ['user1@example.com', 'user2@example.com'],  
    category: 'fiesta'  
  },  
  {  
    id: '2',  
    title: 'Taller de Cocina Italiana',  
    description: 'Aprende a hacer pasta fresca con chefs expertos.',  
    date: new Date('2024-07-25T18:00:00'),  
    location: 'Centro Cultural, Madrid',  
    capacity: 20,  
    image: 'https://via.placeholder.com/400x200?text=Taller+Cocina',  
    customStyle: 'bg-gradient-to-r from-green-400 to-blue-500',  
    tickets: [  
      { id: 't4', type: 'general', price: 30, quantity: 15, maxPerUser: 1 },  
      { id: 't5', type: 'vip', price: 60, quantity: 5, maxPerUser: 1 }  
    ],  
    promotions: [],  
    attendees: [],  
    category: 'taller'  
  },  
 
  {  
    id: '1',  
    title: 'Fiesta de Verano Épica',  
    description: 'Una noche loca con música en vivo y baile hasta el amanecer.',  
    date: new Date('2024-07-20T20:00:00'),  
    location: 'Playa Central, Miami',  
    capacity: 500,  
    image: 'https://via.placeholder.com/400x200?text=Fiesta+Verano',  
    customStyle: 'bg-gradient-to-r from-orange-400 to-pink-500',  
    tickets: [  
      { id: 't1', type: 'general', price: 20, quantity: 400, maxPerUser: 4 },  
      { id: 't2', type: 'vip', price: 50, quantity: 100, maxPerUser: 2 },  
      { id: 't3', type: 'earlybird', price: 15, quantity: 50, maxPerUser: 3 }  
    ],  
    promotions: [  
      { code: 'SUMMER10', discount: 10, expires: new Date('2024-07-15T23:59:00') }  
    ],  
    attendees: ['user1@example.com', 'user2@example.com'],  
    category: 'fiesta'  
  },  
  {  
    id: '2',  
    title: 'Taller de Cocina Italiana',  
    description: 'Aprende a hacer pasta fresca con chefs expertos.',  
    date: new Date('2024-07-25T18:00:00'),  
    location: 'Centro Cultural, Madrid',  
    capacity: 20,  
    image: 'https://via.placeholder.com/400x200?text=Taller+Cocina',  
    customStyle: 'bg-gradient-to-r from-green-400 to-blue-500',  
    tickets: [  
      { id: 't4', type: 'general', price: 30, quantity: 15, maxPerUser: 1 },  
      { id: 't5', type: 'vip', price: 60, quantity: 5, maxPerUser: 1 }  
    ],  
    promotions: [],  
    attendees: [],  
    category: 'taller'  
  }  
];

// Función para generar ID único
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Función para duplicar eventos
export const duplicateEvent = (event) => {
  return {
    ...event,
    id: generateUniqueId(),
    title: `${event.title} (Copia)`,
    createdAt: new Date().toISOString()
  };
};
