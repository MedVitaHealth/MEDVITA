import { useEffect,useContext } from "react";
import React,{useState} from "react";
import { useHttpClient } from "../../../shared/components/hooks/http-hook";
import { AuthContext } from '../../../shared/context/auth-context';
import "./profile.css"
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
const Profile = () => {
  const auth = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [save,setSave]=useState(0);
    const [imagePreview, setImagePreview] = useState(
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      );
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [data,setData]=useState([]);
    
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
        };
    const handleEditClick = () => {
        setIsEditing(true);
      };
      const handleImageChange = (event) => {
        setImagePreview(event.target.files[0]);
      };
      const handleSaveClick = async () => {
        
        try {
          console.log(phone);
          const formData = new FormData();
          formData.append('profile_pic', imagePreview);
          formData.append('phone', phone);
          await sendRequest(
            `https://medvita-auth-api.onrender.com/api/auth/update_user/${auth.userId}`,
            'PATCH',
            formData,
            {
              Authorization: `Bearer ${auth.token}`
            }
          );
          setIsEditing(false);
          setSave(save+1);
        } catch (err) {
          console.log(err);
        }
      };
      const { isLoading, error, sendRequest, clearError } = useHttpClient();
      
      useEffect(() => {
          const fetchProfile = async () => {
            try {
              const responseData = await sendRequest(
                `https://medvita-auth-api.onrender.com/api/auth/get_user/${auth.userId}`,
                'GET',
                null,
                {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${auth.token}`
                }
              );
              setData(responseData.user);
              console.log(responseData.user);
            } 
            catch (err) {
              console.log(err);
            }
          };
          fetchProfile();
      }, [save]);

    return (

    <div >
      {isLoading && <LoadingSpinner asOverlay text="Fetching Your Profile..."/>}
      <div className="flex justify-center items-start overflow-hidden">
      <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          id="fileInput"
        />
        <div>
        <img
          className="h-40 w-40 rounded-full ring-2 ring-white mt-20"
          src={`data:image/png;base64,${data.profile_pic}`}
          alt="No pic "
        />
        <label
          htmlFor="fileInput"
          className={`${
            isEditing ? 'block' : 'hidden'
          } mt-2 cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded`}
        >
          Upload a file
        </label>
        </div>
        </div>
        <div className="form">
        <div className="px-4 sm:px-0">
      </div>
      <div className="mt-5 mb-5 shadow-lg rounded-lg overflow-hidden p-4">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 headtext">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 headtext">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 headtext">Phone Number</dt>
            {isEditing ? (
                    <input
                      type="text"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
                      disabled={isEditing ? false : true}
                      readOnly={false}
                    />
                  ) : (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {data.phone}
                    </dd>
                  )}
          </div>
          
          
        </dl>
      </div>
      <div className="flex justify-center mb-3">
      {isEditing ? (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
              )}
        </div>
    </div>
    </div>
    )
}
export default Profile;