import React, { useState, useRef } from 'react';
import "./yoga.css"
import { useHttpClient } from "../../../shared/components/hooks/http-hook";
import { AuthContext } from '../../../shared/context/auth-context';
import { useContext } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
const YogaVideo = (props) => {
    const yoga =props.yoga;
    const auth = useContext(AuthContext);
    const [benifit , setBenifit] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    useEffect(() => {
        const fetchBene = async () => {
          try {
            const responseData = await sendRequest(
              `https://medvita-community-api.onrender.com/api/blogs-tips-yogas/get-yoga`,
              'GET',
              null,
              {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`
              }
            );
            setBenifit(responseData.yoga.Yoga[yoga]);
          } 
          catch (err) {
            console.log(err);
          }
        };
        fetchBene();
      }
      , []);
      console.log(benifit.video);
    return (
        <div className='mt-4 ml-4 mr-4 mb-4'>
             <video src={`https://medvita-community-api.onrender.com${benifit.video}`}width="450" height="600" controls>
    </video>
        </div>
    );
}
export default YogaVideo;