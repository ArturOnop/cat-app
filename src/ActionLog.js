const ActionLog = ({log}) => {
    return (
        <div className="actionLog">
            <div className="logTime">
                {log.time}
            </div>
            <div className="logInfo">
                {log.type === "NoFavourites" ?
                    <>
                        Image ID: <span className="logImgId">{log.imageId}</span> was removed from Favourites
                    </> :
                    <>
                        Image ID: <span className="logImgId">{log.imageId}</span> was added to {log.type}
                    </>
                }
            </div>
            <div className="logImg">
                {log.type === "Likes" ?
                    <img src="/images/green-like.png" alt="like"/> :
                    log.type === "Dislikes" ?
                        <img src="/images/yellow-dislike.png" alt="like"/> :
                        log.type === "Favourites" ?
                            <img src="/images/pink-fav.png" alt="like"/> : null
                }
            </div>
        </div>
    )
}

export default ActionLog;
