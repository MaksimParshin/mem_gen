import React from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
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
        ></input>
        <input
          className="meme__input"
          type="text"
          name="bottomText"
          value={meme.bottomText}
          placeholder="Bottom text"
          onChange={handleChange}
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
        <h2 className="meme__topText">{meme.topText}</h2>
        <h2 className="meme__bottomText">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
