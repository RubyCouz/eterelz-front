import React from 'react'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export default function FixedTags() {
    //Tags fixé par defaut en disable
    const fixedOptions = [tagsList[0]];
    //tags fixé par defaut en visible
    const [value, setValue] = React.useState([...fixedOptions, tagsList[2]]);

    return (
        <Autocomplete
            multiple
            id="fixed-tags-demo"
            value={value}
            onChange={(event, newValue) => {
                setValue([
                    ...fixedOptions,
                    ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                ]);
            }}
            options={tagsList}
            getOptionLabel={(option) => option.title}
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                    <Chip
                        label={option.title}
                        {...getTagProps({ index })}
                        disabled={fixedOptions.indexOf(option) !== -1}
                    />
                ))
            }
            style={{
                width: 500,
            }}
            renderInput={(params) => (
                <TextField {...params} label="Trier par :" variant="outlined" placeholder="Filtrer" />
            )}
        />
    );
}

// Liste des tags avec ses paramètres
const tagsList = [
    { title: 'Event archivés', year: 1994 },
    { title: 'Event à valider', year: 1972 },
    { title: 'Event rejoint', year: 1974 },
    { title: 'Event créé', year: 2008 },
];
