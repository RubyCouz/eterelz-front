import React from 'react'
import StatsCard from '../Card/Card'
import Grid from '@mui/material/Grid'

export default function Stats() {

    return (
        <div>
            <Grid
                direction="row"
                justifyContent="space-around"
                container
                spacing={3}
                alignItems="center">
                <Grid item xs={6} sm={6} md={6}>
                    <StatsCard
                        moreVertIconId="statsMenuIcon1"
                        menuID="statsMenu1"
                        title="Something like Game name here"
                        firstContent="subheader"
                        secondContent="subheader"
                        content="some stats here"
                        firstAction="Action 1"
                        firstLink=""
                        secondAction="Action 2"
                        secondLink=""
                        thirdAction="Action 3"
                        thirdLink=""
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                    <StatsCard
                        moreVertIconId="statsMenuIcon2"
                        menuID="statsMenu2"
                        title="Something like Game name here"
                        firstContent="subheader"
                        secondContent="subheader"
                        content="some stats here"
                        firstAction="Action 1"
                        firstLink=""
                        secondAction="Action 2"
                        secondLink=""
                        thirdAction="Action 3"
                        thirdLink=""
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3} columns={{xs: 3, sm: 8, md: 12}}>
                <Grid item xs={4} sm={4} md={4}>
                    <StatsCard
                        moreVertIconId="statsMenuIcon3"
                        menuID="statsMenu3"
                        title="Something like Game name here"
                        firstContent="subheader"
                        secondContent="subheader"
                        content="some stats here"
                        firstAction="Action 1"
                        firstLink=""
                        secondAction="Action 2"
                        secondLink=""
                        thirdAction="Action 3"
                        thirdLink=""
                    />
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                    <StatsCard
                        moreVertIconId="statsMenuIcon4"
                        menuID="statsMenu4"
                        title="Something like Game name here"
                        firstContent="subheader"
                        secondContent="subheader"
                        content="some stats here"
                        firstAction="Action 1"
                        firstLink=""
                        secondAction="Action 2"
                        secondLink=""
                        thirdAction="Action 3"
                        thirdLink=""
                    />
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                    <StatsCard
                        moreVertIconId="statsMenuIcon5"
                        menuID="statsMenu5"
                        title="Something like Game name here"
                        firstContent="subheader"
                        secondContent="subheader"
                        content="some stats here"
                        firstAction="Action 1"
                        firstLink=""
                        secondAction="Action 2"
                        secondLink=""
                        thirdAction="Action 3"
                        thirdLink=""
                    />
                </Grid>
            </Grid>

        </div>
    )

}