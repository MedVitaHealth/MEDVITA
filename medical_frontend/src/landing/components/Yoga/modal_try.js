import { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { TextField } from '@mui/material';
import { useHttpClient } from "../../../shared/components/hooks/http-hook";
import { AuthContext } from '../../../shared/context/auth-context';
import Swal from 'sweetalert2';
import { type } from '@testing-library/user-event/dist/type';


const Modal_Try = (props    ) =>  {
  const [bodypart, setBodypart] = useState('');
  const [reason, setReason] = useState('');
  const [refresh, setRefresh] = useState(0);
    const auth = useContext(AuthContext);
    // const community=type;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    // console.log(auth.userId);
    // console.log(json);
    const handleApi = async () => {
        try {
          const data = {
            'first': bodypart,
            'second': reason,
        };
        console.log(typeof(bodypart));
        console.log(data);
            const response=await sendRequest(
                `https://med-ai-api.onrender.com/yoga`,
                'POST',
                JSON.stringify(data),
                {
                    'Content-Type': 'application/json',
                }
                );
                // Swal.fire({
                //     title: 'Success!',
                //     text: 'Posted successfully!',
                //     icon: 'success',
                //     confirmButtonText: 'Ok'
                //     })
                    setRefresh(refresh+1);
                    // localStorage.setItem('refresh', refresh);
            // console.log(response);
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
                      Fill this to get recomendation
                    </Dialog.Title>
                  <label htmlFor="HeadlineAct" className="mt-2 mb-2  block text-sm font-medium text-gray-900"> Which body part are you targeting? </label>
                  <select
                    value={bodypart}
                    onChange={(e) => setBodypart(e.target.value)}
                    name="HeadlineAct"
                    id="HeadlineAct"
                    className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-600 sm:text-sm"
                  >
                    <option value="">Please select body part</option>
                    <option value="shoulders">Shoulders</option>
                    <option value="legs">Legs</option>
                    <option value="neck">Neck</option>
                    <option value="knee">Knee</option>
                  </select>
                  <label htmlFor="HeadlineAct" className="mt-2 mb-2 block text-sm font-medium text-gray-900"> Reason </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    name="HeadlineAct"
                    id="HeadlineAct"
                    className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-600 sm:text-sm"
                  >
                    <option value="">Please select Reason</option>
                    <option value="stiff">Stiffness</option>
                    <option value="pain">Pain</option>
                    <option value="weightloss">Weightloss</option>
                  </select>
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
export default Modal_Try;
