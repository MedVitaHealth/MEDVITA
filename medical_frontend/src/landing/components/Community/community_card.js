import React from "react";
import {useState} from "react";
import "./community.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUp } from '@fortawesome/free-solid-svg-icons'
import { useHttpClient } from "../../../shared/components/hooks/http-hook";
import { AuthContext } from '../../../shared/context/auth-context';
import { useContext } from "react";
import { useEffect } from "react";
const CommunityCard = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const data = props.data;
  const handleUp = async() => {
    try {
      await sendRequest(
        `https://medvita-community-api.onrender.com/api/community/add-up-vote/${data.id}`,
        'PATCH',
        null,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`
        }
        );
    } catch (err) {
        console.log(err);
        }

  };
  // console.log(data);
  
    return(
        <div className="pt-2 pb-8" style={{ width: '90%', height: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <article className="comcard rounded-xl  bg-blue-900 bg-opacity-60" style={{ width: '80%', height: '80%', justifyContent: 'center', alignItems: 'center' }}>
        <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8" style={{justifyContent:'center', alignItems: 'center'}}>

        <div>
      <h3 className="font-medium sm:text-lg text-gray-300">
        <div  className="hover:underline"> {data.title} </div>
      </h3>

      <p className="mt-2  text-sm text-gray-200">
        {data.content}
      </p>

      <div className="mt-4 sm:flex sm:items-center sm:gap-2">
        <div className="flex items-center gap-1 text-gray-100">
        <button className="upvote" onClick={handleUp}>
        <FontAwesomeIcon icon={faCircleUp} />
    </button>

          <p className=" text-xs">{data.upVotes} upvotes</p>
        </div>

        <span className="hidden sm:block" aria-hidden="true">&middot;</span>

        <p className="hidden sm:block sm:text-xs sm:text-gray-100">
          Posted by
          <a href="#" className="font-medium underline hover:text-gray-700"> {data.creatorName} </a>
        </p>
      </div>
    </div>
  </div>

</article>
        </div>
    )
}
export default CommunityCard;