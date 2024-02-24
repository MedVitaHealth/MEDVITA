import React, { useEffect } from "react";
import {useState} from "react";
import combg from "../../../images/community_bg.png"
import CommunityCard from "./community_card";

const CommunityChat = (props) => {
    const data = props.data;
    const data1 = props.data1;
    const data2 = props.data2;
    const data3 = props.data3;
    const type = props.type;
    // console.log(data);
    return(
        <div
        style={{
            backgroundImage: `url(${combg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        
        }}>
      {type === "General" ? 
        (data && data.map((item, index) => {
            return <CommunityCard key={index} data={item} />
        }))
        : type==="Epidemic" ?
        (data1 && data1.map((item, index) => {
            return <CommunityCard key={index} data={item} />
        }))
        : type==="Pregnancy" ?
        (data2 && data2.map((item, index) => {
            return <CommunityCard key={index} data={item} />
        }))
        :
        (data3 && data3.map((item, index) => {
            return <CommunityCard key={index} data={item} />
        }))
    }
        </div>
    )
}
export default CommunityChat;