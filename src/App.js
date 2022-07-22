import Nav from "./Nav";
import {createContext, useState} from "react";
import Component from "./Component";

export const ComponentContext = createContext();

function App() {

    const [component, setComponent] = useState();

    return (
        <div className="app">
            <ComponentContext.Provider value={setComponent}>
                <Nav/>
                <Component component={component}/>
            </ComponentContext.Provider>
        </div>
    );
}

export default App;
