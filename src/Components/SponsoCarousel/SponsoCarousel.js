import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './SponsoCarousel.css'
const itemsLength = Array.from({ length: 5 });

const items = itemsLength.map((item, index) => {
    const style = { width: 150 + index * 100 };
    return (
        <div className="item" style={style}>
            <p className="sponsoItem">
                SPONSO  {index + 1}
            </p>
        </div>
    );
});

export default function SponsoCarousel() {
    return (
        <AliceCarousel
            disableButtonsControls={true}
            disableDotsControls={true}
            autoWidth
            infinite
            mouseTracking
            items={items}
        />
    )
}