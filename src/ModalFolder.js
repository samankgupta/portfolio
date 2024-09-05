import pdficon from "./images/pdficon.gif";
import { useState, useEffect } from "react";
import ModalFile from "./ModalFile";
import { FileURLs } from "./FileURLs";

export default function ModalFolder({
  isOpen,
  onClose,
  modalPosition,
  modalFolderName,
}) {
  const filesInFolders = {
    Projects: [
      "FitnessTrendz",
      "Agri-Cultivate",
      "Novelty",
      "Bananaleaf",
      "KYC System",
      "AthElite",
      "TaskHub",
    ],
    "Professional Experience": [
      "Data Engineer",
      "Data Science Intern 1",
      "Data Science Intern 2",
      "Full Stack Web Development Intern",
    ],
    "Leadership Roles": ["IEEECSVITC", "Photography Club"],
    "About Me": ["Introduction", "Tech skills"],
  };

  const [fileUrl, setFileUrl] = useState("");

  const handleClick = (item) => {
    setSelectedItem(item);
  };
  const closeFileModal = () => {
    setIsModalFileOpen(false);
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const [isModalFileOpen, setIsModalFileOpen] = useState(false);
  const [modalFilePosition, setModalFilePosition] = useState({
    top: 0,
    left: 0,
  });
  const [modalFileName, setModalFileName] = useState("");

  const handleDoubleClick = (event, name, url) => {
    // Capture the position of the click
    const rect = event.target.getBoundingClientRect();
    setModalFilePosition({
      top: rect.top,
      left: window.innerWidth - rect.left,
    });
    setModalFileName(name);
    setIsModalFileOpen(true);
    setFileUrl(url);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside the component
      if (!event.target.closest(".selectable-item")) {
        setSelectedItem(null); // Deselect if clicked outside
      }
    };

    const element = document.getElementById("modalid");

    if (element) {
      // Attach the event listener to the document
      element.addEventListener("click", handleClickOutside);

      // Cleanup the event listener on component unmount
      return () => {
        element.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div
      className="relative h-[calc(100dvh-1.5rem)] overflow-hidden"
      onClick={() => {
        setSelectedItem(null);
        onClose();
      }}
    >
      <div
        id="modalid"
        className={`mx-auto h-3/4 md:h-3/5 w-4/5 md:w-3/5`}
        style={{
          position: "absolute",
          top: `${window.innerWidth > 768 ? window.innerHeight / 6 : 10}px`,
          left: `${window.innerWidth > 768 ? 150 : 30}px`,
          transformOrigin: `${modalPosition.left - 25}px ${
            modalPosition.top - 25
          }px`,
          animation: "expand 0.3s ease-out forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`w-full h-full shadow-2xl subpixel-antialiased rounded-xl border border-gray-700 mx-auto bg-stone-800`}
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
                {modalFolderName}
              </p>
            </div>
          </div>
          <div className="rounded-b-xl">
            <div className="relative h-full">
              <div className="flex gap-8 md:gap-12 flex-wrap absolute mt-4 left-8">
                {modalFolderName && filesInFolders ? (
                  filesInFolders[modalFolderName].map((fileName) => (
                    <div
                      className="flex flex-col w-16 items-center"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents the event from bubbling up
                        handleClick(fileName);
                      }}
                      onDoubleClick={(e) =>
                        handleDoubleClick(e, fileName, FileURLs[fileName])
                      }
                    >
                      <img
                        src={pdficon}
                        className={`py-1 ${
                          selectedItem === fileName
                            ? "bg-gray-200/15 rounded"
                            : ""
                        }`}
                      />
                      <p
                        className={`[text-shadow:_1px_2px_4px_rgb(0_0_0_/_0.7)] cursor-default text-white mt-1 px-1 rounded font-medium text-center text-sm ${
                          selectedItem === fileName ? "bg-blue-700" : ""
                        }`}
                      >
                        {fileName}
                      </p>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
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
      <ModalFile
        isOpen={isModalFileOpen}
        onClose={closeFileModal}
        modalPosition={modalFilePosition}
        modalFileName={modalFileName}
        fileUrl={fileUrl}
      />
    </div>
  );
}
