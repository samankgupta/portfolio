export default function ModalFile({
  isOpen,
  onClose,
  modalPosition,
  modalFileName,
  fileUrl,
}) {
  if (!isOpen) return null;
  console.log(fileUrl);
  return (
    <div
      className="relative h-[calc(100dvh-1.5rem)] overflow-hidden"
      onClick={onClose}
    >
      <div
        className={`mx-auto h-3/4 md:h-5/6 md:w-3/4`}
        style={{
          position: "absolute",
          top: `${window.innerHeight / 12}px`,
          left: `${window.innerWidth > 768 ? window.innerWidth / 8 : 45}px`,
          transformOrigin: `${modalPosition.left - 25}px ${
            modalPosition.top - 25
          }px`,
          animation: "expand 0.3s ease-out forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`w-full h-full shadow-2xl subpixel-antialiased rounded-xl border border-gray-700 mx-auto bg-bgcolor`}
        >
          <div
            className="flex items-center rounded-t-xl bg-stone-600 border-b border-gray-700 shadow-lg text-center text-gray-100 h-10"
            id="headerTerminal"
          >
            <div
              className="flex ml-4 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3"
              id="closebtn"
              onClick={onClose}
            ></div>
            {/* <div
                  className="ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3"
                  id="minbtn"
                ></div>
                <div
                  className="ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3"
                  id="maxbtn"
                ></div> */}
            <div className="mx-auto" id="terminaltitle">
              <p className="text-center text-sm font-medium pr-8">
                {modalFileName}
              </p>
            </div>
          </div>
          <div className="h-full rounded-b-xl">
            <iframe
              src={fileUrl}
              frameborder="0"
              className="w-full h-full pb-16"
            ></iframe>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes expand {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
