const createAudio = sources => {
  const audio = new Audio();
  if ('preservesPitch' in audio) {
    audio.preservesPitch = false;
  } else if ('mozPreservesPitch' in audio) {
    audio.mozPreservesPitch = false;
  }
  sources.forEach(({ type, src }) => {
    const source = document.createElement('source');
    source.type = type;
    source.src = src;
    audio.appendChild(source);
  });
  return audio;
};

const play = audio => {
  if (!audio.paused) {
    audio.pause();
    if (typeof audio.fastSeek === 'function') {
      audio.fastSeek(0);
    } else {
      audio.currentTime = 0;
    }
  }
  audio.playbackRate = (Math.random() * 0.25) + 0.875;
  audio.play();
};

export default function soundsMiddleware() {
  const soundCache = {
    boop: createAudio([
      {
        src: '/sounds/boop.ogg',
        type: 'audio/ogg',
      },
      {
        src: '/sounds/boop.mp3',
        type: 'audio/mpeg',
      },
    ]),
    squeak: createAudio([
      {
        src: '/sounds/squeak.ogg',
        type: 'audio/ogg',
      },
      {
        src: '/sounds/squeak.mp3',
        type: 'audio/mpeg',
      },
    ]),
  };

  return () => next => action => {
    if (action.meta && action.meta.sound && soundCache[action.meta.sound]) {
      play(soundCache[action.meta.sound]);
    }

    return next(action);
  };
};
