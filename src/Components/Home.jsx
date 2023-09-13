import { useContext } from "react";
import { siteName } from "../App";
export const Home = () => {
  const {site}=useContext(siteName);
  return (
    <div className="container">
      <h1 className="mt-5"> Used With : useContext,useQuery,react-hook-form,yup,@hookform/resolvers,useState,useParams,useNavigate</h1>
      <div className="alert alert-primary" role="alert">
        Main Page .
        <br/>
        <h5>Fav Name: {site}</h5>
      </div>
    </div>
  );
};
