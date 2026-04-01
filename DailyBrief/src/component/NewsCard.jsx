import React from "react";
import { useNavigate } from "react-router-dom";

const NewsCard = ({ details }) => {
  const navigate = useNavigate();
        

  const openArticle = () => {
    navigate("/article", { state: { article: details } });
  };

  return (
    <div className="bg-[#F5F5F5] mt-20  max-w-80 p-3 border ml-6 border-gray-200 rounded-lg shadow-sm">
      
      <img
        className="rounded-lg w-full object-cover h-48"
        src={details.urlToImage || null}
       
        
        alt="news"
      />
      

      <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-gray-900 line-clamp-2">
        {details?.title}
      </h5>

      <p className="mb-6 text-gray-600 line-clamp-3">
        {details?.description}
      </p>

      <button
        onClick={openArticle}
        className="inline-flex items-center text-gray-600 bg-gray-100 border border-gray-300 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm px-4 py-2.5"
      >
        Read Article
      </button>

    </div>
  );
};

export default NewsCard;