const questionBank = [
  [0,'¿En qué ciudad nació la Universidad de Coimbra?',['Lisboa','Coimbra','Oporto','Braga'],0],
  [1,'¿Quién marcó el gol de Portugal en la final de la Eurocopa 2016?',['Cristiano Ronaldo','Éder','Nani','Gonçalo Guedes'],1],
  [2,'¿Qué flor da nombre a la revolución portuguesa de 1974?',['Rosa','Girasol','Clavel','Amapola'],2],
  [3,'¿Qué música portuguesa fue reconocida por la UNESCO en 2011?',['Flamenco','Tango','Samba','Fado'],3],
  [4,'¿Cuántas islas forman las Azores?',['7','9','12','5'],1],
  [5,'¿En qué año ocurrió el gran terremoto de Lisboa?',['1755','1855','1655','1955'],0],
  [6,'¿Qué selección ganó la primera Nations League en 2019?',['España','Francia','Portugal','Países Bajos'],2],
  [7,'¿En qué año entró en vigor la Constitución portuguesa actual?',['1910','1974','1986','1976'],3],
  [13,'¿Qué palacio alberga una biblioteca de unos 40.000 volúmenes?',['Pena','Mafra','Queluz','Ajuda'],1],
  [14,'¿Qué cultivo puedes encontrar en Gorreana, en São Miguel?',['Cacao','Café','Té','Arroz'],2],
  [15,'¿Cuál es el dulce portugués de hojaldre y crema?',['Pastel de nata','Macaron','Tiramisú','Baklava'],0],
  [16,'¿Con qué ciudad se asocia la francesinha?',['Faro','Évora','Coimbra','Oporto'],3],
  [17,'¿De qué carne se prepara una bifana?',['Pollo','Cerdo','Vacuno','Cordero'],1],
  [19,'¿De dónde es típica la poncha?',['Alentejo','Algarve','Madeira','Minho'],2],
  [21,'¿Cuántos goles marcó Eusébio en el Mundial de 1966?',['9','6','12','4'],0],
  [24,'¿Qué club portugués ganó la Copa de Europa en 1961 y 1962?',['Sporting','Porto','Braga','Benfica'],3],
  [26,'¿En qué año ingresó Portugal en las Comunidades Europeas?',['1976','1986','1996','2004'],1],
  [28,'¿En qué año terminó la monarquía portuguesa?',['1810','1974','1910','1940'],2],
  [30,'¿Qué escritor portugués recibió el Nobel de Literatura de 1998?',['José Saramago','Fernando Pessoa','Luís de Camões','Eça de Queirós'],0],
  [31,'¿Qué animal es el famoso símbolo de Barcelos?',['León','Golondrina','Sardina','Gallo'],3],
  [33,'¿Cuál es el punto más occidental de Europa continental?',['Cabo de São Vicente','Cabo da Roca','Cabo Norte','Cabo de Finisterre'],1],
  [34,'¿Dónde está la montaña más alta de Portugal?',['Serra da Estrela','Madeira','Isla de Pico','Sintra'],2],
  [35,'¿Qué son los currais de los viñedos de Pico?',['Muros de piedra volcánica','Barriles de vino','Barcas de pesca','Molinos'],0],
  [39,'¿Qué son las levadas de Madeira?',['Dunas','Puentes colgantes','Playas','Canales de agua'],3]
];
const board = document.querySelector('#quiz-board');
let round = [], current = 0, points = 0, answered = false, record = 0;
try { record = Math.max(0, Math.min(100, Number(localStorage.getItem('portugal-quiz-best')) || 0)); } catch {}
function showRecord() { document.querySelector('#quiz-record').textContent = `Tu mejor viaje: ${record} / 100 puntos`; }
function shuffle(list) { const result = [...list]; for (let i=result.length-1;i>0;i--) {const j=Math.floor(Math.random()*(i+1)); [result[i],result[j]]=[result[j],result[i]];} return result; }
function startQuiz() { round=shuffle(questionBank).slice(0,10);current=0;points=0;showQuestion(); }
function showQuestion() {
  answered=false; const item=round[current];
  board.innerHTML=`<div class="quiz-top"><span>Pregunta ${current+1} de 10</span><strong>${points} puntos</strong></div><progress max="10" value="${current}" aria-label="Preguntas completadas"></progress><span class="quiz-topic">${facts[item[0]].category}</span><h3 id="question-title" tabindex="-1">${item[1]}</h3><div class="quiz-options">${item[2].map((option,i)=>`<button class="answer" data-answer="${i}" type="button"><span>${'ABCD'[i]}</span>${option}</button>`).join('')}</div><div class="quiz-feedback" id="quiz-feedback" aria-live="polite" aria-atomic="true"></div><button class="button quiz-next" id="quiz-next" type="button" hidden>${current===9?'Ver mi resultado':'Siguiente pregunta'}</button>`;
  board.querySelectorAll('.answer').forEach(button=>button.addEventListener('click',()=>answerQuestion(Number(button.dataset.answer))));
  board.querySelector('#quiz-next').addEventListener('click',()=>{current++; if(current===10)finishQuiz();else showQuestion();});
  board.querySelector('h3').focus({preventScroll:true});
}
function answerQuestion(choice) {
  if(answered)return; answered=true;
  const item=round[current], correct=choice===item[3], fact=facts[item[0]];
  if(correct)points+=10;
  board.querySelector('.quiz-top strong').textContent=`${points} puntos`;
  board.querySelector('progress').value=current+1;
  board.querySelectorAll('.answer').forEach(button=>{const index=Number(button.dataset.answer);button.disabled=true;if(index===item[3]){button.classList.add('correct');button.insertAdjacentHTML('beforeend','<b aria-label="Respuesta correcta">✓</b>');}else if(index===choice){button.classList.add('incorrect');button.insertAdjacentHTML('beforeend','<b aria-label="Respuesta incorrecta">×</b>');}});
  board.querySelector('#quiz-feedback').innerHTML=`<strong>${correct?'¡Muito bem! +10 puntos':'Una historia nueva para tu viaje.'}</strong><p>${correct?'':`La respuesta correcta es ${item[2][item[3]]}. `}${fact.text}</p>${sourceMarkup(fact)}`;
  board.querySelector('#quiz-next').hidden=false;
}
function finishQuiz() {
  if(points>record){record=points;try{localStorage.setItem('portugal-quiz-best',String(record));}catch{}}
  showRecord();
  const title=points>=80?'¡Tienes alma portuguesa!':points>=50?'¡Vas camino de conocer Portugal!':'Tu viaje acaba de empezar.';
  board.innerHTML=`<div class="quiz-result"><span class="quiz-topic">VIAGEM COMPLETA</span><div class="result-score">${points}<small>/ 100</small></div><h3 tabindex="-1">${title}</h3><p>Acertaste ${points/10} de 10 preguntas. ${points>=80?'Ya llevas un pedacito de Portugal contigo.':'Cada respuesta es una historia más para recordar.'}</p><button class="button primary" id="restart" type="button">Jugar otra partida</button><a class="quiz-explore" href="#explorar">Seguir explorando curiosidades</a></div>`;
  board.querySelector('#restart').addEventListener('click',startQuiz);board.querySelector('h3').focus({preventScroll:true});
}
board.innerHTML='<div class="quiz-start"><span class="quiz-topic">O DESAFIO COMEÇA AQUI</span><div class="start-number" aria-hidden="true">10<span>?</span></div><h3>Un viaje. Diez descubrimientos.</h3><p>¿Listo para poner a prueba tu lado portugués?</p><button class="button primary" id="start-quiz" type="button">¡Vamos lá! Empezar</button></div>';
board.querySelector('#start-quiz').addEventListener('click',startQuiz);showRecord();
