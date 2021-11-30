import { PersonType } from '../../types';

interface PersonProps {
  person: PersonType,
  onClick: React.MouseEventHandler<HTMLDivElement>
}

function Person({ person, onClick }: PersonProps) {
  return <div className='person' onClick={onClick}>{person.name}</div>
}

export default Person
