import axios from "axios";
import { useEffect, useState } from "react";

export function useUserData(): [picture: string | undefined] {
  const [picture, setPicture] = useState(undefined);

  useEffect(() => {
    const getPictureUrl = async (): Promise<void> => {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/spotify/getUserProfile`, {
          withCredentials: true,
        })
        .then((res) => {
          setPicture(res.data.images[0].url);
        });
    };
    getPictureUrl();
  }, []);

  return [picture];
}
