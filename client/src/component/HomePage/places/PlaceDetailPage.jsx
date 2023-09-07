import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"

const PlaceDetailPage = () => {
    
    const {id} = useParams();

    useEffect(()=>{
        if(!id){
            return ;
        }

        axios.get(`/place/placeDetailsPages/${id}`)
        .then(res =>{
            console.log(res);
        })
    },[id])
  return (
    <div className="mt-8 ">
         <h1></h1>  
    </div>
  )
}

export default PlaceDetailPage