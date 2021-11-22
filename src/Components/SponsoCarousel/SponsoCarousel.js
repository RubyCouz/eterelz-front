import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './SponsoCarousel.css'

const sponsoPic = [
   "./img/sponso/blizzard.jpg",
    "./img/sponso/discord.jpg",
    "./img/sponso/gamesandrules.png",
    "./img/sponso/LogoMrWhi7e.png",
    "./img/sponso/SEBASTIEN2x.png",
    "./img/sponso/steam-logo-2002-present.png",
    "./img/sponso/twitch.png",
    "./img/sponso/dl.jfif"
]

const sponsoUrl = [
    "https://www.blizzard.com/fr-fr/",
    "https://discord.com/",
    "https://gameandrules.com/",
    "https://mrwhi7e.me/",
    "https://www.behance.net/seb_graph",
    "https://store.steampowered.com/",
    "https://www.twitch.tv/",
    "https://heroeslounge.gg/"
    ]

const items = sponsoUrl.map(( url, index) => {
    return (
        <div className="item sponsoItem" data-value="1">
            <a href={url} target="_blanked" title={url}>
                <img
                    src={sponsoPic[index]}
                    alt={sponsoPic[index]}
                    title={sponsoPic[index]}
                    className="sponsoPic"
                />
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