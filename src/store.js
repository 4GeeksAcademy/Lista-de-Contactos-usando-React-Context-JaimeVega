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
    contact: [
      { id: 1, name: "Aubree Grant", mobile: "(56) 976458934", state: "California" },
      { id: 2, name: "Daniela Deininger", mobile: "(56) 976458934", state: "New York" }
    ]
  }
}

export default function contactStoreReducer(store, action = {}) {
  switch(action.type){
    case 'add_contact':

     /*  const { id,  name, mobile, state } = action.payload */

      return {
        ...store,
        contact: [...store.contact, action.payload]
      };
      case 'delete_contact':

       const { id,  name, mobile, state } = action.payload 

      return {
        ...store,
        contact:  store.contact.filter((todo) => todo.id !== id)
      };
    default:
      throw Error('Unknown action.');
  }    
}