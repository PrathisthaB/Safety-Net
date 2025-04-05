import { useState, useRef } from "react";
import { FaUpload, FaVideo, FaStop, FaLocationArrow } from "react-icons/fa";
import { collection,addDoc , Timestamp} from "firebase/firestore";
import { db } from "../config/firebase";

const ReportSection = () => {
  const incidentsRef = collection(db, "report");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState(null)
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
  };

  const handleVideoUpload = async () => {
    if (!videoFile) return null; 
  
    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("upload_preset", "hackathon-project-video-storage");
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dbrwua3yk/video/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      return data.secure_url; 
    } catch (error) {
      console.log("Video upload failed:", error);
      return null; 
    }
  };
  
  const onSubmitReport = async () => {
    setLoading(true);
    try {
      let videoURL = null;
  
      if (videoFile) {
        videoURL = await handleVideoUpload();
      }
  
      const dateTimestamp = Timestamp.fromDate(new Date(date));
  
      const uploadData = {
        location,
        description,
        date: dateTimestamp,
        ...(videoURL && { videoURL }) 
      };
  
      await addDoc(incidentsRef, uploadData);
      alert("Report submitted successfully!");
  
      
      setLocation("");
      setDescription("");
      setDate("");
      setVideoFile(null);
      setVideoURL("");
  
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        setVideoURL(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.log("Error accessing camera: ", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    setIsRecording(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-3xl w-full">
        <h2 className="text-white text-3xl font-semibold text-center mb-6">📢 Report a Crime</h2>

        {/* Location Field */}
        <div className="mb-5">
          <label className="text-gray-300 block mb-2">📍 Location:</label>
          <div className="relative">
            <input type="text"  value={location} className="w-full p-3 bg-gray-700 text-white rounded-lg pl-10 focus:ring-2 focus:ring-blue-400" placeholder="Enter location" onChange={(e) => setLocation(e.target.value)}/>
            <FaLocationArrow className="absolute top-3 left-3 text-gray-400" />
          </div>
        </div>

        {/* Incident Description */}
        <div className="mb-5">
          <label className="text-gray-300 block mb-2">📝 Describe the Incident:</label>
          <textarea  value={description} className="w-full p-3 bg-gray-700 text-white rounded-lg h-28 focus:ring-2 focus:ring-blue-400" placeholder="Write details here..." onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>

        {/* Date & Time */}
        <div className="mb-5">
          <label className="text-gray-300 block mb-2">📅 Date & Time:</label>
          <input type="datetime-local" value={date} className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-400" onChange={(e) => setDate(e.target.value)}/>
        </div>

        {/* File Upload */}
        <div className="mb-5">
          <label className="text-gray-300 block mb-2">🎥 Video Upload:</label>
          <div className="relative">
            <input type="file" accept="video/*" onChange={handleFileChange} className="w-full p-3 bg-gray-700 text-white rounded-lg cursor-pointer" />
            <FaUpload className="absolute top-3 right-3 text-gray-400" />
          </div>
        </div>

        {/* Live Video Recording */}
        <div className="bg-gray-700 p-6 rounded-xl mb-5">
          <video ref={videoRef} className="w-full rounded-lg mb-4" autoPlay playsInline></video>
          {isRecording ? (
            <button onClick={stopRecording} className="w-full flex items-center justify-center bg-red-600 p-3 rounded-lg text-white hover:bg-red-500 transition-all">
              <FaStop className="mr-2" /> Stop Recording
            </button>
          ) : (
            <button onClick={startRecording} className="w-full flex items-center justify-center bg-green-600 p-3 rounded-lg text-white hover:bg-green-500 transition-all">
              <FaVideo className="mr-2" /> Start Recording
            </button>
          )}
        </div>

        {/* Recorded Video Preview */}
        {videoURL && (
          <div className="mb-5">
            <h3 className="text-gray-300 mb-2">🎬 Recorded Video Preview:</h3>
            <video src={videoURL} controls className="w-full rounded-lg shadow-md"></video>
          </div>
        )}

        {/* Submit Button */}
        <button className="w-full bg-blue-600 p-4 rounded-lg text-white text-lg font-semibold hover:bg-blue-500 transition-all" onClick={onSubmitReport}>
          🚀 {loading ? "Submitting..." : "Submit Report"}
        </button>
      </div>
    </div>
  );
};

export default ReportSection;
