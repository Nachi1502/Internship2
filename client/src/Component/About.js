import React, { useEffect, useState } from 'react'
import { useNavigate,  } from "react-router-dom";


const About = () => {
  let navigate = useNavigate();
  const[userData,setUserData]=useState('')

const callAboutPage=async()=>{
  try{
   const res= await fetch('/about',{
    method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
      },
      credentials:"include"
    })

   const data= await res.json()
   setUserData(data)
   console.log(data)
   if(!data.status=== 200){
    const error = new Error(res.error)
    throw error
  }

  }catch(err){
   console.log(err.message)
   navigate("/signin");

  }
}

  useEffect(()=>{
     callAboutPage()
  },[])

 

  return (
    <div className='main-section'>
       <div className="wrapper">
        <div className="form-left">
            <h2 className="text-uppercase">information</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed. Diam volutpat commodo.
            </p>
            <p className="text">
                <span>Sub Head:</span>
                Vitae auctor eu augudsf ut. Malesuada nunc vel risus commodo viverra. Praesent elementum facilisis leo vel.
            </p>
            
        </div>
        <form className="form-right" method='GET'>
            <h2 className="text-uppercase">About</h2>
            <div className="row">
                <div className=" mb-3">
                    <label>Name</label>
                    
                    <h6>{userData.name}</h6>
                </div>
                
            </div>
            <div className="mb-3">
                <label>Email</label>
                <h6>{userData.email}</h6>
            </div>
            <div className="mb-3">
                <label>Phone No.</label>
                <h6>{userData.phone}</h6>
            </div>
            <div className="mb-3">
                <label>Profession</label>
                <h6>{userData.work}</h6>
            </div>
        </form>
    </div>
    </div>
  )
}

export default About
