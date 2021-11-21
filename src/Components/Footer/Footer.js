import React from 'react'
import Grid from '@material-ui/core/Grid'

import './Footer.css'
import Box from "@material-ui/core/Box";

export default function Footer() {

    return (
        <div>
            <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item xs={1}>
                    <div>
                        <img src="./img/eterelz/logo/logo_blanc.png" alt="" className="logo"/>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div>
                        <p className="footerTitle">ETERELZ</p>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <Grid
                        container
                        spacing={12}
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Grid item xs={12}>
                            <ul className="plateformList">
                                <li>
                                    <img src="./img/eterelz/icons/youtube.png" alt="youtube icon" className="icon"/>
                                </li>
                                <li>
                                    <img src="./img/eterelz/icons/twitter.png" alt="twiter icon" className="icon"/>
                                </li>
                                <li>
                                    <img src="./img/eterelz/icons/facebook.png" alt="facebook icon" className="icon"/>
                                </li>
                                <li>
                                    <img src="./img/eterelz/icons/discord.png" alt="discord icon" className="icon"/>
                                </li>
                                <li>
                                    <img src="./img/eterelz/icons/twitch.png" alt="twitch icon" className="icon"/>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item xs={3} sm={3} md={3}>
                    <h2>Recrutement</h2>
                    <h2>Infos sur la commu Eterelz</h2>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias culpa cum dolorum fugit harum
                        hic molestias neque nesciunt non omnis porro quasi quibusdam quisquam, ratione recusandae
                        suscipit veritatis voluptas!
                    </p>
                </Grid>
                <Grid item xs={3} sm={3} md={3}>
                    <Box xs={{ textAlign: 'left'}}>
                        <ul>
                            <li>
                                <a href="https://mui.com/system/flexbox/#align-items" title="redirection">Liens 1</a>
                            </li>
                            <li>
                                <a href="https://mui.com/system/flexbox/#align-items" title="redirection">Liens 2</a>
                            </li>
                            <li>
                                <a href="https://mui.com/system/flexbox/#align-items" title="redirection">Liens 3</a>
                            </li>
                            <li>
                                <a href="https://mui.com/system/flexbox/#align-items" title="redirection">Liens 4</a>
                            </li>
                            <li>
                                <a href="https://mui.com/system/flexbox/#align-items" title="redirection">Liens 5</a>
                            </li>
                        </ul>
                    </Box>
                </Grid>
            </Grid>
            <Grid container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
            >
                <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{ textAlign: 'center'}}>
                        <span>@ 2021 Eterelz. All right reserved</span>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )

}