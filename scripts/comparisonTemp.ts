import fs from "fs";

// ABSOLUTE PATHS
const worldPath =
  "C:\\Users\\matth\\projects\\TravelLog\\public\\data\\source\\nationsPolygons.geojson";

const regionsDir =
  "C:\\Users\\matth\\projects\\TravelLog\\public\\data\\source\\regions";

// Change if needed
const KEY = "name";

const world = JSON.parse(fs.readFileSync(worldPath, "utf8"));

const worldIds = new Map();

for (const feature of world.features) {
  const id = feature.properties?.[KEY];

  if (!id) continue;

  worldIds.set(id, feature.properties);
}

const regionIds = new Set();

const regionFiles = fs
  .readdirSync(regionsDir)
  .filter(file => file.endsWith(".json"));

for (const file of regionFiles) {
  const filePath = `${regionsDir}\\${file}`;

  const geojson = JSON.parse(fs.readFileSync(filePath, "utf8"));

  for (const feature of geojson.features || []) {
    const id = feature.properties?.[KEY];

    if (id) {
      regionIds.add(id);
    }
  }
}

const missing = [];

for (const [id, props] of worldIds.entries()) {
  if (!regionIds.has(id)) {
    missing.push({
      id,
      name: props.name || props.ADMIN || "Unknown"
    });
  }
}

console.table(missing);