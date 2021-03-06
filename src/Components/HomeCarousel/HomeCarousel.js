import React from 'react'
import './HomeCarousel.css'
import {Carousel} from 'react-responsive-carousel'
import Card from '../Card/Card'
import {Box} from "@mui/material";
// import IconButton from "@mui/material/IconButton";

// function PlayArrowIcon() {
//     return null;
// }

export default function HomeCarousel(props) {

    return (
        <Carousel
            centerMode={true}
            centerSlidePercentage={100}
            interval={7000}
            infiniteLoop={true}
            dynamicHeight={true}
            stopOnHover={true}
            showThumbs={false}
            className="carousel"
        >
            <div className="pic">
                <img src="./img/carousel/hots.jpg" alt="pic" className="gamePic"/>
                <div className="legend">
                    <p className="titleSlide">Heroes of the Storm</p>
                    <p className="textSlide">M.O.B.A</p>
                    <Box className="teamCard" sx={{ display: {xs: 'none', md: 'block'}}}>
                        <Card
                            moreVertIconId="more1"
                            menuID="menu1"
                            title="KMCSF"
                            firstContent="Team Amateur"
                            secondContent="Silver / Gold"
                            icon="./img/ranked/logo_or.png"
                            firstAction="Contacter le Capitaine"
                            secondAction="Voir profil Heroes Lounge"
                            thirdAction="Voir leurs derniers matchs"
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                        <Card
                            moreVertIconId="more2"
                            menuID="menu2"
                            title="NVALV"
                            firstContent="Team Amateur"
                            secondContent="Gold / Platine"
                            icon="./img/team/logo/NVALV.png"
                            firstAction="Contacter le Capitaine"
                            secondAction="Voir profil Heroes Lounge"
                            thirdAction="Voir leurs derniers matchs"
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                        <Card
                            moreVertIconId="more3"
                            menuID="menu3"
                            title="GTO"
                            icon="./img/ranked/logo_platine.png"
                            firstContent="Team Amateur"
                            secondContent="Diamant +"
                            props="./img/ranked/logo_platine.png"
                            firstAction="Contacter le Capitaine"
                            secondAction="Voir profil Heroes Lounge"
                            thirdAction="Voir leurs derniers matchs"
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                        <Card
                            moreVertIconId="more4"
                            menuID="menu4"
                            title="PAIR"
                            icon="./img/ranked/logo_elite.png"
                            firstContent="Team Amateur"
                            secondContent="Master"
                            firstAction="Contacter le Capitaine"
                            secondAction="Voir profil Heroes Lounge"
                            thirdAction="Voir leurs derniers matchs"
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                    </Box>
                </div>
            </div>
            <div className="pic">
                <img src="./img/carousel/Warhammer.jpg" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Warhammer 40'000 : Darktide</p>
                    <p className="textSlide">M.M.O.F.P.S</p>
                    <Box className="teamCard" sx={{ display: {xs: 'none', md: 'block'}}}>
                        <Card
                            moreVertIconId="more5"
                            menuID="menu5"
                            title="Communaut??"
                            firstContent="Warhammer"
                            secondContent="40'000"
                            firstAction="Rejoindre la communaut??"
                            firstLink="https://discord.gg/86W82Xc"
                            secondAction="Se renseigner sur la licence"
                            secondLink="https://warhammer40000.com/fr"
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                        <Card
                            moreVertIconId="more6"
                            menuID="menu6"
                            title="Top 1 Cabale FR W40k"
                            firstContent="Martyr Inquisition"
                            secondContent="(Prophecy)"
                            firstAction="Rejoindre la Cabale (PC & Console)"
                            firstLink="https://discord.gg/86W82Xc"
                            secondAction="Plus d'informations sur le jeu"
                            secondLink="https://store.steampowered.com/app/527430/Warhammer_40000_Inquisitor__Martyr/"
                            thirdAction="Plus d'informations sur les d??veloppeurs"
                            thirdLink="https://neocoregames.com/en"
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                    </Box>
                </div>
            </div>
            <div className="pic">
                <img src="./img/carousel/battlefield-2042.jpg" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Battlefield 2042</p>
                    <p className="textSlide">M.M.O.F.P.S</p>
                    <Box className="teamCard" sx={{ display: {xs: 'none', md: 'block'}}}>
                        <Card
                            moreVertIconId="more7"
                            menuID="menu7"
                            title="Communaut?? Battlefield"
                            firstContent=""
                            secondContent=""
                            firstAction="Rejoindre la communaut??"
                            firstLink="https://discord.gg/86W82Xc"
                            secondAction="Plus d'informations sur le jeu"
                            secondLink="https://store.steampowered.com/app/1517290/Battlefield_2042/"
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                        <Card
                            moreVertIconId="more8"
                            menuID="menu8"
                            title="Suivez notre Streamer AffiliatZ : HellrogIV"
                            url="https://www.twitch.tv/videos/1170102944"
                            link="https://www.twitch.tv/hellrogiv"
                            firstContent=""
                            secondContent=""
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                    </Box>
                </div>
            </div>
            <div className="pic">
                <img src="./img/carousel/naraka.jpg" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Naraka</p>
                    <p className="textSlide">Battle Royale</p>
                    <Box className="teamCard" sx={{ display: {xs: 'none', md: 'block'}}}>
                        <Card
                            moreVertIconId="more9"
                            menuID="menu9"
                            title="Communaut?? Naraka"
                            firstContent=""
                            secondContent=""
                            firstAction="Rejoindre la communaut??"
                            firstLink="https://discord.gg/86W82Xc"
                            secondAction="Plus d'informations sur le jeu"
                            secondLink="https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/"
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                    </Box>
                </div>
            </div>
            <div className="pic">
                <img src="./img/carousel/halo.jpg" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Halo</p>
                    <p className="textSlide">M.M.O.F.P.S</p>
                    <Box className="teamCard" sx={{ display: {xs: 'none', md: 'block'}}}>
                        <Card
                            moreVertIconId="more10"
                            menuID="menu10"
                            title="Communaut?? Halo"
                            firstContent=""
                            secondContent=""
                            firstAction="Rejoindre la communaut??"
                            firstLink="https://discord.gg/86W82Xc"
                            secondAction="Plus d'informations sur le jeu"
                            secondLink="https://store.steampowered.com/app/1240440/Halo_Infinite/"
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                        <Card
                            moreVertIconId="moreHalo"
                            menuID="menuHalo"
                            title="With Attitude"
                            icon="./img/team/logo/wa.png"
                            firstContent="Team T4"
                            secondContent="Onyx"
                            firstAction="Contacter le Capitaine"
                            secondAction="Voir profil"
                            thirdAction="Voir leurs derniers matchs"
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                    </Box>
                </div>
            </div>
            <div className="pic">
                <img src="./img/carousel/destiny.jpg" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Destiny</p>
                    <p className="textSlide">M.M.O.F.P.S</p>
                    <Box className="teamCard" sx={{ display: {xs: 'none', md: 'block'}}}>
                        <Card
                            moreVertIconId="more11"
                            menuID="menu11"
                            title="Communaut?? Destiny"
                            firstContent=""
                            secondContent=""
                            firstAction="Rejoindre la communaut??"
                            firstLink="https://discord.gg/86W82Xc"
                            secondAction="Plus d'informations sur le jeu"
                            secondLink="https://store.steampowered.com/app/1085660/Destiny_2/"
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                    </Box>
                </div>
            </div>
            <div className="pic">
                <img src="./img/carousel/dofus.png" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">Dofus</p>
                    <p className="textSlide">M.M.O.R.P.G</p>
                    <Box className="teamCard" sx={{ display: {xs: 'none', md: 'block'}}}>
                        <Card
                            moreVertIconId="more12"
                            menuID="menu12"
                            title="Communaut?? Ankama"
                            firstContent=""
                            secondContent=""
                            firstAction="Rejoindre la Guilde Boune (Dofus Retro)"
                            firstLink="https://discord.gg/86W82Xc"
                            secondAction="Plus d'informations sur Waven"
                            secondLink="https://www.waven-game.com/fr/"
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                        <Card
                            moreVertIconId="more13"
                            menuID="menu13"
                            title="Suivez notre Streamer AffiliatZ Peaceotto"
                            firstContent=""
                            secondContent=""
                            firstAction={<a href="https://www.twitch.tv/peaceotto">Twitch</a>}
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                        <Card
                            moreVertIconId="more14"
                            menuID="menu14"
                            title="Suivez notre Streamer AffiliatZ Petitdbl"
                            firstContent=""
                            secondContent=""
                            firstAction={<a href="https://www.twitch.tv/petitdbl">Twitch</a>}
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                    </Box>
                </div>
            </div>
            <div className="pic">
                <img src="./img/carousel/lol.jpg" alt="pic"/>
                <div className="legend">
                    <p className="titleSlide">League of Legends</p>
                    <p className="textSlide">M.O.B.A</p>
                    <Box className="teamCard" sx={{ display: {xs: 'none', md: 'block'}}}>
                        <Card
                            moreVertIconId="more15"
                            menuID="menu15"
                            title="Communaut?? LoL"
                            firstContent=""
                            secondContent=""
                            firstAction="Cr??er ou rejoindre une ??quipe"
                            firstLink="https://discord.gg/86W82Xc"
                            secondAction="D??fiez ou proposer un ??v??nement et/ou tournoi"
                            secondLink="https://discord.gg/86W82Xc"
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                        <Card
                            moreVertIconId="more16"
                            menuID="menu16"
                            title={<a href="https://www.twitch.tv/deepanalyst" target="_blanked">Suivez notre Coach (Master Jungle) AffiliatZ</a>}
                            firstContent=""
                            secondContent=""
                            url="https://www.twitch.tv/videos/1200846507"
                            bgUrl="./img/background/bg_eterelz.jpg"
                            opacity="0.5"
                        />
                    </Box>
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
