import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";


const Logout = ({ setIsLoggedIn }) => {
    let navigate = useNavigate();


    useEffect(()=>{
        fetch('/logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
              },
              credentials:"include"
        }).then((res)=>{   setIsLoggedIn(false); navigate("/signin");
        if(res.status!= 200){
           const error = new Error(res.error)
           throw error
          }
    }).catch((err)=>{console.log(err)})
    })
  return (
    <div>
      
    </div>
  )
}

export default Logout
