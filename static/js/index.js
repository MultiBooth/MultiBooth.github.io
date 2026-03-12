const moreWorksContainer = document.getElementById('moreWorksContainer');
const moreWorksDropdown = document.getElementById('moreWorksDropdown');
const moreWorksToggle = document.getElementById('moreWorksToggle');
const moreWorksClose = document.getElementById('moreWorksClose');
const copyBibtexButton = document.getElementById('copyBibtexButton');
const scrollToTopButton = document.getElementById('scrollToTopButton');
const bibtexCode = document.getElementById('bibtex-code');

function setMoreWorksOpen(isOpen) {
  if (!moreWorksDropdown || !moreWorksToggle) {
    return;
  }

  moreWorksDropdown.hidden = !isOpen;
  moreWorksToggle.setAttribute('aria-expanded', String(isOpen));
}

function toggleMoreWorks() {
  if (!moreWorksDropdown) {
    return;
  }

  setMoreWorksOpen(moreWorksDropdown.hidden);
}

async function copyBibTeX() {
  if (!copyBibtexButton || !bibtexCode) {
    return;
  }

  const codeText = bibtexCode.textContent ?? '';
  const label = copyBibtexButton.querySelector('.copy-label');

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(codeText);
    } else {
      throw new Error('Clipboard API unavailable');
    }
  } catch (_error) {
    const textArea = document.createElement('textarea');
    textArea.value = codeText;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  copyBibtexButton.classList.add('is-copied');
  if (label) {
    label.textContent = 'Copied';
  }

  window.setTimeout(() => {
    copyBibtexButton.classList.remove('is-copied');
    if (label) {
      label.textContent = 'Copy';
    }
  }, 1800);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function syncScrollButton() {
  if (!scrollToTopButton) {
    return;
  }

  scrollToTopButton.classList.toggle('visible', window.scrollY > 320);
}

if (moreWorksToggle) {
  moreWorksToggle.addEventListener('click', toggleMoreWorks);
}

if (moreWorksClose) {
  moreWorksClose.addEventListener('click', () => setMoreWorksOpen(false));
}

if (copyBibtexButton) {
  copyBibtexButton.addEventListener('click', copyBibTeX);
}

if (scrollToTopButton) {
  scrollToTopButton.addEventListener('click', scrollToTop);
}

document.addEventListener('click', (event) => {
  if (!moreWorksContainer || !moreWorksDropdown || moreWorksDropdown.hidden) {
    return;
  }

  if (!moreWorksContainer.contains(event.target)) {
    setMoreWorksOpen(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMoreWorksOpen(false);
  }
});

window.addEventListener('scroll', syncScrollButton, { passive: true });
window.addEventListener('load', syncScrollButton);

window.toggleMoreWorks = toggleMoreWorks;
window.copyBibTeX = copyBibTeX;
window.scrollToTop = scrollToTop;
