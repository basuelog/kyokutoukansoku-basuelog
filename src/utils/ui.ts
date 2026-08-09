import { beepPlayer } from './audio';

export function triggerRandomGlitch() {
  document.documentElement.classList.add('glitch-active');
  const glitchDuration = Math.random() * 120 + 40;
  setTimeout(() => {
    document.documentElement.classList.remove('glitch-active');
  }, glitchDuration);
  const nextGlitchTime = Math.random() * 5000 + 2000;
  setTimeout(triggerRandomGlitch, nextGlitchTime);
}

export async function requestFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    }
  } catch (err) {
    console.warn("Fullscreen failed:", err);
  }
}

export function hideIntroOverlay() {
  const overlay = document.getElementById('intro-overlay');
  if (overlay) {
    overlay.style.transition = 'opacity 0.5s';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.display = 'none', 500);
  }
}

export function updateBootLog(message: string) {
  const logBox = document.getElementById('boot-log');
  if (logBox) {
    logBox.innerHTML += message + '<br>';
  }
}

export async function startSystem() {
  await requestFullscreen();
  beepPlayer.playBeep(400, 0.1);

  const btnGroup = document.querySelector('.btn-group') as HTMLElement | null;
  if (btnGroup) btnGroup.style.display = 'none';
  
  const logBox = document.getElementById('boot-log');
  if (logBox) logBox.innerHTML = '';
  
  updateBootLog("CONNECTING TO FAR EAST SERVER...");
  
  setTimeout(() => { updateBootLog("[SECURITY CHECK... OK]"); beepPlayer.playBeep(600, 0.05); }, 500);
  setTimeout(() => { updateBootLog("MOUNTING JSON ARCHIVE... DONE"); beepPlayer.playBeep(600, 0.05); }, 1100);
  setTimeout(() => { updateBootLog("LAUNCHING 'BASUE-LOG'..."); beepPlayer.playBeep(1000, 0.1); }, 1700);
  setTimeout(() => {
    hideIntroOverlay();
    triggerRandomGlitch();
  }, 2300);
}
