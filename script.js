let s = 0, t = null;

function draw() {
  let h = String(Math.floor(s / 3600)).padStart(2, '0');
  let m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  let ss = String(s % 60).padStart(2, '0');
  timer.innerText = `${h}:${m}:${ss}`;
}

function start() {
  if (!t) {
    t = setInterval(() => {
      s++;
      draw();
    }, 1000);
  }
}

function stop() {
  clearInterval(t);
  t = null;
}

function resetT() {
  stop();
  s = 0;
  draw();
}

function login() {
  msg.innerText = id.value ?
    `${id.value}님 환영합니다!` :
    '아이디를 입력하세요';
}

function saveRec() {
  let r = JSON.parse(localStorage.records || '[]');
  let min = Math.floor(s / 60);
  r.push({
    d: new Date().toLocaleDateString(),
    m: min
  });
  localStorage.records = JSON.stringify(r);
  load();
}

function load() {
  let r = JSON.parse(localStorage.records || '[]');
  list.innerHTML = '';
  let total = 0;

  r.forEach(x => {
    total += x.m;
    let li = document.createElement('li');
    li.textContent = `${x.d} : ${x.m}분`;
    list.appendChild(li);
  });

  document.getElementById('total').innerText = total;
}

draw();
load();
