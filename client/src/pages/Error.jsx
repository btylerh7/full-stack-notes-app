import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className="container">
      <p>
        Sorry. The page you requested was not found. Please go back to your
        dashboard:
      </p>
      <Link to="/">Dashboard</Link>
    </div>
  )
}

export default Error
