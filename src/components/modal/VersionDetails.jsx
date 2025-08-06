import { FaRegCircle, FaRegCalendarAlt } from "react-icons/fa";
import DOMPurify from "dompurify";

const VersionDetails = ({ onClose, project }) => {
  // const html = DOMPurify.sanitize(project.description);
  return (
    <div className="fixed inset-0 z-50 bg-black/5 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl hover:cursor-pointer"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2 border-gray-200">
          Version Details
        </h2>
        <div>
          <div className="flex items-start space-x-3 my-4 hover:cursor-pointer">
            {/* Status icon */}
            <FaRegCircle className="mt-1 text-[#02448E]" />

            {/* Task details */}
            <div className="flex justify-between w-full">
              <div>
                <h3 className="font-medium text-gray-900">{project?.type}</h3>

                <p className="text-sm font-medium text-gray-700 mt-4 mb-2">
                  Description
                </p>
                <div
                  className="text-sm text-gray-500 max-w-md"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(project?.description || ""),
                  }}
                >
                  {/* Build an crm trade project. Some features --... 1. Lorem ipsum
                  dolor sit amet. 2. Lorem ipsum dolor sit. 3. Lorem ipsum dolor
                  sit amet consectetur. */}
                </div>
                <div className="flex items-center text-sm text-[#02448E] mt-1">
                  <FaRegCalendarAlt className="mr-1 text-xs" />
                  {project?.createdAt?.toDate
                    ? project.createdAt.toDate().toLocaleString()
                    : "Not set"}
                </div>
              </div>
              <div className="flex gap-x-3">
                <p className="flex items-center text-xs font-semibold h-6 bg-[#1D89E5] text-white px-2 rounded-md">
                  v{project?.version}
                </p>
                <p className="flex items-center text-xs font-semibold h-6 bg-[#1D89E5] text-white px-2 rounded-md">
                  {project?.platform}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionDetails;
