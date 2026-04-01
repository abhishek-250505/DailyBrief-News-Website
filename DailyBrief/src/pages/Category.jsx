import { useEffect, useState } from "react";
import { RiSearchLine } from "@remixicon/react";
import { useNewsContext } from "../context/NewsContext";

const Category = () => {
    const { setNews, fetchNews, setCurrentCategory } = useNewsContext();
    const [searchTerm, setSearchTerm] = useState("");

  const category = [
    "India",
    "World",
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology"
  ];

  const handleData = async (item) => {
    let endpoint = "/news?country=us&category=general&pageSize=100";
    let selectedCategory = "general";

    if (item === "India") {
      endpoint = "/news?q=india&pageSize=100";
      selectedCategory = "india";
    } else if (item === "World") {
      endpoint = "/news?q=world&pageSize=100";
      selectedCategory = "world";
    } else {
      endpoint = `/news?country=us&category=${item.toLowerCase()}&pageSize=100`;
      selectedCategory = item.toLowerCase();
    }

    try {
      const data = await fetchNews(endpoint);
      setNews(data?.articles || []);
      setCurrentCategory(selectedCategory);
    } catch {
      setNews([]);
      setCurrentCategory(selectedCategory);
    }
  };

  const handleSearch = async (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    try {
      const data = await fetchNews(
        `/news?q=${encodeURIComponent(trimmed)}&pageSize=100`
      );
      setNews(data?.articles || []);
      setCurrentCategory("search");
    } catch {
      setNews([]);
      setCurrentCategory("search");
    }
  };

  useEffect(() => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    const timeout = setTimeout(async () => {
      try {
        const data = await fetchNews(
          `/news?q=${encodeURIComponent(trimmed)}&pageSize=100`
        );
        setNews(data?.articles || []);
        setCurrentCategory("search");
      } catch {
        setNews([]);
        setCurrentCategory("search");
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [searchTerm, fetchNews, setNews, setCurrentCategory]);

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(searchTerm);
    }
  };

  return (
    <div className="fixed md:top-14 mt-px pt-2 top-11 w-full z-40 bg-white  pb-3 md:pl-5 pl-2 pr-5 flex gap-4 md:gap-10 items-center font-sans border-b shadow-md border-gray-300 md:overflow-x-hidden overflow-x-auto">

      {/* Search */}
      <div className="flex border rounded-lg border-gray-400 mt-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search news"
          className="border-none outline-none md:w-40 w-28 px-2"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="flex items-center px-3 text-gray-600 hover:text-gray-900"
        >
          <RiSearchLine />
        </button>
      </div>

      {/* Categories */}
      {category.map((item) => (
        <div key={item}>
          <h1
            className="md:text-xl cursor-pointer hover:text-red-600 whitespace-nowrap md:pl-3"
            onClick={() => handleData(item)}
          >
            {item}
          </h1>
        </div>
      ))}

    </div>
  );
};

export default Category;