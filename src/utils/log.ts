let typingTimer = null;

export async function selectLog(logId, logTitle, playBeepFn) {
  playBeepFn(1200, 0.05);
  clearTimeout(typingTimer);

  const displayBody = document.getElementById('display-body');
  document.getElementById('display-title').innerText = logTitle;
  displayBody.innerText = "DECRYPTING OBSERVATION DATA..."; 
  try {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
    const res = await fetch(`json/${logId}.json`);
    const data = await res.json();

    const bodyContent = data.body;
    displayBody.replaceChildren();
    let index = 0;
    function type() {
      if (index < bodyContent.length) {
        const char = bodyContent.charAt(index);
        if (char === '\n') {
          displayBody.appendChild(document.createElement('br'));
        } else {
          displayBody.appendChild(document.createTextNode(char));
        }
        if (char !== ' ' && char !== '\n') {
          playBeepFn(7000 + Math.random() * 200, 0.01);
        }
        index++;
        typingTimer = setTimeout(type, 35);
      }
    }
    type();
  } catch (err) {
    console.error(err);
    displayBody.innerText = "ERROR: LOG CORRUPTED OR UNREADABLE.";
  }
}

export function setupLogLinks(playBeepFn, selectLogFn) {
  document.querySelectorAll('.log-link').forEach(el => {
    el.addEventListener('mouseover', () => {
      playBeepFn(800, 0.02);
    });
    el.addEventListener('click', () => {
      const logId = el.getAttribute('data-log-id') || '';
      const logTitle = el.textContent || '';
      selectLogFn(logId, logTitle);
    });
  });
}
