import React from "react";
import "./pregnency.css"
import pregbg from "../../../images/pregbg.png"
import ChatBot from "./chatbot";
import { useState } from "react";
import { useHttpClient } from "../../../shared/components/hooks/http-hook";
import { AuthContext } from '../../../shared/context/auth-context';
import { useContext } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
const Pregency=()=>{
    const auth = useContext(AuthContext);
    const [tips, setTips] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    useEffect(() => {
      const fetchBlog = async () => {
        try {
          const responseData = await sendRequest(
            `https://medvita-community-api.onrender.com/api/blogs-tips-yogas/get-tips`,
            'GET',
            null,
            {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.token}`
            }
          );
          setTips(responseData.tips.Tips);
        } 
        catch (err) {
          console.log(err);
        }
      };
      fetchBlog();
    }
    , []);
    const randomTips = [...tips].sort(() => 0.5 - Math.random()).slice(0, 3);
    // console.log(randomTips[0]);
    // console.log(randomTips[0].tip);
    return(
        <div className="bg-grey-900 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          {isLoading && <LoadingSpinner asOverlay text="Fetching Your Dashboard..."/>}
            <div className="h-full  rounded-lg bg-gray-200 lg:col-span-2 flex items-stretch">
            <ChatBot className="w-full h-full"/>
        <div className="bg-blue-200 h-full w-full rounded-lg ">
  <section className="bg-pink-600 bg-opacity-20 text-black h-full w-full">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="mx-auto max-w-lg text-center">
      <h2 className="text-3xl font-bold sm:text-4xl fontStyle1">Daily Tips
      </h2>

    </div>

    <div className="mt-8 flex flex-col items-center justify-center">
    <article
  className="mb-4 w-3/4 hover:animate-background rounded-xl bg-gradient-to-r from-pink-300 via-blue-300 to-pink-300 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
>
    <div className="rounded-[10px] bg-white bg-opacity-80 p-4 !pt-20 sm:p-6">
        <div>
        {randomTips.length > 0 ? (
            <h3 className="text-center mt-0.5 text-lg font-medium text-gray-900">
              {randomTips[0].tip}
            </h3>
          ) : null}
        </div>
    </div>
    </article>
    <article
  className="mb-4 w-3/4 hover:animate-background rounded-xl bg-gradient-to-r from-pink-300 via-blue-300 to-pink-300 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
>
    <div className="rounded-[10px] bg-white bg-opacity-80 p-4 !pt-20 sm:p-6">
        <div>
        {randomTips.length > 0 ? (
          <h3 className="text-center mt-0.5 text-lg font-medium text-gray-900">
            {randomTips[1].tip}
          </h3>
        ) : null}
        </div>
    </div>
    </article>
    <article
  className="mb-4 w-3/4 hover:animate-background rounded-xl bg-gradient-to-r from-pink-300 via-blue-300 to-pink-300 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
>
    <div className="rounded-[10px] bg-white bg-opacity-80 p-4 !pt-20 sm:p-6">
        <div>
        {randomTips.length > 0 ? (
          <h3 className="text-center mt-0.5 text-lg font-medium text-gray-900">
            {randomTips[2].tip}
          </h3>
        ) : null}
        </div>
    </div>
    </article>
</div>
  </div>
</section>
</div>
</div>
        </div>
    )
}
export default Pregency;