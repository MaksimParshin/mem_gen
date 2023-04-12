import logo from "./images/Troll_Face.png";


export default function Header() {
  return (
    <header className="header">
   
        <img className="header__logo" src={logo}></img>
        <h3 className="header__title">Meme Generator</h3>


      <h4 className="header__text">React Course - Project 3</h4>
    </header>
  );
}
