function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344
        }
        if (unit == "N") {
            dist = dist * 0.8684
        }
        return dist;
    }
}

function compare(a, b) {

    const distA = a.dist;
    const distB = b.dist;

    let comparison = 0;

    if (distA > distB) {
        comparison = 1;
    } else if (distA < distB) {
        comparison = -1;
    }

    return comparison;
}

document.getElementById("proximite").onclick = function () {

    let zoneMain = document.querySelectorAll(".zone.proximite");
    let preview = zoneMain[0].children[0];
    let fullview = zoneMain[0].children[1];

    // clean the previous content
    preview.innerHTML = "";
    fullview.innerHTML = "";

    // preview static display
    title = document.createElement("h1");
    title.setAttribute("id", "vLilleTitle");
    title.appendChild(document.createTextNode("Liste des stations VLille les plus proches"));
    preview.appendChild(title)
    
    getReq('/api/vLille', (result) => {

        getReq('/api/coordinates', (coordinates) => {

            userLat = coordinates[0].lat;
            userLon = coordinates[0].lon;

            // computing the distance between user and stations
            for (const elt in result) {
                result[elt].dist = distance(userLat, userLon, result[elt].lat, result[elt].lon, 'K')
            }

            // sorting nearest stations
            result = result.sort(compare);

            // preview dynamic display

            // fullview dynamic display
            for(const elt in result){
                
                stationName = document.createElement("h1");
                bikeAvaliable = document.createElement("h2");
                adress = document.createElement("p");

                stationName.classList.add("stationName");
                bikeAvaliable.classList.add("bikeAvaliable");
                adress.classList.add("adress");

                stationName.appendChild(document.createTextNode(result[elt].name));
                bikeAvaliable.appendChild(document.createTextNode(result[elt].bikeAvaliable + " VLille disponibles"));
                adress.appendChild(document.createTextNode(result[elt].adress + ", " + result[elt].town));

                fullview.appendChild(stationName);
                fullview.appendChild(bikeAvaliable);
                fullview.appendChild(adress);
            }

        });
    });
}