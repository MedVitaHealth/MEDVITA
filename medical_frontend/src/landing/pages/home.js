import React, { useState } from "react";
import { Dialog } from '@headlessui/react'
import { Link } from "react-router-dom";
import "./home.css"
import Main from "../components/Home/main";
import Services from "../components/Home/services";
import Contact from "../components/Home/contact";
import Team from "../components/Home/team";
import About_us from "../components/Home/about_us";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import logo from "../../images/Logo.png"
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { AuthContext } from "../../shared/context/auth-context";
const navigation = [
    {key:1, name: 'Home', href: '#main' },
    {key:2, name: 'About us', href: '#about_us' },
    {key:3, name: 'Services', href: '#services' },
    {key:4, name: 'Team', href: '#team' },
    {key:6, name: 'Contact us', href: '#contact' },
  ]
const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const auth = React.useContext(AuthContext);

  return (
    <div>
      <section id='main'>
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-24 w-24"
                src={logo}
                alt=""
                style={{ height: '120px', width: '120px' }}
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <AnchorLink key={item.name} href={item.href} className="text-sm font-semibold navi leading-6 text-gray-900">
                {item.name}
              </AnchorLink>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/auth">
            <a className="text-sm font-semibold leading-6 text-gray-900 navi">
              {!auth.isLoggedIn ? 'Sign in' : 'Profile'} <span aria-hidden="true">&rarr;</span>
            </a>
          </Link>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src={logo}
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6" onClick={() => setMobileMenuOpen(false)}>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                <Link to="/auth">
                  <a
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {!auth.isLoggedIn ? 'Sign in' : 'Profile'}
                  </a>
                </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <div>{Main()}</div>
    </div>
    </section>
    <section id='about_us'>
      <div className="about_us">
      <div>{About_us()}</div>
        </div>
    </section>
    <section id='services'>
      <div className="services">
      <div>{Services()}</div>
        </div>
    </section>
    <section id='contact'>
      <div className="contact">
      <div>{Contact()}</div>
        </div>
    </section>
    <section id='team'>
      <div className="team">
      <div>{Team()}</div>
        </div>
    </section>
    </div>
  )
}

    export default Home;