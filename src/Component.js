import Voting from "./Voting";
import ComponentHead from "./ComponentHead";

const Component = ({component}) => {

    return (
        <>
            {component === "Voting" ?
                (<>
                    <ComponentHead/>
                    <Voting/>
                </>) :
                <img className="home" src="/images/girl-and-pet.png" alt="girl and pet"/>}
        </>
    )
}

export default Component;
