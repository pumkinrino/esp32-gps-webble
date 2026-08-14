module.exports = async function (req, res) {
    const { lat, lon, dlat, dlon } = req.query;
    const apiKey = "gdk_live_R8lMzHJLuGe_dGk2mWKZ7NuI";
    
    try {
        const url = `https://api.gogoduk.com/v1/directions?origin=${lat},${lon}&destination=${dlat},${dlon}`;
        const response = await fetch(url, {
            headers: { "X-API-Key": apiKey }
        });
        const data = await response.json();
        
        let coords = [];
        if (data.routes && data.routes[0]) {
            const steps = data.routes[0].legs[0].steps;
            for (let step of steps) {
                coords.push(`${step.start_location.lat},${step.start_location.lng}`);
            }
            // Thêm điểm đích vào cuối cùng
            coords.push(`${dlat},${dlon}`);
        }
        
        // Trả về chuỗi tọa độ cách nhau bởi dấu |
        res.status(200).send(coords.slice(0, 30).join('|'));
    } catch (error) {
        res.status(500).send("ERROR");
    }
};
