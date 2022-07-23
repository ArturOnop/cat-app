import {useContext, useEffect, useState} from "react";
import {ComponentContext} from "./App";
import axios from "axios";

const UploadModule = ({config, subId}) => {
    const setComponent = useContext(ComponentContext);

    const [image, setImage] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");

    useEffect(() => {
        const uploadArea = document.querySelector(".uploadArea");

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
        })

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            let i = e.dataTransfer.files[0];
            if (i.type === "image/jpeg" || i.type === "image/png") {
                setUploadStatus("ok");
                setImage(e.dataTransfer.files[0]);
                document.querySelector(".uploadArea").classList.add("ok");
            } else {
                setUploadStatus("error");
                e.dataTransfer.clearData();
                document.querySelector(".uploadArea").classList.add("error");
            }
        })
    }, [image])

    const handleUpload = async () => {
        await axios.post(`https://api.thecatapi.com/v1/images/upload`, {
            file: image,
            sub_id: subId
        }, {headers: config})
            .then((res) => console.log(res))
            .catch(() => {
                setUploadStatus("error");
            });
    }

    return (
        <>
            <div className="uploadModule">
                <button className="uploadExit" onClick={() => setComponent("Gallery")}>
                    <img src="/images/exit-button.png" alt="exit"/>
                </button>
                <div className="uploadDescription">
                    <div className="uploadTitle">
                        Upload a .jpg or .png Cat Image
                    </div>
                    <div className="uploadGuide">
                        Any uploads must comply with the <a href="https://thecatapi.com/privacy">upload
                        guidelines</a> or
                        face deletion.
                    </div>
                </div>
                <div className="uploadArea">
                    <img src="/images/upload-placeholder.png" alt="placeholder"/>
                    <div>Drop image here</div>
                </div>
                <div className="uploadFooter">
                    <div className="uploadFileName">
                        {image ? <>Image File Name: {image.name}</> : <>No file selected</>}
                    </div>
                    {uploadStatus === "ok" ?
                        <button className="uploadButtonModule" onClick={() => handleUpload()}>
                            Upload photo
                        </button> : null}
                    {uploadStatus === "ok" ?
                        <div className="uploadStatus">
                            <img src="/images/ok-upload.png" alt="ok to upload"/>
                            <div>File is ready to upload!</div>
                        </div> :
                        uploadStatus === "error" ?
                            <div className="uploadStatus">
                                <img src="/images/error-upload.png" alt="error occurred"/>
                                <div>Some problem occurred. Try another image!</div>
                            </div> : null}

                </div>
            </div>
            <div className="darkBackground"></div>
        </>
    )
}

export default UploadModule;
