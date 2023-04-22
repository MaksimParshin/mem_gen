import React from "react";
import Gallery from "./Gallery";
// const Random = require('crypto-random');

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
    fontSize: 16,
    color: "#ffffff",
  });

  const [arrayData, setArrayData] = React.useState([]);
  const [showGallery, setShowGallery] = React.useState(false);

  React.useEffect(() => {
    async function getMems() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setArrayData(data);
    }
    getMems();
  }, []);

  function getRandomImage() {
    const random = Math.floor(
      Math.random() * (arrayData.data.memes.length - 1) + 1
    );

    //  const random = Random.range(1, 100)
    const url = arrayData.data.memes[random].url;
    return setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: url,
      };
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

function handleClickImg(event) {
  console.log(event.target)
  const { name, src } = event.target;
  setMeme((prevMeme) => {
    return {
      ...prevMeme,
      randomImage: src,
    };
  });
  setShowGallery(false);
}



  function handleShowGallery() {
    setShowGallery(prevState =>!prevState);
  }

  let number = `${meme.fontSize}px`;

  return (
    <main className="meme">
      <form className="meme__form">
        <input
          className="meme__input"
          type="text"
          name="topText"
          value={meme.topText}
          placeholder="Top text"
          onChange={handleChange}
          maxLength={20}
        ></input>
        <input
          className="meme__input"
          type="text"
          name="bottomText"
          value={meme.bottomText}
          placeholder="Bottom text"
          onChange={handleChange}
          maxLength={20}
        ></input>
        <input
          className="meme__input"
          type="number"
          name="fontSize"
          value={meme.fontSize}
          onChange={handleChange}
          min={8}
          max={35}
        ></input>
        <input
          className="meme__input"
          type="color"
          name="color"
          value={meme.color}
          onChange={handleChange}
        ></input>

        <button
          className="meme__button"
          type="button"
          onClick={getRandomImage}
        >
          Get a new random meme image
        </button>
        <button
          className="meme__button"
          type="button"
          onClick={handleShowGallery}
        >
          Show Gallery
        </button>
      </form>
      <div className="meme__img-container">
        <img className="meme__img" src={meme.randomImage}></img>
        <h2
          style={{ fontSize: number, color: meme.color }}
          className="meme__text top"
        >
          {meme.topText}
        </h2>
        <h2
          style={{ fontSize: number, color: meme.color }}
          className="meme__text bottom"
        >
          {meme.bottomText}
        </h2>
      </div>
      {showGallery && <Gallery arr={arrayData} handleClickImg={handleClickImg}/>}
    </main>
  );
}
