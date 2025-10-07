import { useState } from "react";

function App() {
  const [date, setDate] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    if (!date) return alert("Please select a date");

    try {
      const res = await fetch("https://assesment-2-qgsy.onrender.com/submit-date", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
      });
      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      console.error(err);
      setResponse("Error connecting to server");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Date Selector</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
      {response && <p className="mt-4 text-green-600">{response}</p>}
    </div>
  );
}

export default App;
