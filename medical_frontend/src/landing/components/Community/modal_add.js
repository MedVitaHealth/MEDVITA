import { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { TextField } from '@mui/material';
import { useHttpClient } from "../../../shared/components/hooks/http-hook";
import { AuthContext } from '../../../shared/context/auth-context';
import Swal from 'sweetalert2';


const Modal_Add = (props) =>  {
  const type = props.type;
  const [subject, setSubject] = useState('');
  const [community, setCommunity] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [description, setDescription] = useState('');
    const auth = useContext(AuthContext);
    // const community=type;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    // console.log(auth.userId);
    const json = JSON.stringify({ 'title': subject, 'content': description, 'creator': auth.userId, 'community': community });
    // console.log(json);
    const handleApi = async () => {
        try {
          const data = {
            title: subject,
            content: description,
            creator: auth.userId,
            community: community
        };
          console.log(json);
            const formData = new FormData();
            formData.append('title', subject);
            formData.append('content', description);
            formData.append('creator', auth.userId);
            formData.append('community', community);
            // console.log(formData);
            await sendRequest(
                `https://medvita-community-api.onrender.com/api/community/new-post`,
                'POST',
                JSON.stringify(data),
                {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`
                }
                );
                Swal.fire({
                    title: 'Success!',
                    text: 'Posted successfully!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                    })
                    setRefresh(!refresh);
                    localStorage.setItem('refresh', refresh);
            props.setOpen(false);
            } catch (err) {
                console.log(err);
                }
        };
    

        // props.setOpen(false)    

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={props.cancelButtonRef} onClose={props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-blue-200 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-blue-200  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title 
                      as="h3" 
                      className="text-base font-bold leading-6 text-gray-900" 
                      style={{ fontSize: '24px', textAlign: 'center' }} // Add this line
                  >
                      Start a new post
                  </Dialog.Title>
                    <label
                    htmlFor="Subject"
                    className="mt-4 relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <input
                      type="text"
                      id="subject"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />

                    <span
                      className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                    >
                      Subject
                    </span>
                  </label>
                  <label htmlFor="HeadlineAct" className="mt-2 block text-sm font-medium text-gray-900"> Community </label>
                  <select
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    name="HeadlineAct"
                    id="HeadlineAct"
                    className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-600 sm:text-sm"
                  >
                    <option value="">Please select Community</option>
                    <option value="General">General</option>
                    <option value="Epidemic">Epidemic</option>
                    <option value="Pandemic">Pandemic</option>
                    <option value="Pregnancy">Pregnancy</option>
                  </select>
                      <div className="mt-2">
                      <div>
                      <label htmlFor="OrderNotes" className="block text-sm font-medium text-gray-700"> Post Description </label>

                      <textarea
                        id="OrderNotes"
                        className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                        rows="8" // Increase the number of rows
                        cols="50" // Add this line to increase the number of columns
                        style={{ width: '400px', height: '200px' }} // Add this line to set a specific width and height
                        placeholder="Enter your post here..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
                    onClick={handleApi}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => props.setOpen(false)}
                    ref={props.cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default Modal_Add;
