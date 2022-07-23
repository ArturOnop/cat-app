import {useContext, useEffect, useState} from "react";
import {ComponentContext} from "./App";
import axios from "axios";
import {handleRouting} from "./hadleActiveNav";

const Gallery = ({config, subId}) => {
    const setComponent = useContext(ComponentContext);
    let div = 1;

    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState("");
    const [selectedLimit, setSelectedLimit] = useState(10);
    const [selectedOrder, setSelectedOrder] = useState("RANDOM");
    const [selectedType, setSelectedType] = useState("All");
    const [images, setImages] = useState([]);
    const [error, setError] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setImages([]);
        setLoaded(false);
        getBreeds();
        getImages();
    }, []);

    const getBreeds = async () => {
        await axios.get(`https://api.thecatapi.com/v1/breeds`, {headers: config})
            .then((res) => {
                setBreeds(res.data)
            })
            .catch((error) => {
                setError(error);
            });
    }

    const getImages = async () => {
        await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${selectedLimit}&order=${selectedOrder}&mime_types=${selectedType}&breed_id=${selectedBreed}`, {headers: config})
            .then((res) => {
                setImages(res.data);
            })
            .catch((error) => {
                setError(error);
            });
        setLoaded(true);
    }

    const handleAddFav = async (image, event) => {
        await axios.post(`https://api.thecatapi.com/v1/favourites`, {
            image_id: image.id,
            sub_id: subId,
        }, {headers: config})
            .catch(() => {
            });
        event.target.classList.add("added");
    }

    const giveDiv = () => {
        let giveDiv = div;
        if (div < 20) div += 1;
        else div = 1
        return `gridDiv${giveDiv} galleryImage`
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
                    Gallery
                </div>
                <button className="uploadButton" onClick={() => setComponent("UploadModule")}>
                    <img src="/images/upload-button.png" alt="upload"/>
                    <div>Upload</div>
                </button>
            </div>
            <div className="galleryFilters">
                <div className="selectOrderGallery">
                    <label>Order</label>
                    <select name="order" onChange={(event) => {
                        setSelectedOrder(event.target.value);
                    }}>
                        <option value="RANDOM">Random</option>
                        <option value="DESC">Desc</option>
                        <option value="ASC">Asc</option>
                    </select>
                </div>
                <div className="selectBreedGallery">
                    <label>Breed</label>
                    <select name="breed" onChange={(event) => {
                        setSelectedBreed(event.target.value);
                    }}>
                        <option value={""}>None</option>
                        {breeds[0] ? breeds.map((breed) => {
                            return <option value={breed.id}>{breed.name}</option>
                        }) : ""}
                    </select>
                </div>
                <div className="selectTypeGallery">
                    <label>Type</label>
                    <select name="type" onChange={(event) => {
                        setSelectedType(event.target.value);
                    }}>
                        <option value="">All</option>
                        <option value="png,jpg">Static</option>
                        <option value="gif">Animated</option>
                    </select>
                </div>
                <div className="selectLimitGallery">
                    <label>Limit</label>
                    <select name="limit" onChange={(event) => {
                        setSelectedLimit(Number(event.target.value));
                    }}>
                        <option value="5">Limit: 5</option>
                        <option value="10" selected>Limit: 10</option>
                        <option value="15">Limit: 15</option>
                        <option value="20">Limit: 20</option>
                    </select>
                </div>
                <button className="reloadButton" onClick={() => getImages()}>
                    <img src="/images/reload-button.png" alt="reload"/>
                </button>
            </div>
            {!loaded ? <div className="loader">Loading...</div> :
                error ? <div className="error">{error}</div> :
                    (<div className="grid contentMain">
                        {images[0] ? images.map((image) => (
                            <div className={giveDiv()}
                                 onClick={(event) => handleAddFav(image, event)}>
                                <img src={image.url} key={image.id} alt="cat"/>
                                <img src="/images/fav.png"
                                     className="fav"
                                     alt="add to favourite"/>
                            </div>
                        )) : <div className="noItemsFound">No items found</div>}
                    </div>)}
        < /div>
    )
}

export default Gallery;
