import React from "react";


export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })

    const [allMemes, setAllMemes] = React.useState([])
    /* The useEffect is fetching our API. It is handling a "side-effect" or something React is not in charge of. This syncs React with
    outside systems or local storage. Can fire on every render anytime the data changes and that can also depend on what's inside the dependency. If empty
    it will fire off only once.  So anytime a dependency would change within it, it will re-render */
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, []) 
      

    //the f(x) below produces a random image from our API through our variable randomNumber using Math.floor() and Math.random()
    function getMemeImage() {
        // console.log("clicked")
        //const memesArray = allMemeImages.data.memes, we no longer need this line since the data is now coming from allMemes and not the memesData.js file
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        // console.log(randomNumber)
        const url = allMemes[randomNumber].url //here we're using these array brackets because a number is coming back from that variable's value
        setMeme(prevMeme => ({
            ...prevMeme, //We're using the spread operator to reuse our previous state and not override it
            randomImage: url //our randomImage will not take our random url generated using this 
        }))
        
    }
    /*This function controls the user's text input. Event is everything that occurs with the onChange, so, 
        event.target gives us the element that triggered the event. Value is returning the current value in state or the returning current value
    */
    function memeText(event) {
        const {name, value} = event.target // here we simply destructured event.target.value
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value //giving us the current value, it is destructured 
        }))
    }
    //when a button element is inside a form, it automatically defaults to a type="submit" button
    return (
        <main>
           <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    onChange={memeText} //onChange is an event listener that detects changes
                    name="topText" //ties the property name to our property in state, in this way we can reuse our property for other elements while tying them to different properties in our state
                    value={meme.topText} //gives us and returns the current value to our state, it is a controlled component (state telling the input box what to do)
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    onChange={memeText}
                    name="bottomText"
                    value={meme.bottomText}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" alt="random internet memes"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
} 








