type Song = {
  album: { images: Array<{ url: string }> };
  id: string;
  artists: Array<{ name: string }>;
  name: string;
};

export { Song };
