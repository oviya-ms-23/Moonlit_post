/* script.js – vanilla JavaScript version of Moonlit Post Office */
console.log('Moonlit script loaded');

// -------------------- Data --------------------
const SAMPLE_LETTERS = [
  { id: 1, title: "A gentle reminder", content: "You are allowed to begin again. The world is patient." },
  { id: 2, title: "Midnight thought", content: "Sometimes the quiet night holds the loudest answers." },
  { id: 3, title: "Kindness note", content: "A small act of kindness is a seed that blossoms forever." },
  { id: 4, title: "Dream whisper", content: "Dreams are the moon's letters to our hearts." },
  { id: 5, title: "Comforting words", content: "When today feels heavy, remember you are a soft feather in a vast sky." }
];

// -------------------- Utilities --------------------
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error('Storage read error', e);
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error', e);
    alert('Could not save data – storage may be full or unavailable.');
  }
}

function clearElement(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

// -------------------- State --------------------
let savedLetters = loadFromStorage('savedLetters', []);

// -------------------- Rendering --------------------
const app = document.getElementById('app');

function renderHome() {
  clearElement(app);
  const container = document.createElement('div');
  container.className = 'main';
  container.innerHTML = `
    <h1 class="title">The Moonlit Post Office</h1>
    <p class="subtitle">Some words find their way home, even in the quietest hours.</p>
    <button class="btn" id="open-collection">Open a Letter</button>
    <button class="btn" id="open-write">Write a Letter</button>
    <button class="btn" id="open-desk">My Desk</button>
  `;
  app.appendChild(container);
  document.getElementById('open-collection').addEventListener('click', renderCollection);
  document.getElementById('open-write').addEventListener('click', renderWriteLetter);
  document.getElementById('open-desk').addEventListener('click', renderMyDesk);
}

function renderCollection() {
  clearElement(app);
  const container = document.createElement('div');
  container.className = 'main';
  const heading = document.createElement('h2');
  heading.className = 'subtitle';
  heading.textContent = 'Letter Collection';
  container.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'envelopes';
  SAMPLE_LETTERS.forEach(letter => {
    const env = document.createElement('div');
    env.className = 'envelope';
    env.tabIndex = 0;
    env.setAttribute('role', 'button');
    env.innerHTML = `<h3>${letter.title}</h3>`;
    env.addEventListener('click', () => openLetterModal(letter));
    env.addEventListener('keypress', e => { if (e.key === 'Enter') openLetterModal(letter); });
    grid.appendChild(env);
  });
  container.appendChild(grid);

  const backBtn = document.createElement('button');
  backBtn.className = 'btn';
  backBtn.textContent = 'Back';
  backBtn.addEventListener('click', renderHome);
  container.appendChild(backBtn);

  app.appendChild(container);
}

function openLetterModal(letter) {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.addEventListener('click', () => backdrop.remove());

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.addEventListener('click', e => e.stopPropagation());

  modal.innerHTML = `
    <button class="modal-close" aria-label="Close">×</button>
    <h2>${letter.title}</h2>
    <p>${letter.content}</p>
  `;
  modal.querySelector('.modal-close').addEventListener('click', () => backdrop.remove());

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);
}

function renderWriteLetter() {
  clearElement(app);
  const container = document.createElement('div');
  container.className = 'main';
  container.innerHTML = `
    <h2 class="subtitle">Write a Letter</h2>
    <div class="form-group">
      <label for="letter-title">Title</label>
      <input type="text" id="letter-title" />
    </div>
    <div class="form-group">
      <label for="letter-body">Letter</label>
      <textarea id="letter-body"></textarea>
    </div>
    <button class="btn" id="save-letter">Save</button>
    <button class="btn" id="back-home">Back</button>
  `;
  app.appendChild(container);
  document.getElementById('save-letter').addEventListener('click', () => {
    const title = document.getElementById('letter-title').value.trim();
    const body = document.getElementById('letter-body').value.trim();
    if (!title || !body) {
      alert('Both title and letter body are required.');
      return;
    }
    const newLetter = { id: Date.now(), title, content: body };
    savedLetters.push(newLetter);
    saveToStorage('savedLetters', savedLetters);
    alert('Letter saved!');
    document.getElementById('letter-title').value = '';
    document.getElementById('letter-body').value = '';
  });
  document.getElementById('back-home').addEventListener('click', renderHome);
}

function renderMyDesk() {
  clearElement(app);
  const container = document.createElement('div');
  container.className = 'main';
  const heading = document.createElement('h2');
  heading.className = 'subtitle';
  heading.textContent = 'My Little Desk';
  container.appendChild(heading);

  if (savedLetters.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'No saved letters.';
    container.appendChild(empty);
  } else {
    const list = document.createElement('ul');
    list.className = 'saved-list';
    savedLetters.forEach(letter => {
      const li = document.createElement('li');
      li.className = 'saved-item';
      const span = document.createElement('span');
      span.textContent = letter.title;
      const btnContainer = document.createElement('div');
      const viewBtn = document.createElement('button');
      viewBtn.className = 'btn';
      viewBtn.textContent = 'View';
      viewBtn.addEventListener('click', () => openLetterModal(letter));
      const delBtn = document.createElement('button');
      delBtn.className = 'btn';
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', () => {
        if (confirm('Delete this letter?')) {
          savedLetters = savedLetters.filter(l => l.id !== letter.id);
          saveToStorage('savedLetters', savedLetters);
          renderMyDesk(); // re‑render after deletion
        }
      });
      btnContainer.appendChild(viewBtn);
      btnContainer.appendChild(delBtn);
      li.appendChild(span);
      li.appendChild(btnContainer);
      list.appendChild(li);
    });
    container.appendChild(list);
  }

  const backBtn = document.createElement('button');
  backBtn.className = 'btn';
  backBtn.textContent = 'Back';
  backBtn.addEventListener('click', renderHome);
  container.appendChild(backBtn);

  app.appendChild(container);
}

// -------------------- Init --------------------
window.addEventListener('DOMContentLoaded', renderHome);
