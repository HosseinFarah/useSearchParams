import  Axios  from "axios"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Link, useSearchParams } from "react-router-dom";

export const ApiLists = ()=>{
    const [apiState,setApiState] = useState([]);
    const [searchFilter,setSerachFilter] = useSearchParams();
    const {isLoading} = useQuery(["api"],()=>{
        return getApi();
    })
    const getApi = ()=>{
        Axios.get("https://api.publicapis.org/entries").then((res)=>setApiState(res.data.entries))
        isLoading && alert("Please Wait,Loading...")
    }
    useEffect(()=>{
        getApi();
    },[apiState])
    return(
        <div className="container" style={{padding:"15px"}}>
        <input type="search" className="form-control"
        placeholder="Search API Name"
            value={searchFilter.get("filter") || ""}
            onChange={(e)=>{
                let filter = e.target.value;
                if(filter) return setSerachFilter({filter:filter})
                else return setSerachFilter({})
            }}
        />
        <div className="card-body col-8">
                {apiState.filter((api)=>{
                    let filter = searchFilter.get("filter");
                    if(!filter) return true
                    const name = api.API.toLowerCase();
                    return name.includes(filter.toLowerCase())
                }).map((api,index)=>{
                   return <div className="card" key={index} style={{padding:"25px", margin:"15px"}}>
                        <h5 className="card-title">Api Name: {api.API}</h5>
                        <h5 className="card-title">Description: {api.Description}</h5>
                        <Link to={api.Link} target="_blank"><h5 className="card-title">{api.Link}</h5></Link>
                    </div>
                })
                
                }
        </div>
        </div>
    )
}