import { useState, useEffect } from "react";
import { MapPin, AlertCircle, CheckCircle, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

interface Incident {
  id: string;
  title: string;
  date: string;
  status: string;
  actionTaken: string;
  location: string;
  description: string;
  source: string;
  videoURL: string;
}

const Track = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const incidentsRef = collection(db, "report");
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  const formatDate = (timestamp: Timestamp): string => {
    return timestamp.toDate().toLocaleString();
  };

  useEffect(() => {
    const getIncidentList = async () => {
      setLoading(true);
      try {
        const data = await getDocs(incidentsRef);
        const filteredData = data.docs.map((doc) => {
          const docData = doc.data();

          return {
            ...docData,
            id: doc.id,
            date: docData.date ? formatDate(docData.date) : "N/A",
          };
        });
        setIncidents(filteredData as Incident[]);
      } catch (error) {
        alert(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getIncidentList();
  }, []);

  const updateIncidentStatus = async (incidentId: string, newStatus: string) => {
    try {
      const incidentRef = doc(db, "report", incidentId);
      await updateDoc(incidentRef, {
        status: newStatus,
      });

      // Update state locally
      setIncidents((prev) =>
        prev.map((incident) =>
          incident.id === incidentId ? { ...incident, status: newStatus } : incident
        )
      );
      alert("Status updated!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch = search
      ? incident.title?.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesStatus = filterStatus ? incident.status === filterStatus : true;
    const matchesLocation = filterLocation
      ? incident.location?.toLowerCase().includes(filterLocation.toLowerCase())
      : true;

    return matchesSearch && matchesStatus && matchesLocation;
  });

  return (
    <motion.div
      className="min-h-screen bg-[#0A192F] text-white p-10 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ scale: 1.2, opacity: 0.3 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="absolute w-64 h-64 bg-indigo-500 rounded-full opacity-50 blur-3xl top-20 left-10"></div>
        <div className="absolute w-96 h-96 bg-blue-700 rounded-full opacity-40 blur-3xl bottom-20 right-10"></div>
      </motion.div>

      {/* Search & Filter Section */}
      <motion.div
        className="flex flex-col md:flex-row justify-center gap-6 mb-12 mt-16 relative z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Search incidents..."
          className="p-4 rounded-lg bg-gray-800 text-white w-full md:w-1/3 border border-gray-600"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-4 rounded-lg bg-gray-800 text-white w-full md:w-1/5 border border-gray-600"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="Under Investigation">🟡 Under Investigation</option>
          <option value="Resolved">🟢 Resolved</option>
        </select>
        <input
          type="text"
          placeholder="Filter by Location"
          className="p-4 rounded-lg bg-gray-800 text-white w-full md:w-1/4 border border-gray-600"
          onChange={(e) => setFilterLocation(e.target.value)}
        />
      </motion.div>

      {/* Incident Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredIncidents.map((incident) => (
            <motion.div
              key={incident.id}
              className="bg-[#112240] p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 border border-gray-600"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-400">
                {incident.title ? incident.title : "..."}
              </h2>
              <p className="text-sm text-gray-400">📅 {incident.date}</p>
              <p className="text-sm text-gray-400 flex items-center gap-1">
                📍 <MapPin className="h-4 w-4" /> {incident.location}
              </p>
              {incident.status ? (
                <p className="text-sm text-gray-300 flex items-center gap-1 mt-2">
                  {incident.status === "Resolved" ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-400" />
                  )}
                  {incident.status}
                </p>
              ) : (
                "..."
              )}

              <p className="text-sm text-gray-300 mt-2">
                🔍 {incident.actionTaken ? incident.actionTaken : "..."}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                📢 Source: {incident.source ? incident.source : "..."}
              </p>

              <div className="mt-4">
                <a
                  href={incident.videoURL ? incident.videoURL : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 underline text-sm flex items-center gap-1"
                >
                  <PlayCircle className="h-5 w-5" /> 🎥 Watch Incident Video
                </a>
              </div>
              {isAdmin === true && (
                incident.status !== "Resolved" && (
                  <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => updateIncidentStatus(incident.id, "Resolved")}
                    className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700"
                  >
                    Mark as Resolved
                  </button>
                </div>
                )
              )} 
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default Track;
