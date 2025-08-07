import { useContext, useEffect, useState } from "react";
import { FaRegCircle, FaRegCalendarAlt, FaPlus } from "react-icons/fa";
import VersionDetails from "../components/modal/VersionDetails";
import AddVersion from "../components/modal/AddVersion";
import { CiCloudOff } from "react-icons/ci";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Loader from "../components/common/Loader";
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import UpdateVersion from "../components/modal/UpdateVersion";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const { searchText, showModal, handleVersion } = auth;
  // const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [project, setPorject] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    setLoading(true); // ✅ start loading

    const unsubscribe = onSnapshot(
      collection(db, "versions"),
      (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setData(items);
        setLoading(false); // ✅ end loading once data received
      },
      (error) => {
        console.error("Error fetching real-time data:", error);
        setLoading(false);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Filter data based on searchText
  const filteredData =
    data.length > 0 &&
    data.filter((item) => {
      const lowerSearch = searchText.toLowerCase();

      return (
        item.version?.toLowerCase().includes(lowerSearch) ||
        item.platform?.toLowerCase().includes(lowerSearch) ||
        item.type?.toLowerCase().includes(lowerSearch)
      );
    });

  // add project version
  // const handleVersion = () => {
  //   setShowModal(true);
  // };

  // handle project details
  const handleShowDetails = (item) => {
    setPorject(item);
    setShowDetails(true);
  };

  const handleDelete = async (id) => {
    try {
      console.log("🚀 ~ ProjectVersion ~ id:", id);
      await deleteVersion(id);
      setData((prevVersions) =>
        prevVersions.filter((version) => version.id !== id)
      );
    } catch (error) {
      console.error("Error deleting version:", error);
    }
  };
  const handleEdit = (item) => {
    setPorject(item);
    setUpdateModal(true);
  };

  // purify html
  function stripHtmlTags(html) {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, "");
  }

  return (
    <div className="py-6 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between ">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
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
        ) : data && data.length > 0 ? (
          filteredData.map((item) => (
            // <Link to={`/version/${item?.type}`} key={item?.id}>
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
                    <div className="text-sm text-gray-500 truncate w-48 lg:max-w-sm">
                      {stripHtmlTags(item?.description)}
                    </div>

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

              {/* Optional Divider */}
              <hr className="border-t border-gray-200" />
            </div>
            // </Link>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center spce-y-2 h-96">
            <CiCloudOff />
            <p className="text-gray-500 text-sm font-medium">
              Data is not availabe
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
          <UpdateVersion onClose={() => setUpdateModal(false)} item={project} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
