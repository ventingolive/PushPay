import React from 'react'
import { MovieType, PersonType } from '../../types'

interface Props {
    species: string,
    filmList: MovieType[],
    character: PersonType
}

const PersonDetails = ({species, filmList, character}: Props) => {
    return (
        <div className='person-details-top'>
            <h1 className='person-details-header'>Character Details</h1>
            <div className='person-details-kvp'>
                <p>name:</p>
                <p>{character.name}</p>
            </div>
            <div className='person-details-kvp'>
                <p>species:</p>
                <p>{species}</p>
            </div>
            <div className='person-details-film'>
                <p style={{color: 'tomato', paddingRight: '5px'}}>films:</p>
                <div>
                    {filmList.map((film, index) => (
                        <p key={index}>{film}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PersonDetails
