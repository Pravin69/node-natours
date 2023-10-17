export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicHJhdmluLTY5IiwiYSI6ImNsbmZtNm1rYzB3cnIyam1uZ2xrdjkxdm0ifQ.66L07bmabiBTlSZHOvysCQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/pravin-69/clnfn0310007001pih6gb8o42',
    //  style: 'mapbox://styles/pravin-69/clnhlgn2m00ab01pi8bnhfwrs',
    scrollZoom: false,
    //   center: [-118.113491, 34.111745],
    //   zoom: 4,
    //   interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    //   Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //  Add popup
    new mapboxgl.Popup({
      offset: 30,
      focusAfterOpen: false,
    })
      .setLngLat(loc.coordinates)
      .setHTML(
        `<p style="font-weight: 700">Day ${loc.day}: ${loc.description}</p>`,
      )
      .addTo(map);

    //  Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};

// map.on('style.load', () => {
//   map.setConfigProperty('basemap', 'lightPreset', 'night');
// });

///////////////    Leaflet //////////////////
// var map = L.map('map', { zoomControl: false });

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// const points = [];
// locations.forEach((loc) => {
//   points.push([loc.coordinates[1], loc.coordinates[0]]);
//   L.marker([loc.coordinates[1], loc.coordinates[0]])
//     .addTo(map)
//     .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
//       autoClose: false,
//     })
//     .openPopup();
// });

// const bounds = L.latLngBounds(points).pad(0.5);
// map.fitBounds(bounds);

// map.scrollWheelZoom.disable();
