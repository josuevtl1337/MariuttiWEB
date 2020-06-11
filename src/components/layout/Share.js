import React from 'react'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';


const Share = (props) => {

    const wapptext = props.text.replace(/ /g, '%20')

    return(
        <div className="share-wrap" style={{marginTop: 24, marginBottom: 32}}>
            <h4 style={{fontSize: 14, marginLeft: 24, marginRight: 24}}>Compartir</h4>
            <a href={"http://www.facebook.com/sharer.php?u=" + props.url} target="_blank">
                <img src="https://image.flaticon.com/icons/svg/1384/1384005.svg" alt="" className="share-icon"/>
            </a>
            <a href={"https://twitter.com/share?url=" + props.url} target="_blank">
                <img src="https://image.flaticon.com/icons/svg/733/733635.svg" alt="" className="share-icon"/>
            </a>
            <a href={"whatsapp://send?text=" + wapptext + props.url} target="_blank">
                <img src="https://image.flaticon.com/icons/svg/733/733641.svg" alt="" className="share-icon"/>
            </a>
        </div>
    )
}

export default Share