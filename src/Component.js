import Voting from "./Voting";
import ComponentHead from "./ComponentHead";
import LikesDislikes from "./LikesDislikes";
import Favourites from "./Favourites";
import Search from "./Search";
import {useState} from "react";
import Breeds from "./Breeds";

const Component = ({component}) => {

    let key = "0fff6597-9bbd-4b7f-9637-0543f743aef8";
    let config = {
        "Content-Type": "application/json",
        "x-api-key": key
    }
    let subId = "1Nart-20"

    const [search, setSearch] = useState("");

    return (
        <div className="component">
            {component === "Voting" ?
                <>
                    <ComponentHead setSearch={setSearch}/>
                    <Voting config={config} subId={subId}/>
                </> :
                component === "Likes" ?
                    <>
                        <ComponentHead setSearch={setSearch}/>
                        <LikesDislikes config={config} subId={subId} vote={1}/>
                    </> :
                    component === "Dislikes" ?
                        <>
                            <ComponentHead setSearch={setSearch}/>
                            <LikesDislikes config={config} subId={subId} vote={0}/>
                        </> :
                        component === "Favourites" ?
                            <>
                                <ComponentHead setSearch={setSearch}/>
                                <Favourites config={config} subId={subId}/>
                            </> :
                            component === "Search" ?
                                <>
                                    <ComponentHead setSearch={setSearch}/>
                                    <Search config={config} subId={subId} search={search}/>
                                </> :
                                component === "Breeds" ?
                                    <>
                                        <ComponentHead setSearch={setSearch}/>
                                        <Breeds config={config} subId={subId}/>
                                    </> :
                                    <img className="home" src="/images/girl-and-pet.png" alt="girl and pet"/>}
        </div>
    )
}

export default Component;
