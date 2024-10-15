import { useState } from 'react';
import './App.css'

function App() {
const [content,setContent]=useState("");
const [hidden,setHidden]=useState(true);
const [imgSource,setImageSource]=useState("public\vite.svg");
const [banlist,setBanlist]=useState([]);
const [attr1,setAttr1]=useState("temp");
const [attr2,setAttr2]=useState("temp");
const [attr3,setAttr3]=useState("temp");

async function handleClick() {
  //setContent("Nutrition plays a crucial role in our overall health.");
  //console.log(content);
  var flag=true;
  var response,user,catresponse,cat;
  while(flag){
    response = await fetch('https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=live_GdUYQdwvwLJai5CWtiOMhAqVFI02TGxQA91giGXLHsYwoocVQHkss6RfNkpFzGtC');
    user = await response.json();
    console.log(user[0].id);
    var id=user[0].id;
    catresponse = await fetch(`https://api.thecatapi.com/v1/images/${id}`);
    cat = await catresponse.json();
    console.log(cat);
    console.log(cat.breeds[0].origin);
    if(!banlist.includes(cat.breeds[0].origin))   
    { 
        console.log('entered');
        break;
    }
  }
  setContent(cat.breeds[0].name);
  setAttr1(cat.breeds[0].weight.imperial+' lbs');
  setAttr2(cat.breeds[0].origin);
  setAttr3(cat.breeds[0].life_span+' yrs');
  setHidden(false);
  setImageSource(user[0].url);
}
const handleList = () => {
  if (!banlist.includes(attr2)) {
    setBanlist([...banlist, attr2]);
  }
}
const handleRemoval = (buttonText) => {
  console.log(buttonText);
  var list=banlist.filter((item)=>item!==buttonText);
  console.log(list);
  setBanlist(list);
}

  return (
    <div className="container">
  <div className='image-section'>
  <img className="image" src="public\images\cat.jpeg"></img>
  <div className="overlay"></div>
  </div>
  <div className="grey-section">
    <h2>Ban list!</h2>
    <div className="button-container">
    {banlist.map((buttonText, index) => (
          <button 
            key={index} 
            className="added-button"
            onClick={()=>handleRemoval(buttonText)} 
          >
            {buttonText}
          </button>
    ))}
    </div>
  </div>
  <div className="center-card">
    <h3>Find Cats</h3>
    <div> Find from the greatest generation of cats.</div>
    <div>😺😸😹😻😼😽🙀😿😾</div>
    <div><p>{content}</p>
    <div className='attribute-container'>
    <button hidden={hidden} className="attribute-btn">{attr1}</button>
    <button hidden={hidden} onClick={handleList} className="attribute-btn">{attr2}</button>
    <button hidden={hidden} className="attribute-btn">{attr3}</button>
    </div>
    <br></br><img className='api-image' src={imgSource} hidden={hidden}></img></div><br></br>
    <button className="discover-btn" onClick={handleClick}>Discover!</button>
  </div>
</div>
  )
}

export default App;
