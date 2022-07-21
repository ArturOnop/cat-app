import Nav from "./Nav";
import {useState} from "react";
import Component from "./Component";

function App() {

    const [component, setComponent] = useState();

    return (
        <div className="app">
            <Nav setComponent={setComponent}/>
            <Component component={component}/>
        </div>
    );
}

export default App;
