const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const title = document.querySelector('.title');
const cover = document.querySelector('.cover > img');
const progress = document.querySelector('#progress');
const volume = document.querySelector('#volume');
const tracks = [
  {
    src: "track-1",
    title: "Jefferson Airplane - White Rabbit",
    cover: "jeff.png"
  },
  {
    src: "track-2",
    title: "The Pixies - Where is my mind",
    cover: "pixies.png"
  },
  {
    src: "track-3",
    title: "System Of A Down - Chop Suey",
    cover: "chop-suey.png"
  },
  {
    src: "track-4",
    title: "Null Positiv - Insomnia",
    cover: "null.png"
  },
  {
    src: "track-5",
    title: "Arch Enemy - Reason to believe",
    cover: "reason.png"
  },
  {
    src: "track-6",
    title: "Slipknot - Vermillion, Pt.2",
    cover: "verm.png"
  },
  {
    src: "track-7",
    title: "Hozier - In The Woods Somewhere",
    cover: "hoz.png"
  },
  {
    src: "track-8",
    title: "Otep - Lie",
    cover: "otep.png"
  },
  {
    src: "track-9",
    title: "Dropkick Murphys - Surrender",
    cover: "drop.png"
  },
  {
    src: "track-10",
    title: "Null Positiv - Freiheit",
    cover: "null.png"
  },
  {
    src: "track-11",
    title: "System Of A Down - Aerials",
    cover: "toxi.png"
  },
  {
    src: "track-12",
    title: "Slipknot - Psychosocial",
    cover: "psy.png"
  },
  {
    src: "track-13",
    title: "Arch Enemy - No Gods, No Masters",
    cover: "nogods.png"
  }
];

let currentInd = 0;
let isPlaying = false;
let audio;

function loadTrack(index) {
  // Если уже есть аудио, останавливаем его
  if (audio) {
    audio.pause();
  }

  // Создаем новый объект Audio
  audio = new Audio(`./audio/${tracks[index].src}.mp3`);
  title.textContent = tracks[index].title;
  cover.setAttribute('src', `./img/${tracks[index].cover}`);

  // Переменная для хранения длительности трека
  let duration;

  // Добавляем обработчик события loadedmetadata
  audio.addEventListener('loadedmetadata', () => {
    // Получаем длительность трека в секундах
    duration = audio.duration;
  });

  // Добавляем обработчик события timeupdate
  audio.addEventListener('timeupdate', () => {
    if (duration) { // Проверяем, что duration определена
      const currentTime = audio.currentTime;
      const remainingTime = duration - currentTime;

      const durationMinutes = String(Math.floor(duration / 60)).padStart(2, '0');
      const durationSeconds = String(Math.floor(duration % 60)).padStart(2, '0');

      const formattedMinutes = String(Math.floor(remainingTime / 60)).padStart(2, '0');
      const formattedSeconds = String(Math.floor(remainingTime % 60)).padStart(2, '0');

      document.querySelector('.dur').textContent = `${durationMinutes}:${durationSeconds}`;
      document.querySelector('.rem').textContent = `${formattedMinutes}:${formattedSeconds}`;

      if (remainingTime <= 0) {
        playNext();
      }
    }
  });

  // Запускаем загрузку метаданных
  audio.load();

  audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  });
  
  progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });
  
  volume.addEventListener('input', () => {
    audio.volume = volume.value / 100;
  });
}

function playTrack() {
  audio.play();
  isPlaying = true;
  playBtn.classList.add('paused');
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playBtn.classList.remove('paused');
}

playBtn.addEventListener('click', () => {
  if (!audio) {
    loadTrack(currentInd); // Загружаем трек только один раз
  }

  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});

prevBtn.addEventListener('click', () => {
  currentInd = (currentInd - 1 + tracks.length) % tracks.length; // Обновляем индекс
  loadTrack(currentInd); // Загружаем новый трек
  playTrack(); // Начинаем воспроизведение
});

nextBtn.addEventListener('click', () => {
  currentInd = (currentInd + 1) % tracks.length; // Обновляем индекс
  loadTrack(currentInd); // Загружаем новый трек
  playTrack(); // Начинаем воспроизведение
});

function playNext() {
  currentInd = (currentInd + 1) % tracks.length; // Обновляем индекс
  loadTrack(currentInd); // Загружаем новый трек
  playTrack(); // Начинаем воспроизведение
}
