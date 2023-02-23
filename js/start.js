const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 11;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// 점수 계산
function calResult(){
  var result = 0;
  for (let i = 0; i < select.length; i++) {
    result += select[i]; 
  }
  
  console.log("최종 답안 : " + select);
  console.log("총 합 : " + result);
  return result;
}

function setResult(){
  let point = calResult();
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block"
    }, 450)})
    setResult();
}

function addLinearScales(qIdx,number) {
  var a = document.querySelector('.answerBox');
  var ls = document.createElement('button');
  ls.classList.add('linearScalesList');
  ls.classList.add('my-3');
  ls.classList.add('py-3');
  ls.classList.add('mx-auto');
  ls.classList.add('fadeIn');

  a.appendChild(ls);
  ls.innerHTML = number;

  // 답안 선택시 이벤트
  ls.addEventListener("click", function(){
    var children = document.querySelectorAll('.linearScalesList');
    var answer = document.querySelectorAll('.answerList');
    
    // 모든 선택지 초기화후 사라짐
    for(let i = 0; i < children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    for (let i = 0; i < answer.length; i++) {
      answer[i].style.WebkitAnimation = "fadeOut 0.5s";
      answer[i].style.animation = "fadeOut 0.5s";      
    }
    
    setTimeout(() => {
      // 선택 저장
      select[qIdx] = number
      // console.log(select)

      // 숨기기
      for(let i = 0; i < children.length; i++){
        children[i].style.display = 'none';
      }
      for(let i = 0; i < answer.length; i++){
        answer[i].style.display = 'none';
      }
      goNext(++qIdx);
    },450)
  }, false);
}

function addAnswer(answerText, qIdx){
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  a.appendChild(answer);
  answer.innerHTML = answerText;
}

function goNext(qIdx){
  if(qIdx === endPoint){
    goResult();
    return;
  }

  // 질문 만들기
  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  addAnswer(qnaList[qIdx].a[0].answer, qIdx);
  for (let i = 1; i < 6; i++) {
    addLinearScales(qIdx,i);
  }
  addAnswer(qnaList[qIdx].a[1].answer, qIdx);
  
  // 질문 상태 바 업데이트
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block"
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}
