// window.data = {
//   settings: {
//     autorotateEnabled: false,
//     fullscreenButton: true,
//     mouseViewMode: 'drag'
//   },
//   scenes: [
//     ...[
//       "frame_0001", "frame_0002", "frame_0003", "frame_0004", "frame_0005", "frame_0006",
//       "frame_0007", "frame_0008", "frame_0009", "frame_0010", "frame_0011", "frame_0012",
//       "4-10", "4-11", "4-12", "4-13", "4-14", "4-15", "4-16", "4-17", "4-18", "4-19",
//       "4-20", "4-21", "4-22", "4-23", "4-24", "4-25",
//       "5", "6", "7", "8", "9",
//       "12-26", "12-27", "12-28", "12-29"
//     ].map((id, index) => ({
//       id,
//       name: id,
//       levels: [
//         { tileSize: 256, size: 256 },
//         { tileSize: 512, size: 1024 },
//         { tileSize: 512, size: 2048 }
//       ],
//       faceSize: 1520,
//       initialViewParameters: {
//         yaw: 0,
//         pitch: 0,
//         fov: 1.5708
//       },
//       linkHotspots: [],
//       infoHotspots: [],
//       // 👇 Placeholder map positions (you update x, y)
//       map: {
//         x: (index * 2 + 10) % 100,   // Spread across x
//         y: 30 + (index % 10) * 3     // Spread across y
//       }
//     }))
//   ]
// };

// // 🔗 Link hotspots
// const connections = {
//   "frame_0001": [ { target: "frame_0002", direction: "up", yaw: 0 } ],
//   "frame_0002": [ { target: "frame_0001", direction: "down", yaw: Math.PI }, { target: "frame_0003", direction: "up", yaw: 0 } ],
//   "frame_0003": [ { target: "frame_0002", direction: "down", yaw: Math.PI }, { target: "frame_0004", direction: "up", yaw: 0 } ],
//   "frame_0004": [ { target: "frame_0003", direction: "down", yaw: Math.PI }, { target: "frame_0005", direction: "up", yaw: 0 } ],
//   "frame_0005": [ { target: "frame_0004", direction: "down", yaw: Math.PI }, { target: "frame_0006", direction: "up", yaw: 0 } ],
//   "frame_0006": [ { target: "frame_0005", direction: "down", yaw: Math.PI }, { target: "frame_0007", direction: "up", yaw: 0 } ],
//   "frame_0007": [ { target: "frame_0006", direction: "down", yaw: Math.PI }, { target: "frame_0008", direction: "up", yaw: 0 } ],
//   "frame_0008": [ { target: "frame_0007", direction: "down", yaw: Math.PI }, { target: "frame_0009", direction: "up", yaw: 0 } ],
//   "frame_0009": [ { target: "frame_0008", direction: "down", yaw: Math.PI }, { target: "frame_0010", direction: "up", yaw: 0 } ],
//   "frame_0010": [ { target: "frame_0009", direction: "down", yaw: Math.PI }, { target: "frame_0011", direction: "up", yaw: 0 } ],
//   "frame_0011": [ { target: "frame_0010", direction: "down", yaw: Math.PI }, { target: "frame_0012", direction: "up", yaw: 0 } ],
//   "frame_0012": [ { target: "frame_0011", direction: "down", yaw: Math.PI }, { target: "4-10", direction: "left", yaw: -Math.PI/2 }, { target: "5", direction: "up", yaw: 0 } ],
//   "4-10": [ { target: "frame_0012", direction: "down", yaw: Math.PI }, { target: "4-11", direction: "up", yaw: 0 } ],
//   "4-11": [ { target: "4-10", direction: "down", yaw: Math.PI }, { target: "4-12", direction: "up", yaw: 0 } ],
//   "4-12": [ { target: "4-11", direction: "down", yaw: Math.PI }, { target: "4-13", direction: "left", yaw: -Math.PI/2 }, { target: "12-26", direction: "right", yaw: Math.PI/2 } ],
//   "4-13": [ { target: "4-12", direction: "down", yaw: Math.PI }, { target: "4-14", direction: "up", yaw: 0 } ],
//   "4-14": [ { target: "4-13", direction: "down", yaw: Math.PI }, { target: "4-15", direction: "up", yaw: 0 } ],
//   "4-15": [ { target: "4-14", direction: "down", yaw: Math.PI }, { target: "4-16", direction: "up", yaw: 0 } ],
//   "4-16": [ { target: "4-15", direction: "down", yaw: Math.PI }, { target: "4-17", direction: "up", yaw: 0 } ],
//   "4-17": [ { target: "4-16", direction: "down", yaw: Math.PI }, { target: "4-18", direction: "up", yaw: 0 } ],
//   "4-18": [ { target: "4-17", direction: "down", yaw: Math.PI }, { target: "4-19", direction: "up", yaw: 0 } ],
//   "4-19": [ { target: "4-18", direction: "down", yaw: Math.PI }, { target: "4-20", direction: "up", yaw: 0 } ],
//   "4-20": [ { target: "4-19", direction: "down", yaw: Math.PI }, { target: "4-21", direction: "left", yaw: -Math.PI/2 } ],
//   "4-21": [ { target: "4-20", direction: "down", yaw: Math.PI }, { target: "4-22", direction: "up", yaw: 0 } ],
//   "4-22": [ { target: "4-21", direction: "down", yaw: Math.PI }, { target: "4-23", direction: "up", yaw: 0 } ],
//   "4-23": [ { target: "4-22", direction: "down", yaw: Math.PI }, { target: "4-24", direction: "up", yaw: 0 } ],
//   "4-24": [ { target: "4-23", direction: "down", yaw: Math.PI }, { target: "4-25", direction: "up", yaw: 0 } ],
//   "4-25": [ { target: "4-24", direction: "down", yaw: Math.PI } ],
//   "5": [ { target: "frame_0012", direction: "down", yaw: Math.PI }, { target: "6", direction: "up", yaw: 0 } ],
//   "6": [ { target: "5", direction: "down", yaw: Math.PI }, { target: "7", direction: "up", yaw: 0 } ],
//   "7": [ { target: "6", direction: "down", yaw: Math.PI }, { target: "8", direction: "up", yaw: 0 } ],
//   "8": [ { target: "7", direction: "down", yaw: Math.PI }, { target: "9", direction: "up", yaw: 0 } ],
//   "9": [ { target: "8", direction: "down", yaw: Math.PI } ],
//   "12-26": [ { target: "4-12", direction: "left", yaw: -Math.PI/2 }, { target: "12-27", direction: "up", yaw: 0 } ],
//   "12-27": [ { target: "12-26", direction: "down", yaw: Math.PI }, { target: "12-28", direction: "up", yaw: 0 } ],
//   "12-28": [ { target: "12-27", direction: "down", yaw: Math.PI }, { target: "12-29", direction: "up", yaw: 0 } ],
//   "12-29": [ { target: "12-28", direction: "down", yaw: Math.PI } ]
// };

// // 🔗 Apply hotspots to each scene
// for (const scene of window.data.scenes) {
//   const links = connections[scene.id] || [];
//   scene.linkHotspots = links.map(link => ({
//     yaw: link.yaw,
//     pitch: 0,
//     rotation: 0,
//     target: link.target,
//     direction: link.direction,
//     customYaw: link.yaw
//   }));
// }
window.data = {
  settings: {
    autorotateEnabled: false,
    fullscreenButton: true,
    mouseViewMode: 'drag'
  },
  scenes: [
    // Vertical corridor on the left
    { id: "4-16", name: "4-16", levels: [], faceSize: 1520, initialViewParameters: { yaw: 0, pitch: 0, fov: 1.5708 }, linkHotspots: [], infoHotspots: [], map: { x: 20, y: 10 } },
    { id: "4-17", name: "4-17", levels: [], faceSize: 1520, initialViewParameters: { yaw: 0, pitch: 0, fov: 1.5708 }, linkHotspots: [], infoHotspots: [], map: { x: 20, y: 20 } },
    { id: "4-18", name: "4-18", levels: [], faceSize: 1520, initialViewParameters: { yaw: 0, pitch: 0, fov: 1.5708 }, linkHotspots: [], infoHotspots: [], map: { x: 20, y: 30 } },
    { id: "4-19", name: "4-19", levels: [], faceSize: 1520, initialViewParameters: { yaw: 0, pitch: 0, fov: 1.5708 }, linkHotspots: [], infoHotspots: [], map: { x: 20, y: 40 } },

    // First horizontal corridor (middle)
    { id: "4-20", name: "4-20", levels: [], faceSize: 1520, initialViewParameters: { yaw: 0, pitch: 0, fov: 1.5708 }, linkHotspots: [], infoHotspots: [], map: { x: 30, y: 40 } },
    { id: "4-21", name: "4-21", levels: [], faceSize: 1520, initialViewParameters: { yaw: 0, pitch: 0, fov: 1.5708 }, linkHotspots: [], infoHotspots: [], map: { x: 40, y: 40 } },
    { id: "4-22", name: "4-22", levels: [], faceSize: 1520, initialViewParameters: { yaw: 0, pitch: 0, fov: 1.5708 }, linkHotspots: [], infoHotspots: [], map: { x: 40, y: 30 } },
    { id: "4-23", name: "4-23", levels: [], faceSize: 1520, initialViewParameters: { yaw: 0, pitch: 0, fov: 1.5708 }, linkHotspots: [], infoHotspots: [], map: { x: 40, y: 20 } },
    { id: "4-24", name: "4-24", levels: [], faceSize: 1520, initialViewParameters: { yaw: 0, pitch: 0, fov: 1.5708 }, linkHotspots: [], infoHotspots: [], map: { x: 40, y: 10 } },

    // Final inward turn
    { id: "4-25", name: "4-25", levels: [], faceSize: 1520, initialViewParameters: { yaw: 0, pitch: 0, fov: 1.5708 }, linkHotspots: [], infoHotspots: [], map: { x: 30, y: 10 } }
  ]
};

// 🔗 Scene connections (for arrows)
const connections = {
  "4-16": [ { target: "4-17", direction: "up", yaw: 0 } ],
  "4-17": [ { target: "4-16", direction: "down", yaw: Math.PI }, { target: "4-18", direction: "up", yaw: 0 } ],
  "4-18": [ { target: "4-17", direction: "down", yaw: Math.PI }, { target: "4-19", direction: "up", yaw: 0 } ],
  "4-19": [ { target: "4-18", direction: "down", yaw: Math.PI }, { target: "4-20", direction: "right", yaw: Math.PI / 2 } ],
  "4-20": [ { target: "4-19", direction: "left", yaw: -Math.PI / 2 }, { target: "4-21", direction: "right", yaw: Math.PI / 2 } ],
  "4-21": [ { target: "4-20", direction: "left", yaw: -Math.PI / 2 }, { target: "4-22", direction: "up", yaw: 0 } ],
  "4-22": [ { target: "4-21", direction: "down", yaw: Math.PI }, { target: "4-23", direction: "up", yaw: 0 } ],
  "4-23": [ { target: "4-22", direction: "down", yaw: Math.PI }, { target: "4-24", direction: "up", yaw: 0 } ],
  "4-24": [ { target: "4-23", direction: "down", yaw: Math.PI }, { target: "4-25", direction: "left", yaw: -Math.PI / 2 } ],
  "4-25": [ { target: "4-24", direction: "right", yaw: Math.PI / 2 } ]
};

// 🔄 Merge into linkHotspots
for (const scene of window.data.scenes) {
  const links = connections[scene.id] || [];
  scene.linkHotspots = links.map(link => ({
    yaw: link.yaw,
    pitch: 0,
    rotation: 0,
    target: link.target,
    direction: link.direction,
    customYaw: link.yaw
  }));
}
