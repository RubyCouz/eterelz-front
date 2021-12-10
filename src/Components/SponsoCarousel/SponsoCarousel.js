import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './SponsoCarousel.css'
import 'animate.css'

const sponsoPic = [
   "sg",
    "steam",
    "mrWhite",
    "twitch",
    "blizzard",
    "discord",
    "hl",
    "gr"
]

const sponsoUrl = [
    "https://www.behance.net/seb_graph",
    "https://store.steampowered.com/",
    "https://mrwhi7e.me/",
    "https://www.twitch.tv/",
    "https://www.blizzard.com/fr-fr/",
    "https://discord.com/",
    "https://heroeslounge.gg/",
    "https://gameandrules.com/",
    ]

const items = sponsoUrl.map(( url, index, key) => {
    return (
        <div className="item sponsoItem " data-value="1">
            <a href={url} target="_blanked" title={url}>
                {/*<img*/}
                {/*    src={sponsoPic[index]}*/}
                {/*    alt={sponsoPic[index]}*/}
                {/*    title={sponsoPic[index]}*/}
                {/*    className="sponsoPic"*/}
                {/*/>*/}
                <svg id={"spritesvg1"} viewBox="0 0 34 10" className="sponsoPic">
                    <use xlinkHref={"./img/sponso/sponso.svg#" + sponsoPic[index]}/>
                </svg>
            </a>
        </div>
        )
})


export default function SponsoCarousel() {
    return (
        <AliceCarousel
            autoPlay={true}
            autoPlayInterval={5000}
            disableButtonsControls={true}
            disableDotsControls={true}
            touchTracking={true}
            autoWidth
            infinite
            mouseTracking
            items={items}
        />
    )
}