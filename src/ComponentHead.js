const ComponentHead = () => {
    return (
        <div className="componentHead">
            <div className="searchBar">
                <input type="text" placeholder="Search for breeds by name"/>
                <button>
                    <img src="/images/search-button.png" alt="search button"/>
                </button>
            </div>
            <div className="likeFavDislike">
                <button className="likePageButton">
                    <img src="/images/like-page-button.png" alt="like button"/>
                </button>
                <button className="favPageButton">
                    <img src="/images/fav-page-button.png" alt="fav button"/>
                </button>
                <button className="dislikePageButton">
                    <img src="/images/dislike-page-button.png" alt="dislike button"/>
                </button>
            </div>
        </div>
    )
}

export default ComponentHead;