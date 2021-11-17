import React from 'react'
import './HomeCarousel.css'
import {Carousel} from 'react-responsive-carousel'
import TeamCard from '../TeamCard/TeamCard'

export default function HomeCarousel(props) {

    return (
        <Carousel
            autoPlay
            centerMode={true}
            centerSlidePercentage={100}
            interval={7000}
            infiniteLoop={true}
            dynamicHeight={true}
            stopOnHover={true}
            showThumbs={false}
            // animationHandler="fade"
        >
            <div className="pic">
                <img src="./img/hots.jpg" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Heroes Of The Storm</p>
                    <p className="textSlide">M.O.B.A</p>
                    <div className="teamCard">
                        <TeamCard
                            moreVertIconId="more5"
                            menuID="menu5"
                            name="KMCSF"
                            gender="Team Amateur"
                            ranked="Silver / Gold"
                            icon="K"
                        />
                        <TeamCard
                            moreVertIconId="more6"
                            menuID="menu6"
                            name="NVALV"
                            gender="Team Amateur"
                            ranked="Gold / Platine"
                            icon="N"
                        />
                        <TeamCard
                            moreVertIconId="more7"
                            menuID="menu7"
                            name="GTO"
                            gender="Team Amateur"
                            ranked="Diamant +"
                            props="G"
                        />
                        <TeamCard
                            moreVertIconId="more8"
                            menuID="menu8"
                            name="PAIR"
                            gender="Team Amateur"
                            ranked="Master"
                            icon="P"
                        />
                    </div>
                </div>
            </div>
            <div className="pic">
                <img src="./img/pic2.jpg" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Jeux</p>
                    <p className="textSlide">Game Style</p>
                    <div className="teamCard">
                        <TeamCard
                            moreVertIconId="more5"
                            menuID="menu5"
                        />
                        <TeamCard
                            moreVertIconId="more6"
                            menuID="menu6"
                        />
                        <TeamCard
                            moreVertIconId="more7"
                            menuID="menu7"
                        />
                        <TeamCard
                            moreVertIconId="more8"
                            menuID="menu8"
                        />
                    </div>
                </div>
            </div>
            <div className="pic">
                <img src="./img/pic3.png" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Jeux</p>
                    <p className="textSlide">Game Style</p>
                    <div className="teamCard">
                        <TeamCard
                            moreVertIconId="more9"
                            menuID="menu9"
                        />
                        <TeamCard
                            moreVertIconId="more10"
                            menuID="menu10"
                        />
                        <TeamCard
                            moreVertIconId="more11"
                            menuID="menu11"
                        />
                        <TeamCard
                            moreVertIconId="more12"
                            menuID="menu12"
                        />
                    </div>
                </div>
            </div>
        </Carousel>
    )
}


// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>
