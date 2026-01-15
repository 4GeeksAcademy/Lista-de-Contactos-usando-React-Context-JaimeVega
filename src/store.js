/* export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
  }    
}
 */
export const initialContactStore=()=>{
  return{
    contact: []
  }
}

export default function contactStoreReducer(store, action = {}) {
  switch(action.type){
    case 'add_contact':
      const contact = action.payload;
      return {
        ...store,
        contact: [...store.contact, contact]
      };
    case 'delete_contact':
      const  id  = action.payload;
      console.log(action.payload);
      
      return {
        ...store,
        contact:  store.contact.filter((todo) => todo.id !== id)
      };
    case 'save':
      return {
        ...store,
        contact: action.payload
      };
    default:
      throw Error('Unknown action.');
  }    
}