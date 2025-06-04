interface IEnv {
  API_URL: string;
  API_IMAGE_URL: string;
}

export const env: IEnv = {
  API_URL: import.meta.env.VITE_APP_API_URL,
  API_IMAGE_URL: import.meta.env.VITE_APP_API_IMAGE_URL,
};
