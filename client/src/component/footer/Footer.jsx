// import React from 'react'
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <div className="bg-gray-100 rounded-xl mt-4 no-padding-no-margin">
      
      <div className="text-xl font-semibold my-2 text-center">
        Inspiration for future getaways
      </div>

      <div className="mt-3 border-t flex flex-row justify-evenly py-3 text-start">
          <div className="text-center ">
              <div>Support</div>
              <div className="mx-3 mt-3 gap-2 flex flex-col">
                  <Link className="hover:underline underline-offset-1">Help Centre</Link>
                  <Link className="hover:underline underline-offset-1">AirCover</Link>
                  <Link className="hover:underline underline-offset-1">Anti-discrimination</Link>
                  <Link className="hover:underline underline-offset-1">Disability support</Link>
                  <Link className="hover:underline underline-offset-1">Cancellation options</Link>
              </div>
          </div>
          <div className="text-center">
            <div>Hosting</div>
              <div className="mx-3 mt-3 gap-2 flex flex-col">
                  <Link  className="hover:underline underline-offset-1">Airbnb your home</Link>
                  <Link  className="hover:underline underline-offset-1">AirCover for Hosts</Link>
                  <Link  className="hover:underline underline-offset-1">Hosting resources</Link>
                  <Link  className="hover:underline underline-offset-1">Community forum</Link>
                  <Link  className="hover:underline underline-offset-1">Hosting responsibly</Link>
              </div>
          </div>
          <div  className="text-center">
                <div>Airbnt</div>
              <Link className="mx-3 mt-3 gap-2 flex flex-col">
                  <Link  className="hover:underline underline-offset-1">Airbnb</Link>
                  <Link  className="hover:underline underline-offset-1">Newsroom</Link>
                  <Link  className="hover:underline underline-offset-1">New features</Link>
                  <Link  className="hover:underline underline-offset-1">Careers</Link>
                  <Link  className="hover:underline underline-offset-1">Investors</Link>
              </Link>
          </div>
      </div>
    </div>
  )
}

export default Footer