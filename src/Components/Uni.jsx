import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Axios from "axios";
export const Uni = ()=>{
    const navigate = useNavigate()
        const {UNI} = useParams();
        const [uni, setUni] = useState([]);
        const { data } = useQuery(["uni"], () => {
          return getData()
        });
        const getData = ()=>{
            Axios.get(
                "http://universities.hipolabs.com/search?country=United+States"
              ).then((res) => setUni(res.data))
        }
        useEffect(()=>{
            getData()
        },[uni])
    return(
        <div className="container">

            {uni.map((uni)=>{
            if(uni.name === UNI) return <div className="card-body">
                    <h5 className="card-title"><span style={{color:"blue"}}>University Name:</span> {uni.name}</h5>
                    <h5 className="card-text"><span style={{color:"blue"}}>webSite: </span>{uni.web_pages}</h5>
                    <h5 className="card-text"><span style={{color:"blue"}}>Domain Name:</span> {uni.domains}</h5>
                    <button onClick={()=>{navigate("/uni/")}}>Back</button>
            </div>
            else return false
            } 
            
            
            )}
        </div>
    )
}