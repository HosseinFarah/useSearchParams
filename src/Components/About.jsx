import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Axios from "axios";
import { Link ,Outlet, useSearchParams } from "react-router-dom";
export const About = () => {
  const [serach,setSearch]= useSearchParams();
  const [uni, setUni] = useState([]);
  const { data } = useQuery(["uni"], () => {
    return getData()
  });
  const getData =()=>{
    Axios.get(
      "http://universities.hipolabs.com/search?country=United+States"
    ).then((res) => setUni(res.data))
  }
console.log(uni);
useEffect(()=>{
  getData()
},[uni])
  return (
    <div className="container mt-5">
      <div className="row">
      <div className="col-6">
        <div className=" card-body" >
        <input className="form-control" type="search" placeholder="Search University"
          value={serach.get("filter") || ""}
          onChange={(e)=>{
            let filter = e.target.value;
            if(filter) return setSearch({filter:filter})
            else return setSearch({})
          }}
        />
        {uni.filter((name)=>{
            let filter = serach.get("filter");
            if(!filter) return true
            let uniname = name.name.toLowerCase();
            return uniname.includes(filter.toLowerCase()) 
        })
          
          .map((name,index)=>{
          return(
            <div key={index} className="card" style={{padding:"20px",margin:"15px"}}>
               <Link to={name.name}><h6 className="card-title">{name.name}</h6></Link>
              <h5 className="card-item">{name.country}</h5>
              <h5 className="card-text">{name.domains[0]}</h5>       
              <h6 className="card-link">{name.web_pages}</h6>
            </div>
          )
        })}
        </div>
        </div>
        <div className="col-6">
          
        </div>
      </div>
    </div>
  );
};
