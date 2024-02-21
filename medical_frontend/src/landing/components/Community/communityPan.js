import React,{useState} from "react";
import CommunitySide from "./community_side";
import CommunityChat from "./community_chat";
import {useContext, useEffect} from "react";
import { useHttpClient } from "../../../shared/components/hooks/http-hook";
import { AuthContext } from '../../../shared/context/auth-context';
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
const CommunityPandemic = () => {
    const auth = useContext(AuthContext);
    const [data,setData]=useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
              const responseData = await sendRequest(
                `https://medvita-community-api.onrender.com/api/community/get-posts/Pandemic`,
                'GET',
                null,
                {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${auth.token}`
                }
              );
              setData(responseData.posts);
            //   console.log(responseData.posts);
            
            } 
            catch (err) {
              console.log(err);
            }
          };
          fetchProfile();
      }, []);
    return(
        <>
       <div style={{ display: 'flex' }}>
        <div style={{ width: '20%', position: 'fixed', height: '100vh' }}>
            <CommunitySide/>
        </div>
        <div style={{ width: '100%', marginLeft: '20%', overflowY: 'scroll', height: '100vh' }}>
            <CommunityChat data3={data} type={"Pandemic"}/>
        </div>
         </div>
        </>
    )
}
export default CommunityPandemic;