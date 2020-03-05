//
// IMPORTANT | REMINDER : Edit this variable according
// to final asset location. On GitHub Pages, the assets
// are served at root://pitching-and-moaning/assets
// (as per my repository name: 'pitching-and-moaning')
//
const GetAssetURI = (file, isHQ=window.devicePixelRatio > 1, isDev=process.env.NODE_ENV === 'development') => (
  `${isDev ? '' : '/pitching-and-moaning'}/assets${isHQ ? '/hq' : ''}/${file}`
);

export {
  GetAssetURI,
};
