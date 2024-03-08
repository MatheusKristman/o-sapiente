import { BsXLg } from "react-icons/bs";

import { requestDetailsInfo } from "@/constants/requestDetails-br";
import useRequestDetailsModalStore from "@/stores/useRequestDetailModalStore";
import Image from "next/image";

const RequestDetailModal = () => {
  const { isModalOpen, closeModal, isForm, isMessage, resetModalContent } =
    useRequestDetailsModalStore();

  function handleCloseButton() {
    closeModal();

    setTimeout(() => {
      resetModalContent();
    }, 350);
  }

  return (
    <div className="w-screen h-screen bg-[#2C383F]/75 fixed top-0 left-0 right-0 bottom-0 z-[9999] text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle">
      <div className="w-full max-w-[550px] bg-white p-9 rounded-2xl inline-block align-middle overflow-x-hidden">
        <div className="w-full flex justify-end items-center">
          <button type="button" onClick={handleCloseButton} className="mb-6">
            <BsXLg size={26} className="text-green-primary" />
          </button>
        </div>

        <div className="w-full flex flex-col">
          <h3 className="text-3xl font-semibold text-gray-primary text-left mb-6">
            {requestDetailsInfo.title}
          </h3>

          {/* TODO adicionar imagem */}
          <div>
            <div>
              <Image src="/images/" />
            </div>

            <h5>John Doe</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailModal;
