import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {handleRouting} from "./hadleActiveNav";
import {ComponentContext} from "./App";

const LikesDislikes = ({config, subId, vote}) => {

    const setComponent = useContext(ComponentContext);
    let div = 1;

    const [images, setImages] = useState();
    const [error, setError] = useState();
    const [loaded, setLoaded] = useState();

    useEffect(() => {
        setImages([]);
        setLoaded(false);
        getImages();
    }, [vote]);


    const getImages = async () => {
        let objects = [];
        await axios.get(`https://api.thecatapi.com/v1/votes?${subId}`, {headers: config})
            .then((res) => {
                objects = res.data.filter((item) => item.value === vote);
            })
            .catch((error) => {
                setError(error);
            });
        await objects.forEach((object) => {
            axios.get(`https://api.thecatapi.com/v1/images/${object.image_id}?${subId}`, {headers: config})
                .then((res) => {
                    setImages(prevImages => [...prevImages, res.data].slice(0, 20));
                })
                .catch((error) => {
                    setError(error);
                });
        })
        setLoaded(true);
    }

    const giveDiv = () => {
        let giveDiv = div;
        if (div < 20) div += 1;
        else div = 1
        return `gridDiv${giveDiv}`
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
                    {vote ? "Likes" : "Dislikes"}
                </div>
            </div>
            {!loaded ? <div className="loader">Loading...</div> :
                error ? <div className="error">{error}</div> :
                    (<div className="grid contentMain">
                        {images[0] ? images.map((image) => (
                            <img className={giveDiv()} src={image.url} key={image.id} alt="cat"/>
                        )) : <div className="noItemsFound">No items found</div>}
                    </div>)}
        </div>
    )
}

export default LikesDislikes;
