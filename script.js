/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const CHECKED = "images/checked.png";
const UNCHECKED = "images/unchecked.png";

function restart(event)
{
    const button = event.currentTarget;

    const answer=button.parentNode;

    //nascondo e svuoto
    answer.classList.add('hidden');
    answer.innerHTML='';

    for(const box of boxes)
    {  
        const checkbox = box.querySelector('.checkbox');
        checkbox.src=UNCHECKED;
        box.classList.remove('overlay');
        box.classList.remove('selected');
        box.addEventListener('click',Onclick);
    }

    selectedBoxes.splice(0,selectedBoxes.length);
}


function getAnswer()
{
    for(const sel of selectedBoxes)
    {
        answers[sel.dataset.questionId]=sel.dataset.choiceId;
    }

    let choiche_id='';
    if(answers.one!==answers.two && answers.two!==answers.three)
    {
        choiche_id=answers.one;
    }else 
    {
        if(answers.one=answers.two)
        {
            choiche_id=answers.one;
        } else {
            if(answers.one=answers.three)
            {
                choiche_id=answers.one;
            }else{
                choiche_id=answers.two;
            }
        }
    }
    
    const section = document.querySelector('#answer');
    section.classList.remove('hidden');
    const new_h1 = document.createElement('h1');
    new_h1.textContent = RESULTS_MAP[choiche_id].title;
    section.appendChild(new_h1);

    const new_p = document.createElement('p');
    new_p.textContent = RESULTS_MAP[choiche_id].contents;
    section.appendChild(new_p);

    const new_button = document.createElement('button');
    new_button.textContent = 'Ricomincia il quiz!';
    section.appendChild(new_button);
    new_button.addEventListener('click',restart);  
}


function Onclick(event)
{
    const box = event.currentTarget;
    const id=box.dataset.questionId;

    if(box.className==='overlay')
    {
        box.classList.remove('overlay'); 
        for(const sel of selectedBoxes)
        {
            const data=sel.dataset.questionId;
            if(id===data)
            {
                //cambio checkbox e sfondo
                const checkbox = sel.querySelector('.checkbox');
                checkbox.src=UNCHECKED;
                sel.classList.remove('selected');

                //rimozione dalle selezionate
                selectedBoxes.splice(selectedBoxes.indexOf(sel),1);
                sel.addEventListener('click',Onclick);
            }
        }
    }

    //cambio checkbox e sfondo e metto nei selezionati
    const checkbox = box.querySelector('.checkbox');
    checkbox.src=CHECKED;
    box.classList.add('selected');
    selectedBoxes.push(box);

    const grid=box.parentNode;
    const freeBoxes=grid.querySelectorAll('div');
    for(const free of freeBoxes)
    {
        if(free!==box)
        {
            free.classList.add('overlay');
        }
    }

    box.removeEventListener('click',Onclick);

    if(selectedBoxes.length===3)
    {
        getAnswer();
        for(const free of freeBoxes)
        {
            free.removeEventListener('click',Onclick);  
        }
    }
}

const answers = {};
const selectedBoxes = [];
const boxes = document.querySelectorAll('.choice-grid div');
for(const box of boxes)
{  
    box.addEventListener('click',Onclick);
}

