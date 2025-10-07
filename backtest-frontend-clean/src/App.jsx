import { useState } from "react";

function App() {
  const [date, setDate] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // 1. Client-side validation
    if (!date) return alert("Please select a date");

    setIsLoading(true);
    setResponse(""); // Clear previous response

    try {
      // 2. API call to the deployed backend
      const res = await fetch("https://assesment-2-qgsy.onrender.com/submit-date", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
      });

      // 3. Handle non-OK responses (like 400 Bad Request)
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }

      // 4. Handle success response
      const data = await res.json();
      setResponse(data.message);
      
      // OPTIONAL IMPROVEMENT: Clear the date input after success
      setDate(""); 

    } catch (err) {
      console.error(err);
      // Display specific error message or a generic one
      setResponse(`Error: ${err.message || "Could not connect to server"}`);
    } finally {
      setIsLoading(false);
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
        disabled={isLoading}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
      
      {/* Conditional response display based on success or error */}
      {response && (
        <p 
          className={`mt-4 ${response.startsWith("Error:") ? "text-red-600" : "text-green-600"}`}
        >
          {response}
        </p>
      )}
      
    </div>
  );
}

export default App;
