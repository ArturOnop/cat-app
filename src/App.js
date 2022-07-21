import Nav from "./Nav";
import {useState} from "react";

function App() {

    const [component, setComponent] = useState();

    return (
        <div className="app">
            <Nav setComponent={setComponent}/>
            <img className="home" src="/images/girl-and-pet.png" alt="girl and pet"/>
        </div>
    );
}

export default App;
