import React from "react";

export default function Gallery({ arr, handleClickImg }) {
  console.log(arr);

  const elements = arr.data.memes.map((item) => (
    <img
      key={item.id}
      className="gallery__img"
      src={item.url}
      alt={item.name}
      onClick={handleClickImg}
    />
  ));

  return (
    <div>
      <div className="gallery">{elements}</div>
    </div>
  );
}
