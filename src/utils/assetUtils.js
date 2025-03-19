/**
 * Utility functions untuk mengelola path aset
 * Berfungsi baik di development maupun production (GitHub Pages)
 */

/**
 * Mendapatkan path aset yang benar untuk gambar, audio, dan font
 * @param {string} path - Path relatif dari aset di folder public (tanpa leading slash)
 * @returns {string} Path lengkap yang sudah disesuaikan dengan BASE_URL
 */
export function getAssetPath(path) {
  // Hapus leading slash jika ada untuk menghindari double slash
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

/**
 * Mendapatkan path CSS yang benar untuk background-image dan font
 * @param {string} path - Path relatif dari aset di folder public (tanpa leading slash)
 * @returns {string} Path lengkap dalam format url()
 */
export function getCssAssetPath(path) {
  return `url(${getAssetPath(path)})`;
}

/**
 * Mendapatkan path audio yang benar
 * @param {string} path - Path relatif dari file audio di folder public (tanpa leading slash)
 * @returns {string} Path lengkap yang sudah disesuaikan
 */
export function getAudioPath(path) {
  return getAssetPath(path);
}

/**
 * Mendapatkan path font yang benar untuk @font-face
 * @param {string} path - Path relatif dari font di folder public (tanpa leading slash)
 * @returns {string} Path lengkap untuk digunakan di src: url()
 */
export function getFontPath(path) {
  return getAssetPath(path);
}
