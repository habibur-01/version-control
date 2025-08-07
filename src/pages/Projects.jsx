import React from "react";

const Projects = () => {
  return (
    <div>
      {" "}
      <div className="py-6 lg:p-6">
        {/* Header */}
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-bold mb-4">{type}</h1>
          <button
            className="flex items-center text-[#02448E] text-sm font-semibold space-x-2 px-2 mb-4 hover:cursor-pointer"
            onClick={handleVersion}
          >
            <FaPlus />
            <span>Add Version</span>
          </button>
        </div>
        <div>
          {loading ? (
            <Loader />
          ) : versions && versions.length > 0 ? (
            versions.map((item) => (
              <div key={item?.id} onClick={() => handleShowDetails(item)}>
                {/* Task Item */}
                <div className="flex items-start space-x-3 my-4 hover:cursor-pointer group">
                  {/* Status icon */}
                  <FaRegCircle className="mt-1 text-[#02448E]" />

                  {/* Task details */}
                  <div className="flex justify-between w-full">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">
                          {item?.type}
                        </h3>
                        <div className="flex items-center space-x-2 text-gray-500 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-300">
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item?.id);
                            }}
                          >
                            <MdDelete />
                          </span>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(item);
                            }}
                          >
                            <BiSolidEdit />
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 truncate w-48 lg:max-w-sm">
                        {stripHtmlTags(item?.description)}
                      </p>

                      <div className="flex items-center text-sm text-[#02448E] mt-1">
                        <FaRegCalendarAlt className="mr-1 text-xs" />
                        {item?.createdAt?.toDate
                          ? item.createdAt.toDate().toLocaleString()
                          : "Not set"}
                      </div>
                    </div>
                    <div className="flex gap-x-3">
                      <p className="flex items-center text-xs font-semibold h-6 bg-[#1D89E5] text-white px-2 rounded-md">
                        v{item?.version}
                      </p>
                      <p className="flex items-center text-xs font-semibold h-6 bg-[#1D89E5] text-white px-2 rounded-md">
                        {item?.platform}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-t border-gray-200" />
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center space-y-2 h-96">
              <CiCloudOff className="text-4xl text-gray-400" />
              <p className="text-gray-500 text-sm font-medium">
                Version is not available
              </p>
            </div>
          )}
        </div>

        <div>
          {showModal && <AddVersion onClose={() => setShowModal(false)} />}
        </div>
        <div>
          {showDetails && (
            <VersionDetails
              onClose={() => setShowDetails(false)}
              project={project}
            />
          )}
        </div>
        <div>
          {updateModal && (
            <UpdateVersion
              onClose={() => setUpdateModal(false)}
              item={project}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
