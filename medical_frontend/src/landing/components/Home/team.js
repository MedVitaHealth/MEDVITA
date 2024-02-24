import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/home.css"
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import deya from "../../../images/Deya hazra pic.webp"
import utsav from "../../../images/Utsav_pic.jpg"
import ssr from "../../../images/ssr_pic.jpg"
import EmailIcon from '@mui/icons-material/Email';
import atrij from "../../../images/atrij.jpg"
const people = [
    {
      id: 1,
      name: 'Deya Hazra',
      role: 'Co-Founder / CEO',
      hrefG: 'https://github.com/deyahazra',
      hrefL: 'https://www.linkedin.com/in/deya-hazra-51a23222a/',
      hrefM: 'mailto:deyahazra28@gmail.com',
      imageUrl: deya
    },
    {
        id: 2,
        name: 'Utsav Das',
        role: 'Co-Founder / CEO',
        hrefG: 'https://github.com/utsavdas10',
        hrefL: 'https://www.linkedin.com/in/utsav-das-323b32227/',
        hrefM: 'mailto:utsavdas10@gmail.com',
        imageUrl: utsav,
      },
      {
        id: 3,
        name: 'Swapnodip Singha Roy',
        role: 'Co-Founder / CEO',
        hrefG: 'https://github.com/iamssr02',
        hrefL: 'https://www.linkedin.com/in/swapnodip-singha-roy/',
        hrefM: 'mailto:swapnodip02.singharoy@gmail.com',
        imageUrl:ssr
      },
      {
        id: 4,
        name: 'Atrij Paul',
        role: 'Co-Founder / CEO',
        hrefG: 'https://github.com/Atrij-Paul',
        hrefL: 'https://www.linkedin.com/in/atrij-paul-9a23a6223/',
        hrefM: 'mailto:atrijpaul2003@gmail.com',
        imageUrl:
          atrij
      },
    // More people...
  ]
export default function Team  () {
    return (
        <div className="team py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our Team</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
            suspendisse.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <div className="member">
            <li key={person.id}>
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-rose-500 role">{person.role}</p>
                  <Button
                        variant="link"
                        className="icons"
                        size="small"
                        startIcon={<LinkedInIcon color="primary" fontSize='large'/>}
                        href={person.hrefL}
                        target="_blank"
                    />
                    <Button
                        variant="link"
                        className="icons"
                        size="small"
                        startIcon={<GitHubIcon fontSize='large'/>}
                        href={person.hrefG}
                        target="_blank"
                    />
                    <Button
                        variant="link"
                        className="icons"
                        size="small"
                        startIcon={<EmailIcon color="primary" fontSize='large'/>}
                        href={person.hrefM}
                    />
                </div>
              </div>
            </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
    )
}