import {useContext} from "react";
import {ComponentContext} from "./App";
import {handleRouting} from "./hadleActiveNav";

const ComponentHead = () => {

    const setComponent = useContext(ComponentContext);

    return (
        <div className="componentHead">
            <div className="searchBar">
                <input type="text" placeholder="Search for breeds by name"/>
                <button>
                    <img src="/images/search-button.png" alt="search button"/>
                </button>
            </div>
            <div className="likeFavDislike">
                <button className="likePageButton" onClick={(event) => {
                    handleRouting(event);
                    return setComponent("Likes");
                }}>
                    <img src="/images/like-page-button.png" alt="like button"/>
                </button>
                <button className="favPageButton" onClick={(event) => {
                    handleRouting(event);
                    return setComponent("Favourites");
                }}>
                    <img src="/images/fav-page-button.png" alt="fav button"/>
                </button>
                <button className="dislikePageButton" onClick={(event) => {
                    handleRouting(event);
                    return setComponent("Dislikes");
                }}>
                    <img src="/images/dislike-page-button.png" alt="dislike button"/>
                </button>
            </div>
        </div>
    )
}

export default ComponentHead;