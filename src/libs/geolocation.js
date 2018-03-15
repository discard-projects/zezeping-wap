export default {
  getGeoLocation () {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            resolve({lng: position.coords.longitude, lat: position.coords.latitude})
          },
          function (e) {
            reject(e)
          }
        )
      } else {
        reject(new Error('not support geolocation'))
      }
    })
  }
}
