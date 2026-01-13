import { useState, useEffect } from "react";
import useGlobalReducerContact from "../hooks/useGlobalReducerContact"; 
import "/src/App.css";


export function CreateContact() {

  const { store, dispatch } = useGlobalReducerContact()
  useEffect(() => {
    console.log("El store se actualizó realmente:", store);
      }, [store]);
  const [list, setList] = useState([
    { id: 1, name: "Aubree Grant", mobile: "+56976458934", state: "California" },
    { id: 2, name: "Daniela Deininger", mobile: "+56976458934", state: "New York" },
  ]);
  const [inputValue, setInputValue] = useState(["", "", ""]);
 
  function onClick(e) {
    e.preventDefault();
    let newList = [...list];
    let newInputValue = [...inputValue];
    let position = newList.length;
    let inputValuesClean = newInputValue.map((value) =>
      value.trim().replace(/\s+/g, " ")
    );
    let verifyInput = inputValuesClean.filter((value) => value != "");
    if (verifyInput.length === 3) {
      /* newList[position] = {
        id: position + 1,
        name: inputValuesClean[0],
        mobile: inputValuesClean[1],
        state: inputValuesClean[2],
      }; */
      dispatch({
                  type: "add_contact", 
                  payload: {
                      id: store.contact.length + 1,
                      name: inputValuesClean[0],
                      mobile: inputValuesClean[1],
                      state: inputValuesClean[2],
                    }
                })
      setList(newList);
      setInputValue(["", "", ""]);
    }
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
          placeholder="Contact Name"
          name="name"
          value={inputValue[0]}
          onChange={(e) => handleChange(e, 0)}
        />
        <input
          type="text"
          placeholder="Mobile"
          name="mobile"
          value={inputValue[1]}
          onChange={(e) => handleChange(e, 1)}
        />
        <input
          type="text"
          placeholder="State"
          name="state"
          value={inputValue[2]}
          onChange={(e) => handleChange(e, 2)}
        />
        <button>Add Contact</button>
      </form>
    </div>
  );
}
