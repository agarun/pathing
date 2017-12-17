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
  addPreviousSearch(event) {
    const canvasHistory = document.getElementById('canvas-history');
    const historyCtx = canvasHistory.getContext('2d');
    const newHistory = document.createElement('button');
    const finalSearchImage = document
      .getElementById('canvas')
      .getContext('2d')
      .getImageData(0, 0, CNS.WIDTH, CNS.HEIGHT);

    newHistory.addEventListener('mouseover', () => {
      historyCtx.putImageData(finalSearchImage, 0, 0);
    });

    newHistory.addEventListener('mouseout', () => {
      historyCtx.clearRect(0, 0, canvasHistory.width, canvasHistory.height);
    });

    newHistory.textContent = event.target.id;
    document.getElementById('past-searches').appendChild(newHistory);
  },
};

export default DOMHelper;
