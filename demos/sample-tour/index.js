'use strict';

(function () {
  var Marzipano = window.Marzipano;
  var data = window.data;

  var panoElement = document.querySelector('#pano');
  var viewer = new Marzipano.Viewer(panoElement, {
    controls: { mouseViewMode: data.settings.mouseViewMode }
  });

  // Build all scenes
  var scenes = data.scenes.map(function (sceneData) {
    var source = Marzipano.ImageUrlSource.fromString("img/" + sceneData.id + ".jpg");
    var geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);

    var limiter = Marzipano.RectilinearView.limit.traditional(
      sceneData.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180
    );
    var view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);

    var scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });

    // Add arrow hotspots with reversed handling
    sceneData.linkHotspots.forEach(function (hotspot) {
      let yaw = hotspot.yaw;
      let direction = hotspot.direction;
      let target = hotspot.target;

      const isReversed = /^4\-(1[5-9]|2[0-5])$/.test(sceneData.id);

      // If reversed and direction is up/down, flip direction and yaw
      if (isReversed && (direction === 'up' || direction === 'down')) {
        direction = direction === 'up' ? 'down' : 'up';
        yaw += Math.PI;
        if (yaw > Math.PI) yaw -= 2 * Math.PI;
      }

      var arrow = document.createElement('img');
      arrow.src = "img/" + getDirectionIcon(direction);
      arrow.classList.add('hotspot');

      var wrapper = document.createElement('div');
      wrapper.className = 'hotspotContainer';
      wrapper.appendChild(arrow);

      scene.hotspotContainer().createHotspot(wrapper, {
        yaw: yaw,
        pitch: hotspot.pitch
      });

      arrow.addEventListener('click', function () {
        switchScene(target); // use default yaw override logic
      });
    });

    return {
      id: sceneData.id,
      scene: scene,
      view: view
    };
  });

  // Switch scenes and update view
  function switchScene(id, yawOverride = null) {
    const sceneObj = scenes.find(s => s.id === id);
    const original = data.scenes.find(s => s.id === id);

    if (sceneObj && original) {
      sceneObj.scene.switchTo();

      let yaw = yawOverride !== null
        ? yawOverride
        : original.initialViewParameters.yaw;

      if (/^4\-(1[5-9]|2[0-5])$/.test(id)) {
        yaw += Math.PI;
        if (yaw > Math.PI) yaw -= 2 * Math.PI;
      }

      sceneObj.view.setParameters({
        yaw: yaw,
        pitch: original.initialViewParameters.pitch,
        fov: original.initialViewParameters.fov
      });

      updateMiniMapPointer(id);
    }
  }

  function getDirectionIcon(direction) {
    switch (direction) {
      case "up": return "up.png";
      case "down": return "down.png";
      case "left": return "left.png";
      case "right": return "right.png";
      default: return "up.png";
    }
  }

  // Start at the first scene
  switchScene(data.scenes[0].id);

  // Populate dropdowns
  function populateDropdowns() {
    const startSelect = document.getElementById('startScene');
    const endSelect = document.getElementById('endScene');

    data.scenes.forEach(scene => {
      const option = document.createElement('option');
      option.value = scene.id;
      option.textContent = scene.name;
      startSelect.appendChild(option.cloneNode(true));
      endSelect.appendChild(option.cloneNode(true));
    });
  }
  populateDropdowns();

  // Pause button
  let walkthroughInterval = null;
  let isPaused = false;
  let path = [];
  let currentIndex = 0;

  const pauseBtn = document.createElement('button');
  pauseBtn.textContent = "Pause";
  pauseBtn.style.cssText = `
    position: absolute;
    bottom: 70px;
    right: 20px;
    z-index: 9999;
    padding: 6px 12px;
    background: orange;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-family: sans-serif;
  `;
  pauseBtn.onclick = togglePause;
  document.body.appendChild(pauseBtn);

  // Start walkthrough
  window.startWalkthrough = function () {
    if (walkthroughInterval) clearInterval(walkthroughInterval);
    isPaused = false;
    pauseBtn.textContent = "Pause";

    const start = document.getElementById('startScene').value;
    const end = document.getElementById('endScene').value;

    if (start === end) {
      switchScene(start);
      return;
    }

    path = findPath(start, end);
    if (!path || path.length < 2) {
      alert("No valid path found.");
      return;
    }

    currentIndex = 0;
    switchScene(path[currentIndex++]);

    walkthroughInterval = setInterval(() => {
      if (isPaused) return;
      if (currentIndex >= path.length) {
        clearInterval(walkthroughInterval);
        return;
      }

      const next = path[currentIndex++];
      switchScene(next);
    }, 3000);
  };

  function togglePause() {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Resume" : "Pause";
  }

  function findPath(start, end, visited = new Set()) {
    if (start === end) return [start];
    visited.add(start);

    const neighbors = (data.scenes.find(s => s.id === start)?.linkHotspots || []).map(h => h.target);

    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        const subPath = findPath(neighbor, end, visited);
        if (subPath.length) return [start, ...subPath];
      }
    }
    return [];
  }

  function updateMiniMapPointer(id) {
    const scene = data.scenes.find(s => s.id === id);
    if (!scene?.map) return;

    const pointer = document.getElementById('minimap-pointer');
    pointer.style.left = scene.map.x + '%';
    pointer.style.top = scene.map.y + '%';
  }
})();
