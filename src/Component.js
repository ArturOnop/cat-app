import Voting from "./Voting";
import ComponentHead from "./ComponentHead";

const Component = ({component}) => {

    let key = "0fff6597-9bbd-4b7f-9637-0543f743aef8";
    let config = {
        "Content-Type": "application/json",
        "x-api-key": key
    }

    return (
        <div className="component">
            {component === "Voting" ?
                (<>
                    <ComponentHead/>
                    <Voting config={config}/>
                </>) :
                <img className="home" src="/images/girl-and-pet.png" alt="girl and pet"/>}
        </div>
    )
}

export default Component;
