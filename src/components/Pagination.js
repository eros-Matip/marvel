import React from "react";

function Pagination({ limit, total, setPage, offset, setOffset }) {
  const buttonsCount = Math.round(total / limit);

  let buttons = [];

  for (let index = 1; index <= buttonsCount; index++) {
    const result = index * limit - 100;
    const littleResult = Math.round(index / 3);
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
    console.log("littleResult->", littleResult);
  }
  const handleChangePreviews = () => {
    setPage(1);
    setOffset(1 * limit - 100);
  };
  const handleChangeLast = () => {
    setPage(buttonsCount);
    setOffset(buttonsCount * limit - 100);
  };

  const prevPages = () => {
    setOffset(offset - 1);
    if (offset >= 100) {
      setOffset(offset - 100);
    }
  };

  const nextPages = () => {
    setOffset(offset + 1);
    if (offset <= total - 100) {
      setOffset(offset + 100);
    }
  };

  const prev100Pages = () => {
    setOffset(offset - 100);
    if (offset >= 10000) {
      setOffset(offset - 10000);
    }
  };

  const next100Pages = () => {
    setOffset(offset + 100);
    if (offset <= total - 10000) {
      setOffset(offset + 10000);
    }
  };
  return (
    <>
      {/* {buttonsCount < 100? } */}
      <button onClick={handleChangePreviews}>{`<<`}</button>
      <button onClick={prevPages}>{`prev`}</button>
      <span>
        {Math.round(offset / limit) + 1} / {buttonsCount} pages
      </span>
      :<button onClick={nextPages}>{`next`}</button>
      <button onClick={handleChangeLast}>{`>>`}</button>
    </>
  );
}

export default Pagination;
