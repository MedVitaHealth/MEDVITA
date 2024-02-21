import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseMedical } from '@fortawesome/free-solid-svg-icons'
import { faHandshake } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import appweb from "../../../images/appweb.png"
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon ,ServerIcon} from '@heroicons/react/24/outline'

export default function About_us() {
    return(
        <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
              MedVita is an ambitious, all-in-one medical app designed to empower you to take control of your health and well-being. We recognize the complexities of navigating the healthcare landscape, and we're committed to providing a comprehensive and user-friendly platform to support you on your journey.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            src={appweb}
            alt=""
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
              Here's what sets MedVita apart:
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                <FontAwesomeIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" icon={faHouseMedical} />
                  <span>
                    <strong className="font-semibold text-gray-900">Holistic Approach:</strong> We cover a wide range of health areas, from disease detection and prevention to mental health, fitness, and pregnancy support. Think of us as your one-stop shop for personalized health management.
                  </span>
                </li>
                <li className="flex gap-x-3">
                <FontAwesomeIcon icon={faHandshake} className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true"/>
                  <span>
                    <strong className="font-semibold text-gray-900">Empowering Features:</strong> Get notified of potential disease surges in your area, track and manage immunizations, set medication reminders, receive personalized health tips, and even connect with nearby doctors and medical shops – all within the app.
                  </span>
                </li>
                <li className="flex gap-x-3">
                <FontAwesomeIcon icon={faUser} className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true"/>
                  <span>
                    <strong className="font-semibold text-gray-900">Focus on You:</strong> We go beyond generic advice with features like posture validation for yoga exercises and voice/chat-based emotional detection, offering personalized insights and recommendations tailored to your unique needs.
                  </span>
                </li>
                <li className="flex gap-x-3">
                <FontAwesomeIcon icon={faMessage} className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true"/>
                  <span>
                    <strong className="font-semibold text-gray-900">Community and Education:</strong> Connect with others, share experiences, and learn from personalized blog recommendations curated to your interests. Build a supportive community and gain valuable knowledge on your health journey.
                  </span>
                </li>
              </ul>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Join us on our mission to empower individuals to take charge of their health. Sign in here or Download MedVita today and experience the difference!</h2>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
