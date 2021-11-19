import React from 'react'
import './HomeCarousel.css'
import {Carousel} from 'react-responsive-carousel'
import TeamCard from '../TeamCard/TeamCard'
import IconButton from "@mui/material/IconButton";

function PlayArrowIcon() {
    return null;
}

export default function HomeCarousel(props) {

    return (
        <Carousel
            // autoPlay
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
                <img src="./img/carousel/hots.jpg" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Heroes Of The Storm</p>
                    <p className="textSlide">M.O.B.A</p>
                    <IconButton aria-label="delete">
                        <PlayArrowIcon/>
                    </IconButton>
                    <div className="teamCard">
                        <TeamCard
                            moreVertIconId="more5"
                            menuID="menu5"
                            title="KMCSF"
                            firstContent="Team Amateur"
                            secondContent="Silver / Gold"
                            icon="./img/ranked/logo_or.png"
                            firstAction="Contacter le Capitaine"
                            secondAction="Voir profil Heroes Lounge"
                            thirdAction="Voir leurs derniers matchs"
                        />
                        <TeamCard
                            moreVertIconId="more6"
                            menuID="menu6"
                            title="NVALV"
                            firstContent="Team Amateur"
                            secondContent="Gold / Platine"
                            icon="./img/team/logo/NVALV.png"
                            firstAction="Contacter le Capitaine"
                            secondAction="Voir profil Heroes Lounge"
                            thirdAction="Voir leurs derniers matchs"
                        />
                        <TeamCard
                            moreVertIconId="more7"
                            menuID="menu7"
                            title="GTO"
                            firstContent="Team Amateur"
                            secondContent="Diamant +"
                            props="./img/ranked/logo_platine.png"
                            firstAction="Contacter le Capitaine"
                            secondAction="Voir profil Heroes Lounge"
                            thirdAction="Voir leurs derniers matchs"
                        />
                        <TeamCard
                            moreVertIconId="more8"
                            menuID="menu8"
                            title="PAIR"
                            firstContent="Team Amateur"
                            secondContent="Master"
                            icon="./img/ranked/logo_master.png"
                            firstAction="Contacter le Capitaine"
                            secondAction="Voir profil Heroes Lounge"
                            thirdAction="Voir leurs derniers matchs"
                        />
                    </div>
                </div>
            </div>
            <div className="pic">
                <img src="./img/carousel/Warhammer.jpg" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Warhammer Darktide</p>
                    <p className="textSlide">M.M.O / F.P.S</p>
                    <div className="teamCard">
                        <TeamCard
                            moreVertIconId="more5"
                            menuID="menu5"
                            title="Communauté"
                            firstContent="Warhammer"
                            secondContent="40'000"
                            firstAction="Rejoindre la communauté"
                            firstLink="https://discord.gg/86W82Xc"
                            secondAction="Se renseigner sur la licence"
                            secondLink="https://warhammer40000.com/fr"
                        />

                        <TeamCard
                            moreVertIconId="more8"
                            menuID="menu8"
                            title="Top 1 Cabale FR W40k"
                            firstContent="Martyr Inquisition"
                            secondContent="(Prophecy)"
                            firstAction="Rejoindre la Cabale (PC & Console)"
                            firstLink="https://discord.gg/86W82Xc"
                            secondAction="Plus d'informations sur le jeu"
                            secondLink="https://store.steampowered.com/app/527430/Warhammer_40000_Inquisitor__Martyr/"
                            thirdAction="Plus d'informations sur les développeurs"
                            thirdLink="https://neocoregames.com/en"
                        />
                    </div>
                </div>
            </div>
            <div className="pic">
                <img src="./img/carousel/battlefield-2042.jpg" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Battlefield 2042</p>
                    <p className="textSlide">M.M.O / F.P.S</p>
                    <div className="teamCard">
                        <TeamCard
                            moreVertIconId="more9"
                            menuID="menu9"
                            title="Communauté Battlefield"
                            firstContent=""
                            secondContent=""
                            firstAction="Rejoindre la communauté"
                            firstLink="https://discord.gg/86W82Xc"
                            secondAction="Plus d'informations sur le jeu"
                            secondLink="https://store.steampowered.com/app/1517290/Battlefield_2042/"
                        />
                        <TeamCard
                            moreVertIconId="more9"
                            menuID="menu9"
                            title={<a href="https://www.twitch.tv/hellrogiv" target="_blanked">Suivez notre Coach</a>}
                            firstContent=""
                            secondContent=""
                        />
                    </div>
                </div>
            </div>
            <div className="pic">
                <img src="./img/carousel/naraka.jpg" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Naraka</p>
                    <p className="textSlide">Battle Royale</p>
                    <div className="teamCard">
                        <TeamCard
                            moreVertIconId="more9"
                            menuID="menu9"
                            title="Communauté Naraka"
                            firstContent=""
                            secondContent=""
                            firstAction="Rejoindre la communauté"
                            firstLink="https://discord.gg/86W82Xc"
                            secondAction="Plus d'informations sur le jeu"
                            secondLink="https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/"
                        />
                    </div>
                </div>
            </div>
            <div className="pic">
                <img src="./img/carousel/halo.jpg" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Halo</p>
                    <p className="textSlide">M.M.O / F.P.S</p>
                    <div className="teamCard">
                        <TeamCard
                            moreVertIconId="more9"
                            menuID="menu9"
                            title="Communauté Halo"
                            firstContent=""
                            secondContent=""
                            secondAction="Rejoindre la communauté"
                            secondLink="https://discord.gg/86W82Xc"
                            thirdAction="Plus d'informations sur le jeu"
                            thirdLink="https://store.steampowered.com/app/1240440/Halo_Infinite/"
                        />
                    </div>
                </div>
            </div>
            <div className="pic">
                <img src="./img/carousel/destiny.jpg" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Destiny</p>
                    <p className="textSlide">M.M.O / F.P.S</p>
                    <div className="teamCard">
                        <TeamCard
                            moreVertIconId="more9"
                            menuID="menu9"
                            title="Communauté Destiny"
                            firstContent=""
                            secondContent=""
                            firstAction="Rejoindre la communauté"
                            firstLink="https://discord.gg/86W82Xc"
                            secondAction="Plus d'informations sur le jeu"
                            secondLink="https://store.steampowered.com/app/1085660/Destiny_2/"
                        />
                    </div>
                </div>
            </div>
            <div className="pic">
                <img src="./img/carousel/dofus.png" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Dofus</p>
                    <p className="textSlide">M.M.O.R.P.G</p>
                    <div className="teamCard">
                        <TeamCard
                            moreVertIconId="more9"
                            menuID="menu9"
                            title="Communauté Ankama"
                            firstContent=""
                            secondContent=""
                            firstAction="Rejoindre la Guilde Boune (Dofus Retro)"
                            firstLink="https://discord.gg/86W82Xc"
                            secondAction="Plus d'informations sur Waven"
                            secondLink="https://www.waven-game.com/fr/"
                        />
                        <TeamCard
                            moreVertIconId="more9"
                            menuID="menu9"
                            title="Suivez notre Streamer AffiliatZ"
                            firstContent={<a href="https://www.twitch.tv/peaceotto" target="_blanked">Peaceotto</a>}
                            secondContent=""
                        />
                        <TeamCard
                            moreVertIconId="more9"
                            menuID="menu9"
                            title={<a href="https://www.twitch.tv/petitdbl" target="_blanked">Suivez notre Streamer AffiliatZ</a>}
                            firstContent=""
                            secondContent=""
                        />
                    </div>
                </div>
            </div>
            <div className="pic">
                <img src="./img/carousel/lol.jpg" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">League of Legends</p>
                    <p className="textSlide">M.O.B.A</p>
                    <div className="teamCard">
                        <TeamCard
                            moreVertIconId="more9"
                            menuID="menu9"
                            title="Communauté LoL"
                            firstContent=""
                            secondContent=""
                            firstAction="Créer ou rejoindre une équipe"
                            firstLink="https://discord.gg/86W82Xc"
                            secondAction="Défiez ou proposer un événement et/ou tournoi"
                            secondLink="https://discord.gg/86W82Xc"
                        />
                        <TeamCard
                            moreVertIconId="more9"
                            menuID="menu9"
                            title={<a href="https://www.twitch.tv/deepanalyst" target="_blanked">Suivez notre Coach</a>}
                            firstContent="(Master Jungle)"
                            secondContent="AffiliatZ"
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
