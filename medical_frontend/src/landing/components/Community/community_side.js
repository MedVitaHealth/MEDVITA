import React,{useState, useRef} from "react";
import { Link } from "react-router-dom";
import Modal_Add from "./modal_add";
import comm from "../../../images/chatbut.png"
import "./community.css"
const CommunitySide = () => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('Epidemic')
    const cancelButtonRef = useRef(null)
    const handleAdd = () => {
      setOpen(true)
    };
    
    return(
        <>
        <div className="flex h-screen flex-col justify-between border-e bg-gray-900 bg-opacity-90">
        <div className="px-4 py-6">
        <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-900 text-xs text-gray-100">
        <img src={comm} alt="chat" className="h-10 w-48" />
        </span>

        <ul className="mt-6 space-y-1">
        <li>
          <Link to="/community/general">
        <div
            className="block rounded-lg bg-gray-900 px-4 py-2 text-sm font-bold text-gray-200"
            >
            General
            </div>
            </Link>
        </li>

        <li>
        <Link to="/community/epidemic">
            <div
            className="block rounded-lg px-4 py-2 text-sm font-bold text-gray-100 hover:bg-gray-900 hover:text-gray-200"
            onClick={() => setType('Epidemic')}
            >
            Epidemic
            </div>
            </Link>
        </li>

        <li>
        <Link to="/community/pandemic">
            <div
            className="block rounded-lg px-4 py-2 text-sm font-bold text-gray-100 hover:bg-gray-900 hover:text-gray-200"
            onClick={() => setType('Pandemic')}
            >
            Pandemic
            </div>
            </Link>
        </li>
        <li>
        <Link to="/community/pregnency">
            <div
            className="block rounded-lg px-4 py-2 text-sm font-bold text-gray-100 hover:bg-gray-900 hover:text-gray-200"
            onClick={() => setType('Pregnancy')}
            >
            Pregancy
            </div>
            </Link>
        </li>

        </ul>
  </div>
  <Modal_Add open={open} setOpen={setOpen} type={type} cancelButtonRef={cancelButtonRef} />
  {/* <div className="addbut sticky inset-x-0 bottom-0 border-t border-gray-100">
    <div  onClick={handleAdd} className="addbut flex items-center justify-center bg-pink-200 bg-opacity-80 p-4 hover:bg-pink-100">
      
      <div>
        <p className="text-xs">
        <strong className="block font-bold" style={{ fontSize: '20px', textAlign: 'center' }}>Add a post</strong>
        </p>
      </div>
    </div> */}
    <div
    className=" sticky inset-x-0 bottom-0  mb-2 ml-4 mr-4 bg-gray-900 bg-opacity-60 block rounded-lg  px-4 py-2 text-sm font-bold text-gray-200 hover:bg-gray-300 hover:text-gray-700"
    onClick={handleAdd}
    >
      <div>
        <p className="text-xs">
        <strong className="block font-semibold" style={{ fontSize: '20px', textAlign: 'center' }}>Add a post</strong>
        </p>
      </div>
            
</div>
</div>
        </>
    )
}
export default CommunitySide;