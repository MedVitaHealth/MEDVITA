import React,{useState} from "react";
import { Link } from "react-router-dom"; 
import "./dashboard.css"
import yoga from "../../../images/yog_but.png"
import preg from "../../../images/pregbut.png"
import chat from "../../../images/chatbut.png"
import men from "../../../images/mentbut.png"

import Blog2 from "./blog2";
const Dashboard = () => {

    return (
      <div >
        <div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 pt-24 ml-4 mr-4">
        <div className=" gridbutton h-32 rounded-lg bg-green-100 bg-opacity-70">
        <Link to="/yoga">
          <img src={yoga} alt="Description of image" className="h-full w-full object-contain rounded-lg" />
          </Link>
        </div>
          <div className="gridbutton h-32 rounded-lg bg-red-100 bg-opacity-70">
            <Link to="/pregnency">
          <img src={preg} alt="Description of image" className="h-full w-full object-contain rounded-lg" />
          </Link>
          </div>
          <div className="gridbutton h-32 rounded-lg bg-blue-100 bg-opacity-70">
            <Link to="/community/general">
          <img src={chat} alt="Description of image" className="h-full w-full object-contain rounded-lg" />
          </Link>
          </div>
          
          <div className="gridbutton h-32 rounded-lg bg-yellow-800 bg-opacity-40">
          <Link to="/mental">
          <img src={men} alt="Description of image" className="h-full w-full object-contain rounded-lg" />
          </Link>
          </div>
        </div>
        </div>
        <Blog2/>
    </div>
    )
}
export default Dashboard;