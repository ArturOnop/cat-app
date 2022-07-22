import Voting from "./Voting";
import ComponentHead from "./ComponentHead";
import Likes from "./Likes";

const Component = ({component}) => {

    let key = "0fff6597-9bbd-4b7f-9637-0543f743aef8";
    let config = {
        "Content-Type": "application/json",
        "x-api-key": key
    }
    let subId = "1Nart-20"

    return (
        <div className="component">
            <ComponentHead/>
            {component === "Voting" ?
                (<Voting config={config} subId={subId}/>) :
                component === "Likes" ?
                    (<Likes config={config} subId={subId}/>) :
                    <img className="home" src="/images/girl-and-pet.png" alt="girl and pet"/>}
        </div>
    )
}

export default Component;
