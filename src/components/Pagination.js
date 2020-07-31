import React from "react";

function Pagination({ limit, total, setPage, setOffset }) {
  const buttonsCount = total / limit;

  let buttons = [];

  for (let index = 1; index <= buttonsCount; index++) {
    const result = index * limit;
    buttons.push(
      <button
        key={index}
        onClick={() => {
          setPage(index);
          setOffset(result);
        }}
      >
        {index}
      </button>
    );
  }

  return <div>{buttons}</div>;
}

export default Pagination;
