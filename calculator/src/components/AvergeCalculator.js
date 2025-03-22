import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = "http://20.244.56.144/test/fibo"; 
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNjI2Njg0LCJpYXQiOjE3NDI2MjYzODQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjBhODVlMjljLTI0ODMtNDg5NS04OTkyLTZjZWEwMTBkZDliMyIsInN1YiI6IjcxNzgyMnAzMDZAa2NlLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiS2FycGFnYW0gQ29sbGVnZSBvZiBFbmdpbm5lcmluZyIsImNsaWVudElEIjoiMGE4NWUyOWMtMjQ4My00ODk1LTg5OTItNmNlYTAxMGRkOWIzIiwiY2xpZW50U2VjcmV0IjoiQnRjZWhHdk92V2todktaRiIsIm93bmVyTmFtZSI6IkJodXZhbmVzaHdhcmkiLCJvd25lckVtYWlsIjoiNzE3ODIycDMwNkBrY2UuYWMuaW4iLCJyb2xsTm8iOiI3MTc4MjJwMzA2In0.Tt34gbv3EuAcp7svkTxFN-U16ShtkRzBnJLD1PZZXwA"; // 🔑 Replace with your actual token
const WINDOW_SIZE = 10;

const AverageCalculator = () => {
  const [numberType, setNumberType] = useState("e"); 
  const [window, setWindow] = useState([]);
  const [average, setAverage] = useState(0);

  const fetchNumbers = useCallback(async () => {
    let url = "";
    
    switch (numberType) {
      case "p":
        url = `${API_BASE_URL}/primes`;
        break;
      case "f":
        url = `${API_BASE_URL}/fibo`;
        break;
      case "e":
        url = `${API_BASE_URL}/even`;
        break;
      case "r":
        url = `${API_BASE_URL}/rand`;
        break;
      default:
        return;
    }

    try {
      const response = await axios.get(url, {
        timeout: 500,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (response.data && response.data.numbers) {
        updateWindow(response.data.numbers);
      }
    } catch (error) {
      console.error("Error fetching numbers", error);
    }
  }, [numberType]);

  const updateWindow = (newNumbers) => {
    const uniqueNumbers = Array.from(new Set([...window, ...newNumbers]));
    const limitedWindow = uniqueNumbers.slice(-WINDOW_SIZE);
    setWindow(limitedWindow);
    setAverage(
      limitedWindow.length > 0
        ? (limitedWindow.reduce((acc, num) => acc + num, 0) / limitedWindow.length).toFixed(2)
        : 0
    );
  };

  useEffect(() => {
    fetchNumbers();
  }, [fetchNumbers]); 

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Average Calculator</h2>
      <select
        className="border p-2 m-2"
        value={numberType}
        onChange={(e) => setNumberType(e.target.value)}
      >
        <option value="p">Prime Numbers</option>
        <option value="f">Fibonacci Numbers</option>
        <option value="e">Even Numbers</option>
        <option value="r">Random Numbers</option>
      </select>
      <button className="p-2 bg-blue-500 text-white" onClick={fetchNumbers}>
        Fetch Numbers
      </button>
      <div className="mt-4">
        <p>Window Previous State:  {JSON.stringify(window.slice(0, -1))}</p>
        <p>Window Current State: {JSON.stringify(window)}</p>
        <p>Average: {average}</p>
      </div>
    </div>
  );
};

export default AverageCalculator;

