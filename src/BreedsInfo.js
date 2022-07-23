import {useContext} from "react";
import {ComponentContext} from "./App";
import {handleRouting} from "./hadleActiveNav";

const BreedsInfo = ({selectedBreedInfo}) => {
    const setComponent = useContext(ComponentContext);

    return (
        <div className="componentPage">
            <div className="componentPageHead">
                <button className="returnButton" onClick={(event) => {
                    handleRouting(event);
                    return setComponent("Breeds");
                }}>
                    <img src="/images/return-button.png" alt="return button"/>
                </button>
                <div className="pageName unActive">
                    Breeds
                </div>
                <div className="breedId">
                    {selectedBreedInfo.id}
                </div>
            </div>
            <div className="breedInfo">
                <div className="breedInfoImage">
                    <img src={selectedBreedInfo.image.url} alt="cat"/>
                </div>
                <div className="breedInfoDescription">
                    <div className="breedInfoName">
                        {selectedBreedInfo.name}
                    </div>
                    <div className="breedInfoStats">
                        <div className="breedInfoTemp">
                            <span>Temperament: </span><br/>
                            {selectedBreedInfo.temperament}
                        </div>
                        <div className="breedInfoOWL">
                            <div className="breedInfoOrigin">
                                <span>Origin: </span>
                                {selectedBreedInfo.origin}
                            </div>
                            <div className="breedInfoWeight">
                                <span>Weight: </span>
                                {selectedBreedInfo.weight.metric} kgs
                            </div>
                            <div className="breedInfoLife">
                                <span>Life span: </span>
                                {selectedBreedInfo.life_span} years
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        < /div>
    )
}

export default BreedsInfo;
