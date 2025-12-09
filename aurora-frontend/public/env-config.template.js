// Runtime environment configuration
// This file is processed by docker-entrypoint.sh to inject environment variables at runtime
window._env_ = {
  VITE_API_BASE_URL: '${VITE_API_BASE_URL}',
  VITE_CLOUDINARY_CLOUD_NAME: '${VITE_CLOUDINARY_CLOUD_NAME}',
  VITE_CLOUDINARY_UPLOAD_PRESET: '${VITE_CLOUDINARY_UPLOAD_PRESET}'
};
