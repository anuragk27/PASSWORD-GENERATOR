import { useCallback, useEffect, useState, useRef } from "react";


function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //useRef Hook for taking refrence of password
  const passwordRef = useRef(null);

  //useCallback Hook for rerendering the page on each dependent state change
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) str += "0123456789";
    if (charAllow) str += "~!@#$%^&*(){}_-='";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllow, charAllow, setPassword]);

  // for copy of the password
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllow, charAllow, passwordGenerator]);

  return (
    <>
      <div
        className="w-full max-w-md 
      mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-600 bg-gray-700"
      >
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
          // checks if (showPassword) is (true) then (type = text) if (false) then (type = password)
            type={
              showPassword ? "text" : "password"
            }
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            //gives the ref to the password
            ref={passwordRef}
          />
          <button
            // on click copy password
            onClick={copyPasswordToClipboard}
            className=" outline-none px-3 py-0.5
            shrink-0 bg-blue-700 text-white hover:bg-blue-400"
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numAllow}
              id="numInput"
              onChange={() => {
                setNumAllow((prev) => !prev);
              }}
            />
            <label> Numbers </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id="charInput"
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
            <label> Characters </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={showPassword}
              id="showPassword"
              onChange={() => {
                setShowPassword((prev) => !prev);
              }}
            />
            <label> Show </label>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
