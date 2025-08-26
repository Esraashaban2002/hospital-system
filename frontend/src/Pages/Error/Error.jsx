import { Link } from "react-router-dom"

const Error = () => {
  return (
    <>
      <div className="container "id="Error">
        <h1 className="text-center my-5">404 Page Error</h1>
        <div className="d-flex justify-content-center align-items-center my-5 ">
        <Link to={'/'}>
        <button className="button">Go To Home Page</button>
        </Link>
        </div>
       
      </div>
    </>
  )
}

export default Error
