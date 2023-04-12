import React from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
    fontSize: 16
  });


  const [arrayData, setArrayData] = React.useState([]);

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

    // const Random = require('crypto-random');
    // const random = Random.range(1, 100)
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
          max={100}
        ></input>

        <button
          className="meme__button-submit"
          type="button"
          onClick={getRandomImage}
        >
          Get a new meme image
        </button>
      </form>
      <div className="meme__img-container">
        <img className="meme__img" src={meme.randomImage}></img>
        <h2 style={{fontSize: number}} className="meme__text top">{meme.topText}</h2>
        <h2 style={{fontSize: number}} className="meme__text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
