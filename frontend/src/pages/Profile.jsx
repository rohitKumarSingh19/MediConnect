// import React from "react";
// const Profile=()=>{
//     return(
//         <div>Profile</div>
//     )
// }
// export default Profile;
import React from "react";
import { useEffect,useState} from "react";
import API from "../api/api";
export default function Profile(){
    const [profile,setProfile]=useState(null);
    useEffect(()=>{
        API.get('/users/profile')
        .then((res)=>setProfile(res.data))
        .catch((err)=>
        console.log(err));
    },[]);
    if(!profile) return <p>Loading profile...</p>
    return(
        <div>
            <h2>Welcome {profile.name}</h2>
            <p>Email:{profile.email}</p>
            <p>Role:{profile.email}</p>
            <p>Contact:{profile.contact}</p>
        </div>
    )

}

