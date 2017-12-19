import CNS from './constants';

const DOMHelper = {
  addMazeToggler() {
    const toggleActive = (event) => {
      if (event.target.getAttribute('class') === 'jump') {
        document.querySelectorAll('.jump').forEach((anchor) => {
          anchor.classList.toggle('active');
        });
      }
    };
    const classNameJump = document.getElementsByClassName('jump');
    Array.from(classNameJump).forEach((klass) => {
      klass.addEventListener('click', toggleActive, false);
    });
  },
  buttonColorFill() {
    ['bfs', 'dfs', 'dijkstra', 'astar'].forEach((id) => {
      document.getElementById(id).classList.remove('disabled');
      document.getElementById(id).classList.add('search-btn');
    });
  },
  addPreviousSearch(search) {
    const canvasHistory = document.getElementById('canvas-history');
    const historyCtx = canvasHistory.getContext('2d');
    const newHistory = document.createElement('a');
    const finalSearchImage = document
      .getElementById('canvas')
      .getContext('2d')
      .getImageData(0, 0, CNS.WIDTH, CNS.HEIGHT);

    canvasHistory.width = CNS.WIDTH;
    canvasHistory.height = CNS.HEIGHT;

    newHistory.addEventListener('mouseover', () => {
      historyCtx.putImageData(finalSearchImage, 0, 0);
    });

    newHistory.addEventListener('mouseout', () => {
      historyCtx.clearRect(0, 0, CNS.WIDTH, CNS.HEIGHT);
    });

    newHistory.textContent = search.id;
    newHistory.classList.add('past-search-btn');
    document.getElementById('past-searches').appendChild(newHistory);
  },
};

export default DOMHelper;
