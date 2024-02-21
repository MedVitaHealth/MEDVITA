import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseMedical ,faMap} from '@fortawesome/free-solid-svg-icons'
import { MapIcon, EyeIcon, InformationCircleIcon} from '@heroicons/react/24/outline'
import { ChatBubble } from "@mui/icons-material";
const features = [
    {
      name: 'Health Radar',
      description:
        'Get notified of potential surges based on user-reported data.',
      icon: InformationCircleIcon,
    },
    {
      name: 'Personalized Health Tracking',
      description:
        'Manage immunizations, medication, menstrual cycles, & yoga postures.',
      icon: InformationCircleIcon,
    },
    {
      name: 'Emotional Well-being:',
      description:
        'Confide in our AI assistant for support & personalized advice.',
      icon: InformationCircleIcon,
    },
    {
      name: 'Connect & Find Care',
      description:
        'Discover nearby doctors, clinics, & pharmacies, plus relevant health articles.',
      icon:InformationCircleIcon ,
    },
    {
      name: 'Community Support',
      description:
        'Share experiences, ask questions, & connect with others on their health journeys.',
      icon:InformationCircleIcon ,
    },
    {
      name: 'Pregnancy & Sexual Health Support ',
      description:
        'Access tips, guidance, & discreet information.',
      icon: InformationCircleIcon,
    },
  ]
const Services = () => {
    return(
        <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Services we provide
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          MedVita goes beyond a simple app – it's a gateway to a healthier you. Here's a glimpse of the diverse services we offer:
          </p>
        </div>
        <div className="services">
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        </div>
      </div>
    </div>
    )
}
export default Services ;