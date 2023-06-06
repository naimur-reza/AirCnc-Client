import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const UpdateRoomModal = ({ isUpdateModal, setIsUpdateModal }) => {
  return (
    <Transition appear show={isUpdateModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsUpdateModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div
            className="flex min-h-full items-center justify-center p-4 te
          xt-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900">
                  Update Room Info
                </Dialog.Title>
                {/* Update form */}
                <h1>Update Form</h1>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateRoomModal;
