import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

const Signup = () => {
 
  let navigate = useNavigate();

 const[user,setUser]=useState({
      name:"",email:'',phone:'',work:'',password:'',cpassword:''
 })

const postData= async(e)=>{
    e.preventDefault()

    const {name,email,phone,work,password,cpassword}=user

    const res = await fetch("/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,phone,work,password,cpassword
      })


    })

    const data= await res.json()

    if(data.status=== 422 || !data){  
      window.alert("invalid registration")
      console.log("invalid registration")
    }
    else{
      window.alert("Successful registration")
      console.log("Successful registration")

      navigate("/signin");
    }
 

  }



 let name, value;
const handleInputs=(e)=>{
  console.log(e)
  name = e. target.name;
  value = e. target. value;
  setUser({...user, [name] :value});
  
}


  return (
    <>
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
            <div className="form-field">
                <input type="submit" className="account" value="Have an Account?"/>
            </div>
        </div>
        <form className="form-right" method='POST'>
            <h2 className="text-uppercase">Registration form</h2>
            <div className="row">
                <div className=" mb-3">
                    <label>Name</label>
                    <input type="text" name="name" id="name" className="input-field"
                      value={user.name}
                      onChange={handleInputs}
                    />
                </div>
                
            </div>
            <div className="mb-3">
                <label>Email</label>
                <input type="email" className="input-field" name="email" required
                   value={user.email}
                    onChange={handleInputs}
                />
            </div>
            <div className="mb-3">
                <label>Phone No.</label>
                <input type="number" className="input-field" name="phone" required
                   value={user.phone}
                      onChange={handleInputs}
                />
            </div>
            <div className="mb-3">
                <label>Profession</label>
                <input type="text" className="input-field" name="work" required
                   value={user.work}
                      onChange={handleInputs}
                />
            </div>
            <div className="row">
                <div className="col-sm-6 mb-3">
                    <label>Password</label>
                    <input type="password" name="password" id="pwd" className="input-field"
                       value={user.password}
                      onChange={handleInputs}
                    />
                </div>
                <div className="col-sm-6 mb-3">
                    <label>Confirm Password</label>
                    <input type="password" name="cpassword" id="cpwd" className="input-field"
                       value={user.cpassword}
                      onChange={handleInputs}
                    />
                </div>
            </div>
           
            <div className="form-field">
                <input type="submit" value="Register" className="register" name="signup"
                  onClick={postData}
                />
            </div>
        </form>
    </div>
    </div>
    </>
  )
}

export default Signup
