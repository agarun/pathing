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
};

export default DOMHelper;
