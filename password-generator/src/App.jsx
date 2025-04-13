import { useState, useEffect } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [symbolAllowed, setSymbolAllowed] = useState(true);
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    const generatePassword = () => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (numberAllowed) str += "0123456789";
      if (symbolAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?";
      for (let i = 0; i < length; i++) {
        let char = Math.floor(Math.random() * str.length);
        pass += str.charAt(char);
      }
      setPassword(pass);
    };

    generatePassword();
  }, [length, numberAllowed, symbolAllowed]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopySuccess("Password copied to clipboard!");
      setTimeout(() => {
        setCopySuccess("");
      }, 1000);
    });
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-8 my-10 text-orange-500 bg-gray-900">
        <h1 className="text-3xl font-bold text-center py-4 text-orange-400">
          Password Generator
        </h1>
        <div className="flex shadow-md rounded-lg overflow-hidden mb-6 bg-gray-700">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 bg-gray-800 text-white"
            placeholder="Generated Password"
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 transition duration-300 ease-in-out"
          >
            Copy
          </button>
        </div>
        {copySuccess && (
          <p className="text-green-500 text-center mb-4">{copySuccess}</p>
        )}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-white">Password Length:</label>
            <input
              type="range"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-orange-500"
              min="4"
              max="32"
            />
            <span className="text-white ml-4">{length}</span>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-white">Include Numbers:</label>
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed(e.target.checked)}
              className="form-checkbox h-5 w-5 text-orange-500 hover:scale-110 transition-transform duration-200"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-white">Include Symbols:</label>
            <input
              type="checkbox"
              checked={symbolAllowed}
              onChange={(e) => setSymbolAllowed(e.target.checked)}
              className="form-checkbox h-5 w-5 text-orange-500 hover:scale-110 transition-transform duration-200"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
