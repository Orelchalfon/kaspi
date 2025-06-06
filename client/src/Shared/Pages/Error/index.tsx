//implement a comprehensive error page

import { Link } from "react-router-dom";
import "./index.scss";
const Error = () => {
  return (
    <div className={'error'}>
      <h1 className={'error__header'}>404</h1>
      <h2 className={'error__subheader'}>Page Not Found</h2>
      <Link to='/Kaspi/' className={'error__link'}>
        Back to Home
      </Link>
    </div>
  );
};

export default Error;
