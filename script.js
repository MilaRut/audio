const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const vinyl = document.querySelector('.vinyl');
const title = document.querySelector('.title');
const cover = document.querySelector('.cover > img');
const tonearm = document.querySelector('.tonearm');
const progress = document.querySelector('#progress');
const volume = document.querySelector('#volume');
const preloader = document.querySelector('.preloader');
const volumePlus = document.querySelector('.vol-plus');
const volumeMinus = document.querySelector('.vol-minus');
const tracks = [
  {
    src: "track-1",
    title: "Jefferson Airplane - White Rabbit | 05:08",
    cover: "jeff.png"
  },
  {
    src: "track-2",
    title: "The Pixies - Where is my mind | 03:32",
    cover: "pixies.png"
  },
  {
    src: "track-3",
    title: "System Of A Down - Chop Suey | 03:25",
    cover: "chop-suey.png"
  },
  {
    src: "track-4",
    title: "Null Positiv - Insomnia | 04:05",
    cover: "null.png"
  },
  {
    src: "track-5",
    title: "Arch Enemy - Reason to believe | 04:47",
    cover: "reason.png"
  },
  {
    src: "track-6",
    title: "Slipknot - Vermillion, Pt.2 | 03:44",
    cover: "verm.png"
  },
  {
    src: "track-7",
    title: "Hozier - In The Woods Somewhere | 05:31",
    cover: "hoz.png"
  },
  {
    src: "track-8",
    title: "Otep - Lie | 03:34",
    cover: "otep.png"
  },
  {
    src: "track-9",
    title: "Dropkick Murphys - Surrender | 03:15",
    cover: "drop.png"
  },
  {
    src: "track-10",
    title: "Null Positiv - Freiheit | 04:08",
    cover: "null.png"
  },
  {
    src: "track-11",
    title: "System Of A Down - Aerials | 03:55",
    cover: "toxi.png"
  },
  {
    src: "track-12",
    title: "Slipknot - Psychosocial | 04:01",
    cover: "psy.png"
  },
  {
    src: "track-13",
    title: "Arch Enemy - No Gods, No Masters | 04:14",
    cover: "nogods.png"
  }
];

let currentInd = 0;
let isPlaying = false;
let audio;

function loadTrack(index) {
  if (audio) {
    audio.pause();
  }

  audio = new Audio(`./audio/${tracks[index].src}.mp3`);
  title.textContent = tracks[index].title;
  cover.setAttribute('src', `./img/${tracks[index].cover}`);

  let duration;

  audio.addEventListener('loadedmetadata', () => {
    duration = audio.duration;
  });

  audio.addEventListener('timeupdate', () => {
    if (duration) {
      const currentTime = audio.currentTime;

      const durationMinutes = String(Math.floor(duration / 60)).padStart(2, '0');
      const durationSeconds = String(Math.floor(duration % 60)).padStart(2, '0');

      const progressMinutes = String(Math.floor(audio.currentTime / 60)).padStart(2, '0');
      const progressSeconds = String(Math.floor(audio.currentTime % 60)).padStart(2, '0');

      document.querySelector('.dur').textContent = `${durationMinutes}:${durationSeconds}`;
      document.querySelector('.progr').textContent = `${progressMinutes}:${progressSeconds}`;

      if (currentTime === duration) {
        playNext();
      }
    }
  });

  audio.load();

  audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  });

  progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });

  progress.addEventListener('mousedown', () => {
    if (isPlaying) {
      pauseTrack();
    }
  });

  progress.addEventListener('touchstart', () => {
    if (isPlaying) {
      pauseTrack();
    }
  });

  progress.addEventListener('mouseup', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;

    if (!isPlaying) {
      playTrack();
    }
  });

  progress.addEventListener('touchend', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;

    if (!isPlaying) {
      playTrack();
    }
  });

  audio.volume = volume.value / 100;

  volume.addEventListener('input', () => {
    audio.volume = volume.value / 100;
  });

  volumeMinus.addEventListener('click', () => {
    volume.value = Math.max(0, volume.value - 5);
    audio.volume = volume.value / 100;
  });


  volumePlus.addEventListener('click', () => {
    volume.value = Math.min(100, parseInt(volume.value) + 5);
    audio.volume = volume.value / 100;
  });
}

function playTrack() {
  audio.play();
  isPlaying = true;
  playBtn.classList.add('paused');
  vinyl.classList.remove('paused');
  tonearm.classList.add('rotated');
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playBtn.classList.remove('paused');
  vinyl.classList.add('paused');
  tonearm.classList.remove('rotated');
}

playBtn.addEventListener('click', () => {
  if (!audio) {
    loadTrack(currentInd);
  }

  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});

prevBtn.addEventListener('click', () => {
  currentInd = (currentInd - 1 + tracks.length) % tracks.length;
  loadTrack(currentInd);
  playTrack();
});

nextBtn.addEventListener('click', () => {
  currentInd = (currentInd + 1) % tracks.length;
  loadTrack(currentInd);
  playTrack();
});

function playNext() {
  currentInd = (currentInd + 1) % tracks.length;
  loadTrack(currentInd);
  playTrack();
}

window.addEventListener('load', () => {

  setTimeout(() => {
    preloader.classList.add('is-hidden');
    document.querySelector('.wrapper').style.display = 'flex';
  }, 2000);
})

console.log(`
  Оценка работы: 60 баллов
  все соответствует ТЗ, я сама кайфую от результата :)
  надеюсь, тебе понравится мой плеер
  по всем вопросам можно писать мне в дискорд (https://discordapp.com/users/932258504213938207) или тг (https://t.me/degusyanz)
  всем хорошего музла! :)
  `)