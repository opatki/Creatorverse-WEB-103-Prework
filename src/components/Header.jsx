import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header>
        <h1>CREATORVERSE</h1>
        <div className='head-buttons'>
          <Link to="/"className="button">VIEW ALL CREATORS</Link>
          <Link to="/add" className="button">ADD A CREATOR</Link>
        </div>
      </header>
    )
}