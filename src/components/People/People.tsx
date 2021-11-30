import React, { ChangeEvent } from 'react'

import { fetchJson } from '../../api'
import { PersonType, MovieType } from '../../types'
import Person from '../Person'
import PersonDetails from '../PersonDetails'

function People() {
  const [people, setPeople] = React.useState<PersonType[]>([])
  const [searchPeople, setSearchPeople] = React.useState<PersonType[]>([])
  const [showPeopleDetails, setShowPeopleDetails] = React.useState<boolean>(false)
  const [sepcies, setSpecies] = React.useState<string>('coder')
  const [filmList, setFilmList] = React.useState<MovieType[]>([])
  const [selectedCharacter, setSelectedCharacter] = React.useState<PersonType>(people[0])

  const searchCharacters = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPeople(people.filter((character) => { return character.name.toLowerCase().includes(e.target.value.toLowerCase()) }))
  }

  const showCharacterDetails = async (character: PersonType) => {
    if (!showPeopleDetails) {
      let resultsArray = await fetchCharacterDetails(character)
      let localFilmList: MovieType[] = []
      resultsArray.forEach((value) => {
        if (value.name) {
          setSpecies(value.name)
        } else {
          localFilmList.push(value.title)
        }
      })
      setFilmList(localFilmList)
      setSelectedCharacter(character)
      setShowPeopleDetails(!showPeopleDetails)
    } else {
      setShowPeopleDetails(!showPeopleDetails)
    }
  }

  const fetchCharacterDetails = async (character: PersonType) => {
    return Promise.all([...character.films.map((film) => { return fetchJson(`${String(film).replace('https://swapi.dev/api/', '')}`) }), ...character.species.map((thing) => { return fetchJson(`${String(thing).replace('https://swapi.dev/api/', '')}`) })])
  }

  React.useEffect(() => {
    fetchJson<{ results: PersonType[] }>('people')
      .then(peopleResponse => setPeople(peopleResponse.results))
  }, [])

  return (
    <div>
      <input type='text' placeholder='Search Universe...' onChange={searchCharacters} />
      {searchPeople.map(person => <Person key={person.created} person={person} onClick={() => showCharacterDetails(person)} />)}
      {showPeopleDetails ? <PersonDetails species={sepcies} filmList={filmList} character={selectedCharacter} /> : null}
    </div>
  )
}

export default People
