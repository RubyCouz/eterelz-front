import React from 'react'
import './Footer.css'
import { Box, Grid } from "@mui/material"

import '@fortawesome/fontawesome-free/css/all.min.css'

export default function Footer() {

    return (
        <>
            <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item>
                    <div>
                        <img src="./img/eterelz/logo/logo_blanc.png" alt="" className="logo"/>
                        <span className="footerTitle">ETERELZ</span>
                    </div>
                </Grid>
                <Grid item>
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
                                    <i className="fab fa-youtube fa-3x icon youtubeIcon"/>
                                </li>
                                <li>
                                    <i className="fab fa-twitter fa-3x icon twitterIcon"/>
                                </li>
                                <li>
                                    <i className="fab fa-twitch fa-3x icon twitchIcon"/>
                                </li>
                                <li>
                                    <i className="fab fa-facebook-f fa-3x icon facebookIcon"/>
                                </li>
                                <li>
                                    <i className="fab fa-discord fa-3x icon discordIcon"/>
                                </li>
                                <li>
                                    <i className="fab fa-tiktok fa-3x icon tiktokIcon"/>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item xs={6} sm={3} order={{ xs: 1, sm: 1 }}>
                    <h2>Recrutement</h2>
                    <h2>Infos sur la commu Eterelz</h2>
                </Grid>
                <Grid item xs={12} sm={6} order={{ xs: 3, sm: 2 }}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias culpa cum dolorum fugit harum
                        hic molestias neque nesciunt non omnis porro quasi quibusdam quisquam, ratione recusandae
                        suscipit veritatis voluptas!
                    </p>
                </Grid>
                <Grid item xs={6} sm={3} order={{ xs: 2, sm: 3 }}>
                    <Box>
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
                <Grid item xs={12}>
                    <Box sx={{ textAlign: 'center'}}>
                        <span>@ 2021 Eterelz. All right reserved</span>
                    </Box>
                </Grid>
            </Grid>
        </>
    )

}