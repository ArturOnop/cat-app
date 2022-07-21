const Nav = ({setComponent}) => {
    return (
        <div className="nav">
            <div className="upperNav">
                <div className="logo">
                    <img src="/images/logo.png" alt="logo"/>
                </div>
                <div className="theme">
                    <label className="switch">
                        <input type="checkbox"/>
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
                <div className="navOption">
                    <div className="navImage voteTableImg">
                        <img src="/images/vote-table.png" alt="vote table"/>
                    </div>
                    <div className="navOptionButton">
                        Voting
                    </div>
                </div>
                <div className="navOption">
                    <div className="navImage petBreedsImg">
                        <img src="/images/pet-breeds.png" alt="pet breeds"/>
                    </div>
                    <div className="navOptionButton">
                        Breeds
                    </div>
                </div>
                <div className="navOption">
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