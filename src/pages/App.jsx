import { useState, useEffect } from "react";
import { Contact } from "../components/Contact";
import useGlobalReducerContact from "../hooks/useGlobalReducerContact"; 
import "/src/App.css";

export function App() {
    const { store, dispatch } = useGlobalReducerContact()
  const [list, setList] = useState([
    { id: 1, name: "Aubree Grant", mobile: "(56) 976458934", state: "California" },
    { id: 2, name: "Daniela Deininger", mobile: "(56) 976458934", state: "New York" },
  ]);
  useEffect(() => {
      console.log("El store se actualizó realmente:", store);
        }, [store]);
  const ToDoList = store.contact.map((item) => (
    <Contact
      name={item.name}
      mobile={item.mobile}
      state={item.state}
      onClick={deleteItem}
      key={item.id}
      id={item.id}
    />
  ));
  function deleteItem(id) {
    console.log(id);
    let newList = list;
    newList = newList.filter((task) => task.id !== id);
    setList(newList);
    dispatch({
                  type: "delete_contact", 
                  payload: {
                      id: id
                    }
                })
  }
  return (
    
    <div className="container-list">
      <h1>Contacts</h1>
      <div className="list">{ToDoList}</div>
    </div>
  );
}
