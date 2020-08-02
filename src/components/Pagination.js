import React from "react";

function Pagination({ limit, total, setPage, setOffset }) {
  const buttonsCount = Math.round(total / limit);

  let buttons = [];
  console.log("buttons->", buttons);

  for (let index = 1; index <= buttonsCount; index++) {
    const result = index * limit - 100;
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
