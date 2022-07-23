import {useContext, useEffect, useState} from "react";
import {ComponentContext} from "./App";
import axios from "axios";
import {handleRouting} from "./hadleActiveNav";

const Search = ({config, subId, search}) => {

    const setComponent = useContext(ComponentContext);
    let div = 1;

    const [images, setImages] = useState([]);
    const [error, setError] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setImages([]);
        setLoaded(false);
        getImages();
    }, [search]);

    const getImages = async () => {
        let breeds = [];
        await axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${search}`, {headers: config})
            .then((res) => {
                breeds = res.data.filter((breed) => breed.reference_image_id !== undefined);
            })
            .catch((error) => {
                setError(error);
            });
        await breeds.forEach((breed) => {
            axios.get(`https://api.thecatapi.com/v1/images/${breed.reference_image_id}`, {headers: config})
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
        return `gridDiv${giveDiv} searchImage`
    }

    return (
        <div className="componentPage">
            <div className="componentPageHeadFull">
                <div className="componentPageHead">
                    <button className="returnButton" onClick={(event) => {
                        handleRouting(event);
                        return setComponent(null);
                    }}>
                        <img src="/images/return-button.png" alt="return button"/>
                    </button>
                    <div className="pageName">
                        Search
                    </div>
                </div>
                <div className="searchInfo">
                    Search result for: <span>{search}</span>
                </div>
            </div>
            {!loaded ? <div className="loader">Loading...</div> :
                error ? <div className="error">{error}</div> :
                    (<div className="grid contentMain">
                        {images[0] ? images.map((image) => (
                            <div className={giveDiv()}>
                                <img src={image.url} key={image.id} alt="cat"/>
                                <div className="breedName">
                                    {image.breeds[0].name}
                                </div>
                            </div>
                        )) : <div className="noItemsFound">No items found</div>}
                    </div>)}
        < /div>
    )
}

export default Search;
