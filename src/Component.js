import Voting from "./Voting";
import ComponentHead from "./ComponentHead";
import LikesDislikes from "./LikesDislikes";

const Component = ({component}) => {

    let key = "0fff6597-9bbd-4b7f-9637-0543f743aef8";
    let config = {
        "Content-Type": "application/json",
        "x-api-key": key
    }
    let subId = "1Nart-20"

    return (
        <div className="component">
            {component === "Voting" ?
                <>
                    <ComponentHead/>
                    <Voting config={config} subId={subId}/>
                </> :
                component === "Likes" ?
                    <>
                        <ComponentHead/>
                        <LikesDislikes config={config} subId={subId} vote={1}/>
                    </> :
                    component === "Dislikes" ?
                        <>
                            <ComponentHead/>
                            <LikesDislikes config={config} subId={subId} vote={0}/>
                        </> :
                        <img className="home" src="/images/girl-and-pet.png" alt="girl and pet"/>}
        </div>
    )
}

export default Component;
