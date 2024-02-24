import React, { useState, useRef } from 'react';
import "./yoga.css"
import { useHttpClient } from "../../../shared/components/hooks/http-hook";
import { AuthContext } from '../../../shared/context/auth-context';
import { useContext } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
const YogaBeni = (props) => {
    const yoga =props.yoga;
    console.log(yoga);
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
            console.log(responseData.yoga.Yoga);
          } 
          catch (err) {
            console.log(err);
          }
        };
        fetchBene();
      }
      , []);
    //   console.log(benifit);
    return (
<div class="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div class="max-w-xl">
      <h2 class="text-3xl font-bold sm:text-4xl">Benefits</h2>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
  <div class="flex items-start gap-3">
    <div className='benifit' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {benifit && benifit.benefits && benifit.benefits.length > 0 ?  (
        <h2 class="ml-4 mr-4 text-lg font-bold">{benifit.benefits[0]}</h2>
        ) : null}
    </div>
  </div>

  <div class="flex items-start gap-3">
    <div className='benifit' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {benifit && benifit.benefits && benifit.benefits.length > 0 ?  (
        <h2 class="ml-4 mr-4 text-lg font-bold">{benifit.benefits[1]}</h2>
        ) : null}
    </div>
  </div>

  <div class="flex items-start gap-3">
    <div className='benifit' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         {benifit && benifit.benefits && benifit.benefits.length > 0 ?  (
        <h2 class=" ml-4 mr-4 text-lg font-bold">{benifit.benefits[2]}</h2>
        ) : null}
    </div>
  </div>
</div>
  </div>
    );
}
export default YogaBeni;