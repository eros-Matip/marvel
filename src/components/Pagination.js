import React from "react";

function Pagination({ limit, total, setPage, setOffset }) {
  const buttonsCount = Math.round(total / limit);

  let buttons = [];

  const handleClickFirst = () => {
    buttons = buttons - 1;
  };
  const handleClicLast = () => {
    buttons = buttons + 1;
  };

  for (let index = 1; index <= buttonsCount; index++) {
    const result = index * limit - 100;

    buttons.push(
      <button
        className="pagination"
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

  return (
    <>
      <button onClick={handleClickFirst}>-1</button>

      <div>{buttons}</div>
      <button onClick={handleClicLast}>+1</button>
    </>
  );
}

export default Pagination;
