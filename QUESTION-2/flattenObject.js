const flattenObject = (obj) => {
    const flattenRuner = (obj, path = []) => {
        let result = [];

        for (let key in obj) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                result = result.concat(flattenRuner(obj[key], path.concat(key)));
            } else {
                result.push({ key: path.concat(key), value: obj[key] });
            }
        }

        return result;
    }
    const flattenArray = flattenRuner(obj)

    return flattenArray;
}

const inputObj = {
    "id": "0001",
    "type": "donut",
    "name": "Cake",
    "ppu": 0.55,
    "batters": {
        "batter": [
            { "id": "1001", "type": "Regular" },
            { "id": "1002", "type": "Chocolate" },
            { "id": "1003", "type": "Blueberry" },
            { "id": "1004", "type": "Devil's Food" }
        ]
    },
    "topping": [
        { "id": "5001", "type": "None" },
        { "id": "5002", "type": "Glazed" },
        { "id": "5005", "type": "Sugar" },
        { "id": "5007", "type": "Powdered Sugar" },
        { "id": "5006", "type": "Chocolate with Sprinkles" },
        { "id": "5003", "type": "Chocolate" },
        { "id": "5004", "type": "Maple" }
    ]
};

const output = flattenObject(inputObj);
document.getElementById("flatObj").innerHTML = JSON.stringify(output);
