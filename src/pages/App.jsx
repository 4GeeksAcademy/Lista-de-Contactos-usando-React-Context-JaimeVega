import { useState, useEffect } from "react";
import { Contact } from "../components/Contact";
import useGlobalReducerContact from "../hooks/useGlobalReducerContact"; 
import "/src/App.css";

export function App() {
  const { store, dispatch } = useGlobalReducerContact()
  useEffect(() => {
      console.log("El store se actualizó realmente:", store);
      getData();
        }, []);
  const ToDoList = store.contact.map((item) => (
    <Contact
      name={item.name}
      phone={item.phone}
      email={item.email}
      address={item.address}
      onClick={deleteItem}
      key={item.id}
      id={item.id}
    />
  ));
  function getData() {
    fetch('https://playground.4geeks.com/contact/agendas/Drokkko')
    .then(response => {
      console.log(response.ok);
      return response.json();
    })
    .then(data =>{  
      dispatch({
                type: "save", 
                payload: data.contacts,
                })
              })
    .catch(error => console.log(error));
  }

  function deleteItem(id) {
    console.log(id);
    /* let newList = list;
    newList = newList.filter((task) => task.id !== id);
    setList(newList); */
    fetch(`https://playground.4geeks.com/contact/agendas/Drokkko/contacts/${id}`, {
				method: "DELETE"})
    .then(response => {
      console.log(response.ok);
      return response.json();
    })
    .then(data => console.log(data)
      )
    .catch(error => console.log(error));
    dispatch({
                type: "delete_contact", 
                payload:  id,
                })
    console.log(store);
             
  }




  return (
    
    <div className="container-list">
      <h1>Contacts</h1>
      <div className="list">{ToDoList}</div>
    </div>
  );
}
