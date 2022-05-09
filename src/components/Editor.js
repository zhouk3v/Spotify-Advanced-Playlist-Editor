import React, { useState } from "react";
import Parser from "../parser/parser";

const Editor = ({ token, logout }) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  const parser = new Parser();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setResult(query);

    const queryResult = parser.parseInput(query);
    console.log(queryResult);
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <div>Token: {token}</div>
      <form onSubmit={handleSubmit}>
        <textarea onChange={handleChange} />
        <div>
          <button>Submit Query</button>
        </div>
      </form>
      <div>{result}</div>
    </div>
  );
};

export default Editor;
