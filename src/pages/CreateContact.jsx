import { useState, useEffect } from "react";
import useGlobalReducerContact from "../hooks/useGlobalReducerContact"; 
import { Navigate, useSearchParams, useNavigate } from "react-router-dom";
import "/src/App.css";


export function CreateContact() {
  const [inputValue, setInputValue] = useState(["", "", "","",""]);
  const [searchParams] = useSearchParams();
  const origen = searchParams.get("origen"); 
  const id = searchParams.get("id");

  const { store, dispatch } = useGlobalReducerContact()
useEffect(() => {
    if (origen === "edit" && id && store.contact) {
      const contactToEdit = store.contact.find((c) => String(c.id) === String(id));

      if (contactToEdit) {
        const nameParts = contactToEdit.name.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts[1] || "";

        setInputValue([
          firstName,
          lastName,
          contactToEdit.phone,
          contactToEdit.email,
          contactToEdit.address
        ]);
      }
    }
  }, [origen, id, store.contact]);

  
 
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
      if (origen === "edit") {
        fetch(`https://playground.4geeks.com/contact/agendas/Drokkko/contacts/${id}`, {
				method: "PUT",
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
      else {
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
      <h1>{origen === "edit" ? `Editando contacto ${id}` : "Nuevo Contacto"}</h1>
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
        <button>{origen === "edit" ? `Edit Contact` : "Add New Contact"}</button>
      </form>
    </div>
  );
}
