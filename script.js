const numberToTense = {
    0: 'present',
    1: 'subjunctive',
    2: 'past'
};

const numberToSubject = {
    0: 'I',
    1: 'you',
    2: 'he/she/it',
    3: 'we',
    4: 'you all',
    5: 'they'
};

let verb = -1;
let tense = -1;
let subject = -1;
let verbData = [];


function initiate() {
    fetch('greek-verbs.json')
    .then(response => response.json())
    .then(data => {
        verbData = data;
        listenForEnter();
        newTask();
    });
}

function listenForEnter() {
    document.getElementById('input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          check();
        }
      });    
}

function newTask() {
    verb = Math.floor(Math.random() * verbData.length);
    tense = Math.floor(Math.random() * 3);
    subject = Math.floor(Math.random() * 6);

    document.getElementById('verb').innerText = verbData[verb][0];
    document.getElementById('tense').innerText = numberToTense[tense];
    document.getElementById('subject').innerText = numberToSubject[subject];
}

function check() {
    const input = document.getElementById('input').value;
    let target = [verbData[verb][tense+1][subject]];
    
    if (target[0].includes('/')) {
        target = target[0].split('/');
    }

    if (target.includes(input)) {
        document.getElementById('result').innerText = '';
        document.getElementById('input').value = '';
        newTask();
    } else {
        document.getElementById('result').innerText = `Oops! The correct form is ${target}. Type it correctly to proceed.`;
    }
}