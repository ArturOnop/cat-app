import {handleRouting} from "./hadleActiveNav";
import ActionLog from "./ActionLog";
import {useContext, useEffect, useState} from "react";
import {ComponentContext} from "./App";
import axios from "axios";

const Favourites = ({config, subId}) => {

    const setComponent = useContext(ComponentContext);
    let div = 1;

    const [images, setImages] = useState([]);
    const [error, setError] = useState();
    const [loaded, setLoaded] = useState(false);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        getImages();
    }, []);

    const getImages = async () => {
        let objects = [];
        await axios.get(`https://api.thecatapi.com/v1/favourites?${subId}`, {headers: config})
            .then((res) => {
                objects = res.data;
            })
            .catch((error) => {
                setError(error);
            });
        setImages(objects.slice(0, 20));
        setLoaded(true);
    }

    const handleLog = (type, image) => {
        let date = new Date();
        setLogs(prevLogs => [{
            time: `${date.getHours()}:${date.getMinutes()}`,
            imageId: image.id,
            type: type
        }, ...prevLogs].slice(0, 4));
    }

    const handleRemoveFav = async (image) => {
        console.log(image);
        await axios.delete(`https://api.thecatapi.com/v1/favourites/${image.id}`, {headers: config})
            .catch((error) => {
                setError(error);
            });
        handleLog("NoFavourites", image.image);
        getImages();
    }

    const giveDiv = () => {
        let giveDiv = div;
        if (div < 20) div += 1;
        else div = 1
        return `gridDiv${giveDiv} favImage`
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
                    Favourites
                </div>
            </div>
            {!loaded ? <div className="loader">Loading...</div> :
                error ? <div className="error">{error}</div> :
                    (<>
                        <div className="grid contentMain">
                            {images[0] ? images.map((image) => (
                                <div className={giveDiv()}
                                     onClick={() => handleRemoveFav(image)}>
                                    <img src={image.image.url}
                                         key={image.image.id} alt="cat"/>
                                    <img src="/images/unFav.png"
                                         className="unFav"
                                         alt="remove from favourite"/>
                                </div>
                            )) : <div className="noItemsFound">No items found</div>}
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

export default Favourites;
