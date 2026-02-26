async function calculate() {
    const gadget = document.getElementById("gadget").value;
    const price = parseFloat(document.getElementById("price").value);
    const discount = parseFloat(document.getElementById("discount").value);

    const response = await fetch("http://127.0.0.1:8000/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            gadget: gadget,
            price: price,
            discount: discount
        })
    });

    const data = await response.json();

    document.getElementById("result").innerHTML =
        "Final Price: ₹" + data.final_price;
}
