import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./Mental.css"
import mental from "../../../images/mental.svg"
import chat from "../../../images/chat.png"
import voice from "../../../images/voice.gif"
const Mental = () => {
    return (
        <>

<section
  className="overflow-hidden  bg-cover bg-no-repeat"
  style={{ backgroundImage: `url(${mental})` }}
>
  <div className="bg-black/25 p-8 md:p-12 lg:px-12 lg:py-80">
    <div className="text-center ltr:sm:text-left rtl:sm:text-right">
      
    <div className="absolute bottom-56 right-44 mb-4 mr-4">
    
</div>
    </div>
  </div>
</section>
<section className="sec2">
<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
      <div className="grid1 grid place-content-center rounded bg-gray-100 p-6 sm:p-8">
        <div className=" mx-auto max-w-md text-center lg:text-left">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Find Your Voice, Find Your Calm: MedVita's Mental Health Support</h2>

            <p className="mt-4 text-white">
            Feeling overwhelmed, stressed, or lost? You're not alone. MedVita recognizes the importance of mental well-being, and that's why we offer a supportive and confidential space to express yourself and gain valuable insights.
            </p>
          </header>
        </div>
      </div>

      <div className="lg:col-span-2 lg:py-8">
        <ul className="grid grid-cols-2 gap-10 ">
          <li >
            <div className="group block">
              <Link to="/chat_mental">
              <img
                src={chat}
                alt=""
                className="aspect-square w-full rounded object-cover transform transition duration-500 ease-in-out hover:scale-105"
              />
              </Link>
            </div>
          </li>

          <li>
          <div className="group block">
    <Link to="/voice_mental">
        <img
            src={voice}
            alt=""
            className="aspect-square w-full rounded object-cover transform transition duration-500 ease-in-out hover:scale-105"
        />
    </Link>
</div>
</li>
        </ul>
      </div>
    </div>
  </div>
  
</section>

</>
    )
}
export default Mental;