import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {ComponentContext} from "./App";
import {handleRouting} from "./hadleActiveNav";
import ActionLog from "./ActionLog";

const Voting = ({config, subId}) => {

    const setComponent = useContext(ComponentContext);

    const [img, setImg] = useState();
    const [error, setError] = useState();
    const [loaded, setLoaded] = useState(false);
    const [fav, setFav] = useState(null);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        handleImage();
    }, []);

    const handleImage = async () => {
        await axios.get("https://api.thecatapi.com/v1/images/search", {headers: config})
            .then((res) => setImg(res.data[0]))
            .catch((error) => {
                setError(error.message);
            });
        setLoaded(true);
    }

    const handleLike = async () => {
        await axios.post("https://api.thecatapi.com/v1/votes", {
            image_id: img.id,
            sub_id: subId,
            value: 1
        }, {headers: config})
            .catch((error) => {
                setError(error.message);
            });
        setLoaded(false);
        setFav(null);
        handleImage();
        handleLog("Likes");
    }

    const handleFav = async (event) => {
        if (!fav) {
            event.currentTarget.innerHTML = "<img src=\"/images/fav-button-filled.png\" alt=\"like\"/>";
            await axios.post("https://api.thecatapi.com/v1/favourites", {
                image_id: img.id,
                sub_id: subId,
            }, {headers: config})
                .then(res => setFav(res.data.id))
                .catch((error) => {
                    setError(error.message);
                });
            handleLog("Favourites");
        } else {
            event.currentTarget.innerHTML = "<img src=\"/images/fav-button.png\" alt=\"liked\"/>";
            await axios.delete(`https://api.thecatapi.com/v1/favourites/${fav}`, {headers: config})
                .catch((error) => {
                    setError(error.message);
                });
            setFav(null);
            handleLog("NoFavourites");
        }
    }

    const handleDislike = async () => {
        await axios.post("https://api.thecatapi.com/v1/votes", {
            image_id: img.id,
            sub_id: subId,
            value: 0
        }, {headers: config})
            .catch((error) => {
                setError(error.message);
            });
        setLoaded(false);
        setFav(null);
        handleImage();
        handleLog("Dislikes");
    }

    const handleLog = (type) => {
        let date = new Date();
        setLogs(prevLogs => [{
            time: `${date.getHours()}:${date.getMinutes()}`,
            imageId: img.id,
            type: type
        }, ...prevLogs].slice(0, 4));
    }

    return (
        <div className="componentPage">
            <div className="componentPageHead">
                <button className="returnButton" onClick={(event) => {
                    handleRouting(event);
                    return setComponent(null);
                }}>
                    <img src="/images/return-button.png" alt="return button"/>
                </button>
                <div className="pageName">
                    Voting
                </div>
            </div>
            {!loaded ? <div className="loader">Loading...</div> :
                error ? <div className="error">{error}</div> :
                    (<>
                        <div className="contentMain">
                            <img src={img.url} alt="random cat"/>
                            <div className="votingOptions">
                                <button className="votingLike" onClick={(event) => handleLike(event)}>
                                    <img src="/images/like-button.png" alt="like"/>
                                </button>
                                <button className="votingFav" onClick={(event) => handleFav(event)}>
                                    <img src="/images/fav-button.png" alt="fav"/>
                                </button>
                                <button className="votingDislike" onClick={(event) => handleDislike(event)}>
                                    <img src="/images/dislike-button.png" alt="dislike"/>
                                </button>
                            </div>
                        </div>
                        <div className="actionLogs">
                            {logs ? logs.map((log) => (
                                <ActionLog log={log} key={log.imageId}/>
                            )) : null}
                        </div>
                    </>)}
        < /div>
    )
}

export default Voting;
