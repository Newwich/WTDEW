
const locationInfo = document.getElementById('location-info');

const locationsData = [
    { id: "672218eaca4aed83d3089d55", coords: [13.844685509431802, 100.51079429811635] },//ทรูช็อป • บิ๊กซี ติวานนท์
    { id: "672218eaca4aed83d3089d56", coords: [13.87704923180731, 100.4114160404467] },//True Shop Central Plaza Westgate | ทรูช้อป เซ็นทรัลพลาซ่าเวสท์เกต
    { id: "67223f17b992d38cd6d59018", coords: [13.823636630537033, 100.48049657411087] },//True Shop Lotus Nakhon In | ทรูช้อป โลตัส นครอินทร์
    { id: "672240f6b992d38cd6d59019", coords: [13.804710772102096, 100.4489591735486] },//True Shop Central Westville | ทรูช้อป เซนทรัล เวสต์วิลล์
    { id: "67224296b992d38cd6d5901a", coords: [13.824143094764462, 100.41015792523439] },//ทรูช็อปโลตัสส์บางใหญ่
    { id: "672243fcb992d38cd6d5901b", coords: [13.87704923180731, 100.4115160404467] },//AIS Serenade Club Central Westgate
    { id: "672246c3b992d38cd6d5901c", coords: [13.855589336350965, 100.54200643860098] },//AIS Shop FLOOR 6 THE MALL งามวงศ์วาน
    { id: "672247abb992d38cd6d5901d", coords: [13.936075013447308, 100.45668981067877] },//True Shop Robinson Ratchaphruek | ทรูช้อป โรบินสัน ราชพฤกษ์
    { id: "67224917b992d38cd6d5901e", coords: [13.861881938243771, 100.50367546160504] },//True Shop Station Lotus's Rattanathibeth
    { id: "67224977b992d38cd6d5901f", coords: [13.855589336350965, 100.54200643860098] },//True Shop The Mall Ngamwongwan 6fl

];

locationsData.forEach(location => {
    const marker = L.marker(location.coords, { icon: markerIcon }).addTo(map);
    marker.on('click', async () => {
        locationInfo.style.display = 'block';

        try {
            const response = await fetch(`http://localhost:3000/centers/${location.id}`);
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error('Failed to fetch center data');
            }
            const centerData = await response.json();

            locationInfo.innerHTML = `
                <h3>${centerData.name}</h3>
                <p>${centerData.details}</p>
                <p>${centerData.benefits}</p>
                <p>${centerData.tel}</p>`;
        } catch (error) {
            console.error('Error fetching center data:', error);
            locationInfo.innerHTML = 'Failed to load center information.';
        }
    });
});

// Optional: Hide the box when clicking elsewhere
map.on('click', () => {
    locationInfo.style.display = 'none';
});

marker.on('click', async () => {
    locationInfo.style.display = 'block';

    try {
        const response = await fetch(`http://localhost:3000/centers/${location.id}`);
        console.log('Response status:', response.status); // Log the response status
        if (!response.ok) {
            throw new Error('Failed to fetch center data');
        }
        const centerData = await response.json();
        console.log('Center data:', centerData); // Log the center data

        locationInfo.innerHTML = `
            <h3>${centerData.name}</h3>
            <p>${centerData.details}</p>
            <p>${centerData.benefits}</p>
            <p>${centerData.tel}</p>`;
    } catch (error) {
        console.error('Error fetching center data:', error);
        locationInfo.innerHTML = 'Failed to load center information.';
    }
});

// Function to fetch e-waste collection centers from the backend
async function fetchCenters(query = '') {
    const url = query
        ? `http://localhost:3000/centers/search?q=${encodeURIComponent(query)}`
        : 'http://localhost:3000/centers';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response error');
        }
        const centers = await response.json();
        displayCenters(centers);
    } catch (error) {
        console.error('Error fetching centers:', error);
        document.getElementById('centers-list').innerText = 'Failed to load centers';
    }
}

function displayCenters(centers) {
    const centersList = document.getElementById('centers-list');
    centersList.innerHTML = '';

    centers.forEach(center => {
        const centerItem = document.createElement('div');
        centerItem.classList.add('center-item');
        centerItem.innerHTML = `
            <h2>${center.name || 'No Name Provided'}</h2>
            <p>Address: ${center.address || 'No Address Provided'}</p>
            <p>Location: ${center.location?.coordinates[0] || 'N/A'}, ${center.location?.coordinates[1] || 'N/A'}</p>
        `;
        centersList.appendChild(centerItem);
    });
}

// Search input event listener
document.querySelector('.place').addEventListener('input', (event) => {
    const query = event.target.value;
    fetchCenters(query);
});

// Fetch centers when the window loads
window.onload = () => fetchCenters();

