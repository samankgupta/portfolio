import { useEffect, useState } from "react";
import linkedin from "./images/linkedin.png";
import mail from "./images/mail.png";
import SG from "./images/SG-removebg.png";
import doc from "./images/doc.png";
import github from "./images/github.png";
import pdficon from "./images/pdficon.gif";
import folder from "./images/folder.webp";
import ModalFile from "./ModalFile";
import ModalFolder from "./ModalFolder";
import { FileURLs } from "./FileURLs";

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside the component
      if (!event.target.closest(".selectable-item")) {
        setSelectedItem(null); // Deselect if clicked outside
      }
    };

    // Attach the event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const macTimeFormat = currentDateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const weekday = currentDateTime.toLocaleDateString("en-US", {
    weekday: "short",
  });
  const day = currentDateTime.toLocaleDateString("en-US", { day: "numeric" });
  const month = currentDateTime.toLocaleDateString("en-US", { month: "short" });

  const formattedDateTime = `${weekday} ${day} ${month} ${"\u00A0"}${macTimeFormat}`;

  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const [isModalFileOpen, setIsModalFileOpen] = useState(false);
  const [isModalFolderOpen, setIsModalFolderOpen] = useState(false);
  const [modalFilePosition, setModalFilePosition] = useState({
    top: 0,
    left: 0,
  });
  const [modalFileName, setModalFileName] = useState("");
  const [modalFolderPosition, setModalFolderPosition] = useState({
    top: 0,
    left: 0,
  });
  const [modalFolderName, setModalFolderName] = useState("");

  const handleDoubleClick = (event, name, type, url = "") => {
    // Capture the position of the click
    const rect = event.target.getBoundingClientRect();

    if (type === "file") {
      setModalFilePosition({
        top: rect.top,
        left: rect.left,
      });
      setModalFileName(name);
      setIsModalFileOpen(true);
      setFileUrl(url);
    } else {
      setModalFolderPosition({
        top: rect.top,
        left: rect.left,
      });
      setModalFolderName(name);
      setIsModalFolderOpen(true);
    }
  };

  const closeFileModal = () => {
    setIsModalFileOpen(false);
  };
  const closeFolderModal = () => {
    setSelectedItem(null);
    setIsModalFolderOpen(false);
  };

  return (
    <div className="h-dvh w-screen bg-bgimage bg-center bg-cover">
      <div className="relative">
        <div className="relative h-6 z-10">
          <div className="py-0.5 flex justify-between bg-gradient-to-r from-green-100 via-yellow-100 to-blue-100 items-center w-full">
            <nav>
              <ul className="flex items-center justify-between text-sm text-black">
                <li>
                  <img src={SG} className="cursor-default px-2 pl-5 h-3" />
                </li>
                <li>
                  <a
                    className="cursor-default px-3 font-bold inline-block"
                    href="#"
                  >
                    Samank Gupta
                  </a>
                </li>
                {/* <li>
                    <a
                      className="cursor-default hidden px-3 md:inline-block"
                      href="#"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      className="cursor-default hidden px-3 md:inline-block"
                      href="#"
                    >
                      Products
                    </a>
                  </li>
                  <li>
                    <a
                      className="cursor-default hidden px-3 md:inline-block"
                      href="#"
                    >
                      About
                    </a>
                  </li> */}
              </ul>
            </nav>
            <nav className="flex cursor-default">
              <ul className="flex items-center justify-between text-sm text-black pr-4">
                <li>
                  <a
                    className="cursor-default px-2.5 font-bold inline-block"
                    href="#"
                  >
                    <img src={doc} className="h-3 pt-px" />
                  </a>
                </li>
                <li>
                  <a
                    className="cursor-default px-2.5 font-bold inline-block"
                    href="https://github.com/samankgupta"
                    target="_blank"
                  >
                    <img src={github} className="h-3" />
                  </a>
                </li>
                <li>
                  <a
                    className="cursor-default px-2.5 font-bold inline-block"
                    href="https://www.linkedin.com/in/samank-gupta/"
                    target="_blank"
                  >
                    <img src={linkedin} className="h-3" />
                  </a>
                </li>
                <li>
                  <a
                    className="cursor-default px-2.5 font-bold inline-block"
                    href="mailto:samankgupta@gmail.com"
                    target="_blank"
                  >
                    <img src={mail} className="h-3 pt-[1.5px]" />
                  </a>
                </li>
              </ul>
              <p className="pr-5 text-sm hidden md:inline-block">
                {formattedDateTime}
              </p>
            </nav>
          </div>
        </div>
        <div className="absolute z-0 flex flex-col gap-14 inset-y-0 right-12 pt-12 w-16">
          <div
            className="flex flex-col items-center"
            onClick={(e) => {
              e.stopPropagation(); // Prevents the event from bubbling up
              handleClick("Projects");
            }}
            onDoubleClick={(e) => handleDoubleClick(e, "Projects", "folder")}
          >
            <img
              src={folder}
              className={`py-1 scale-125 ${
                selectedItem === "Projects"
                  ? "bg-gray-900/25 border-2 border-gray-300/30 rounded"
                  : ""
              }`}
            />
            <p
              className={`[text-shadow:_1px_2px_4px_rgb(0_0_0_/_0.7)] cursor-default text-white mt-2.5 px-1 rounded font-medium text-center text-sm  ${
                selectedItem === "Projects" ? "bg-blue-700" : ""
              }`}
            >
              Projects
            </p>
          </div>
          <div
            className="flex flex-col items-center"
            onClick={(e) => {
              e.stopPropagation(); // Prevents the event from bubbling up
              handleClick("Professional Experience");
            }}
            onDoubleClick={(e) =>
              handleDoubleClick(e, "Professional Experience", "folder")
            }
          >
            <img
              src={folder}
              className={`py-1 scale-125 ${
                selectedItem === "Professional Experience"
                  ? "bg-gray-900/25 border-2 border-gray-300/30 rounded"
                  : ""
              }`}
            />
            <p
              className={`[text-shadow:_1px_2px_4px_rgb(0_0_0_/_0.7)] cursor-default text-white mt-2.5 px-1 rounded font-medium text-center text-sm ${
                selectedItem === "Professional Experience" ? "bg-blue-700" : ""
              }`}
            >
              Professional Experience
            </p>
          </div>
          <div
            className="flex flex-col items-center"
            onClick={(e) => {
              e.stopPropagation(); // Prevents the event from bubbling up
              handleClick("Leadership Roles");
            }}
            onDoubleClick={(e) =>
              handleDoubleClick(e, "Leadership Roles", "folder")
            }
          >
            <img
              src={folder}
              className={`py-1 scale-125 ${
                selectedItem === "Leadership Roles"
                  ? "bg-gray-900/25 border-2 border-gray-300/30 rounded"
                  : ""
              }`}
            />
            <p
              className={`[text-shadow:_1px_2px_4px_rgb(0_0_0_/_0.7)] cursor-default text-white mt-2.5 px-1 rounded font-medium text-center text-sm ${
                selectedItem === "Leadership Roles" ? "bg-blue-700" : ""
              }`}
            >
              Leadership Roles
            </p>
          </div>
          <div
            className="flex flex-col items-center"
            onClick={(e) => {
              e.stopPropagation(); // Prevents the event from bubbling up
              handleClick("researchPaper");
            }}
            onDoubleClick={(e) =>
              handleDoubleClick(
                e,
                "Research Paper",
                "file",
                FileURLs["Research Paper"]
              )
            }
          >
            <img
              src={pdficon}
              className={`py-1 ${
                selectedItem === "researchPaper"
                  ? "bg-gray-900/25 border-2 border-gray-300/30 rounded"
                  : ""
              }`}
            />
            <p
              className={`[text-shadow:_1px_2px_4px_rgb(0_0_0_/_0.7)] cursor-default text-white mt-1 px-1 rounded font-medium text-center text-sm ${
                selectedItem === "researchPaper" ? "bg-blue-700" : ""
              }`}
            >
              Research Paper
            </p>
          </div>
        </div>
        <div className="absolute z-0 flex flex-col gap-5 inset-y-0 right-40 pt-12 w-16">
          <div
            className="flex flex-col items-center"
            onClick={(e) => {
              e.stopPropagation(); // Prevents the event from bubbling up
              handleClick("About Me");
            }}
            onDoubleClick={(e) => handleDoubleClick(e, "About Me", "folder")}
          >
            <img
              src={folder}
              className={`py-1 scale-125 ${
                selectedItem === "About Me"
                  ? "bg-gray-900/25 border-2 border-gray-300/30 rounded"
                  : ""
              }`}
            />
            <p
              className={`[text-shadow:_1px_2px_4px_rgb(0_0_0_/_0.7)] cursor-default text-white mt-2.5 px-1 rounded font-medium text-center text-sm ${
                selectedItem === "About Me" ? "bg-blue-700" : ""
              }`}
            >
              About Me
            </p>
          </div>
        </div>
      </div>
      <ModalFile
        isOpen={isModalFileOpen}
        onClose={closeFileModal}
        modalPosition={modalFilePosition}
        modalFileName={modalFileName}
        fileUrl={fileUrl}
      />
      <ModalFolder
        isOpen={isModalFolderOpen}
        onClose={closeFolderModal}
        modalPosition={modalFolderPosition}
        modalFolderName={modalFolderName}
      />
    </div>
  );
}

export default App;
