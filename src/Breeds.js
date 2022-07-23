import {useContext, useEffect, useState} from "react";
import {ComponentContext} from "./App";
import axios from "axios";
import {handleRouting} from "./hadleActiveNav";

const Breeds = ({config, subId, setSelectedBreedInfo}) => {
    const setComponent = useContext(ComponentContext);
    let div = 1;

    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState("");
    const [selectedLimit, setSelectedLimit] = useState(10);
    const [selectedOrder, setSelectedOrder] = useState("RANDOM");
    const [images, setImages] = useState([]);
    const [error, setError] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setImages([]);
        setLoaded(false);
        getBreeds();
        getImages();
    }, [selectedBreed, selectedLimit, selectedOrder]);

    const getBreeds = async () => {
        await axios.get(`https://api.thecatapi.com/v1/breeds`, {headers: config})
            .then((res) => {
                setBreeds(res.data)
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    const getImages = async () => {
        let url = `https://api.thecatapi.com/v1/breeds?limit=100`;
        if (selectedBreed) url = `https://api.thecatapi.com/v1/breeds`;
        let result = [];
        await axios.get(url, {headers: config})
            .then((res) => {
                if (selectedBreed) result = res.data.filter((breed) => breed.id === selectedBreed);
                else if (selectedOrder === "ASC") {
                    result = res.data.filter((image) => image.image)
                        .sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
                    orderActive(selectedOrder);
                } else if (selectedOrder === "DESC") {
                    result = res.data.filter((image) => image.image)
                        .sort((a, b) => (a.name > b.name) ? -1 : (a.name < b.name) ? 1 : 0);
                    orderActive(selectedOrder);
                } else result = res.data.filter((image) => image.image);

                setImages(result.slice(0, selectedLimit));
            })
            .catch((error) => {
                setError(error.message);
            });
        setLoaded(true);
    }

    const orderActive = (order) => {
        let selected = document.querySelector(".selected");
        if (selected) selected.classList.remove("selected");
        if (order === "ASC") document.querySelector(".selectSearchAsc").classList.add("selected");
        else document.querySelector(".selectSearchDesc").classList.add("selected");
    }

    const giveDiv = () => {
        let giveDiv = div;
        if (div < 20) div += 1;
        else div = 1
        return `gridDiv${giveDiv} breedImage`
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
                        Breeds
                    </div>
                    <select name="breeds" className="selectBreed" onChange={(event) => {
                        setSelectedBreed(event.target.value);
                    }}>
                        <option value={""}>All breeds</option>
                        {breeds[0] ? breeds.map((breed) => {
                            return <option value={breed.id}>{breed.name}</option>
                        }) : ""}
                    </select>
                    <select name="limit" className="selectLimit" onChange={(event) => {
                        setSelectedLimit(Number(event.target.value));
                    }}>
                        <option value="5">Limit: 5</option>
                        <option value="10" selected>Limit: 10</option>
                        <option value="15">Limit: 15</option>
                        <option value="20">Limit: 20</option>
                    </select>
                    <button className="selectSearchDesc" onClick={() => setSelectedOrder("DESC")}>
                        <img src="/images/desc-button.png" alt="desc"/>
                    </button>
                    <button className="selectSearchAsc" onClick={() => setSelectedOrder("ASC")}>
                        <img src="/images/asc-button.png" alt="asc"/>
                    </button>
                </div>
            </div>
            {!loaded ? <div className="loader">Loading...</div> :
                error ? <div className="error">{error}</div> :
                    (<div className="grid contentMain">
                        {images ? images.map((image) => (
                            <div className={giveDiv()} onClick={(event) => {
                                handleRouting(event);
                                setSelectedBreedInfo(image);
                                return setComponent("BreedsInfo");
                            }}>
                                <img src={image.image.url} key={image.image.id} alt="cat"/>
                                <div className="breedName">
                                    {image.name ? image.name : ""}
                                </div>
                            </div>
                        )) : <div className="noItemsFound">No items found</div>}
                    </div>)}
        < /div>
    )
}

export default Breeds;
