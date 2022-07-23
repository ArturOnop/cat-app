import {useContext, useEffect, useState} from "react";
import {ComponentContext} from "./App";
import {handleRouting} from "./hadleActiveNav";

const Nav = ({component}) => {

    const setComponent = useContext(ComponentContext);

    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (dark) changeToDark();
        else changeToLight();
    }, [component, dark])

    const changeToDark = () => {
        document.querySelector("body").classList.add("dark");
    }

    const changeToLight = () => {
        document.querySelectorAll(".dark").forEach((element) => {
            element.classList.remove("dark");
        });
    }

    return (
        <div className="nav">
            <div className="upperNav">
                <div className="logo" onClick={(event) => {
                    handleRouting(event);
                    return setComponent(null);
                }}>
                    <img src="/images/logo.png" alt="logo"/>
                </div>
                <div className="theme">
                    <label className="switch">
                        <input type="checkbox" onClick={() => setDark(prevState => !prevState)}/>
                        <span className="slider"/>
                    </label>
                </div>
            </div>
            <div className="navInfo">
                <div className="navTitle">
                    Hi intern!
                </div>
                <div className="navDescription">
                    Welcome to MI 2022 Front-end test
                </div>
                <div className="navFooter">
                    Lets start using The Cat API
                </div>
            </div>
            <div className="navOptions">
                <div className="navOption" onClick={(event) => {
                    handleRouting(event);
                    return setComponent("Voting");
                }}>
                    <div className="navImage voteTableImg">
                        <img src="/images/vote-table.png" alt="vote table"/>
                    </div>
                    <div className="navOptionButton">
                        Voting
                    </div>
                </div>
                <div className="navOption" onClick={(event) => {
                    handleRouting(event);
                    return setComponent("Breeds");
                }}>
                    <div className="navImage petBreedsImg">
                        <img src="/images/pet-breeds.png" alt="pet breeds"/>
                    </div>
                    <div className="navOptionButton">
                        Breeds
                    </div>
                </div>
                <div className="navOption" onClick={(event) => {
                    handleRouting(event);
                    return setComponent("Gallery");
                }}>
                    <div className="navImage imagesSearchImg">
                        <img src="/images/images-search.png" alt="images search"/>
                    </div>
                    <div className="navOptionButton">
                        Gallery
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav;