import circlr from 'circlr';

const el = document.querySelector('.rotation');

circlr(el)
  .scroll(true)
  .play()
  .on('show', n => {});