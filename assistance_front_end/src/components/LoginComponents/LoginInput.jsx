import { useState } from "react";

export const LoginInput = ({ children, type, placeholder }) => {
  const id = children.toLowerCase();
  const [inputData, setInputData] = useState('')

  const getCredentials = (input) => {
    setInputData(input.value)
  }
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <span className="text-input">
        <input
          value={inputData}
          onChange={(event) => getCredentials(event.target) } 
          type={type} 
          id={id}
          name={id} 
          placeholder={placeholder} />
      </span>
    </>
  );
}
