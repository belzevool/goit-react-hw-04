import axios from "axios";
const API_KEY = "gcevo00lZKvSMKLnZZJPKYS5xNbpbsP_4i6E-BVlG58";
const BASE_URL = "https://api.unsplash.com/search/photos";

const FetchImages = async (query, page = 1) => {
  const response = await axios(BASE_URL, {
    params: {
      query: query,
      page,
      per_page: 12,
      orientation: "portrait",
    },
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });

  return response.data;
};

export default FetchImages;
