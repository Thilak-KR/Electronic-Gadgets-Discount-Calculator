import { useState } from "react";
import "./App.css";

function App() {
  const [gadget, setGadget] = useState("Laptop");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  const calculate = async () => {
    const response = await fetch("http://127.0.0.1:8000/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gadget: gadget,
        price: parseFloat(price),
        discount: parseFloat(discount),
      }),
    });

    const data = await response.json();
    setFinalPrice(data.final_price);
  };

  return (
    <div className="container">
      <h2>Electronic Gadget Discount Calculator</h2>

      <select onChange={(e) => setGadget(e.target.value)}>
        <option value="Laptop">Laptop</option>
        <option value="Mobile">Mobile</option>
        <option value="Tablet">Tablet</option>
      </select>

      <input
        type="number"
        placeholder="Enter Price"
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Discount %"
        onChange={(e) => setDiscount(e.target.value)}
      />

      <button onClick={calculate}>Calculate</button>

      <h3>Final Price: ₹{finalPrice}</h3>
    </div>
  );
}

export default App;
