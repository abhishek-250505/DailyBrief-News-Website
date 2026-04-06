import { createContext, useContext, useState } from "react";
import api from "../config/axios";

const NewsContext = createContext();

const NewsContextProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("general");

  const fetchNews = async (
    url = "/news?country=us&category=general&pageSize=100"
  ) => {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      return { articles: [] }; 
    }
  };

  const value = {
    news,
    setNews,
    currentCategory,
    setCurrentCategory,
    fetchNews,
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
};

const useNewsContext = () => {
  return useContext(NewsContext);
};

export { NewsContextProvider, useNewsContext };