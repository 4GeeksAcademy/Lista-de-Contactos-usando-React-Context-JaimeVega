import { useState, useEffect } from "react";
import useGlobalReducerContact from "../hooks/useGlobalReducerContact"; 
import "/src/App.css";


export function CreateContact() {

  const { store, dispatch } = useGlobalReducerContact()
  useEffect(() => {
    console.log("El store se actualizó realmente:", store);
      }, [store]);
  const [inputValue, setInputValue] = useState(["", "", "","",""]);
 
  function onClick(e) {
    e.preventDefault();
    let newInputValue = [...inputValue];
    let inputValuesClean = newInputValue.map((value) =>
      value.trim().replace(/\s+/g, " ")
    );
    let verifyInput = inputValuesClean.filter((value) => value != "");
    if (verifyInput.length === 5) {
      let newContact = {
              "name": `${inputValuesClean[0]} ${inputValuesClean[1]}`,
              "phone": inputValuesClean[2],
              "email": inputValuesClean[3],
              "address": inputValuesClean[4],
            }
      fetch('https://playground.4geeks.com/contact/agendas/Drokkko/contacts', {
				method: "POST",
				body: JSON.stringify(newContact),
				headers: {
					"Content-Type": "application/json"
				}
				})
      .then(response => {
        console.log(response.ok);
        return response.json();
      })
      .then(data => console.log(data)
      )
    
      .catch(error => console.log(error));
      setInputValue(["", "", "","",""]);
    }
    else {alert('Te falta un datos para crear un contacto')}
    
  }
  function handleChange(e, n) {
    let newInputValue = [...inputValue];
    newInputValue[n] = e.target.value;
    setInputValue(newInputValue);
  }

  return (
    <div className="container-list">
      <form onSubmit={onClick}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={inputValue[0]}
          onChange={(e) => handleChange(e, 0)}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={inputValue[1]}
          onChange={(e) => handleChange(e, 1)}
        />
        <input
          type="text"
          placeholder="Email"
          name="Email"
          value={inputValue[2]}
          onChange={(e) => handleChange(e, 2)}
        />
        <input
          type="text"
          placeholder="Phone"
          name="Phone"
          value={inputValue[3]}
          onChange={(e) => handleChange(e, 3)}
        />
        <input
          type="text"
          placeholder="Address"
          name="Address"
          value={inputValue[4]}
          onChange={(e) => handleChange(e, 4)}
        />
        <button>Add New Contact</button>
      </form>
    </div>
  );
}
