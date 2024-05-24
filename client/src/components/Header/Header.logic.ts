//Function directs you to page where you authorize Madnessify for Spotify account
export const redirectToSpotifyLogin = async (): Promise<void> => {
  //Get Spotify redirect URL
  const res = await fetch(`${import.meta.env.VITE_API_URL}/oauth/login`, {
    redirect: "manual",
  });

  //Redirect user to URL
  window.location.replace(res.url);
};
