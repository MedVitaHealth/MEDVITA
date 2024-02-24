import React from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import { Link } from "react-router-dom";
import "../../pages/home.css"
import block from "../../../images/Doc.png"
const Main = () => {
    const auth = React.useContext(AuthContext);
    return (
        <div className="bg-white main bigbox">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="main-card relative isolate overflow-hidden bg-slate-200 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left bigbox">
            <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl mobfont">
              MedVita
            </h1>
            <p className="mt-6 text-lg leading-8 text-black">
            Empowering you to manage your health
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start clean">
              <Link to="/auth">
              <button
                className="rounded-md bg-rose-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {!auth.isLoggedIn?"CREATE ACCOUNT":"PROFILE"}
              </button>
              </Link>
              <a href="#" className="text-sm font-semibold leading-6 text-black">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="boxing remove">
            
            <img
              className="mt-8"
              src= {block}
              alt="Block"
            />
          </div>
        </div>
      </div>
    </div>
    )

}
export default Main;