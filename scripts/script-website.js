import { data } from "../data/data.js";
import { renderTableHTML } from "./table.js";
import { arranging } from "./algo.js";

const arr = [];

document.querySelector('tbody')
    .innerHTML = ``
;
    
document.querySelector('.js-add-button')
    .addEventListener('click', () => {

        const branchValue = document.querySelector('#branch').value;
        const yearValue = document.querySelector('#year').value;
        const typeValue = document.querySelector('#branch-type').value;
        const subjectValue = document.querySelector('#subject').value;
        const fromValue = document.querySelector('.js-from-input').value;
        const toValue = document.querySelector('.js-to-input').value;

        const isAllValues = (branchValue) && (yearValue) && (typeValue) && (subjectValue) && (fromValue) && (toValue);

        if (toValue.length > 2) {
            invalidTimeInterval();
            return;
        } else if (!(Number(toValue[1] < 9 || Number(toValue[1]) > 0))) {
           invalidTimeInterval();
            return;
        }

        if (isAllValues) {
            arr.push(generatingRollNumbers());
            calculatingTotalNumberOfStudents(arr);
            renderTableHTML();
            document.querySelector('#branch')
                .innerHTML =  `
                    <option select-branch value="">-- SELECT --</option>
                    <option value="CSM">CSE (Artificial Intelligence & Machine Learning)</option>
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="CSD">CSE (Data Science)</option>
                    <option value="CSC">CSE (Cyber Security)</option>
                    <option value="CSBS">Computer Science & Business System</option>
                    <option value="CE">Civil Engineering</option>
                    <option value="ECE">Electronics & Communication Engineering</option>
                    <option value="EEE">Electrical & Electronics Engineering</option>
                    <option value="IT">Information Technology</option>
                    <option value="ME">Mechanical Engineering</option>
                    <option value="MBA">Master of Business Administration</option>
            `;
            document.querySelector('#branch-type')
                .innerHTML = document.querySelector('#subject')
                    .innerHTML = document.querySelector('#year')
                        .innerHTML = `
                            <option selected value="">-- SELECT --</option>
            `;
            document.querySelector('.js-from-input')
                .value = document.querySelector('.js-to-input')
                    .value = '';
        } else {
            invalidTimeInterval();
        }
        
    }
);

document.querySelector('#branch')
    .addEventListener('change', (Event) => {

        document.querySelector('.invalid-input')
                .classList.remove('js-invalid-input');

        let html = `
            <option id="select-year" selected value="">--SELECT--</option>
            `;
        data.forEach((dataItem) => {
            if(dataItem.branch === Event.target.value){
                dataItem.yearList.forEach((Item) => {
                    html += `
                    <option value='${Item.value}'>${Item.year}</option>
                    `;
                });
            }
            document.querySelector('#year')
            .innerHTML = html;
        });
        if(document.querySelector('#select-branch'))
            document.querySelector('#select-branch').remove();
    }
);
    
document.querySelector('#year')
    .addEventListener('change', (Event) => {
        if(document.querySelector('.year'))
        document.querySelector('.year').remove();
    
        if (document.querySelector('#year').value === 'i' || document.querySelector('#branch').value === 'MBA') {
                document.querySelector('#branch-type').innerHTML =`
                <option id="select-branch-type" value="">-- SELECT --</option>
                <option value="Regular">Regular</option>
                `;
        } else {
            document.querySelector('#branch-type').innerHTML = `
            <option id="select-branch-type" value="">-- SELECT --</option>
            <option value="Regular">Regular</option>
            <option value="L.E">Lateral Entry</option>
            `;
        }
        if(document.querySelector('#select-year'))
        document.querySelector('#select-year').remove();
    }
);

document.querySelector('#branch-type')
    .addEventListener('change',(Event) => {
        let html = `
        <option class="select-exam" selected value="">--Select--</option>
        `;
        data.forEach((dataItem) => {
            if (dataItem.branch === document.querySelector('#branch').value) {
               dataItem.yearList.forEach((yearItem, index) => {
                   if(yearItem.value === document.querySelector('#year').value){
                        dataItem.subjectList[index].forEach((subjectItem) => {
                            html += `
                            <option value='${subjectItem.value}'>${subjectItem.subject}</option>
                            `;
                        })
                    }
                });
            }
        }
        );
        document.querySelector('#subject').innerHTML = html;
        data.forEach((dataItem) => {
            dataItem.yearList.forEach((yearItem,index) => {
                if (document.querySelector('#year').value === yearItem.value && (document.querySelector('#branch').value === dataItem.branch)){
                    dataItem.rollCode[index].value.forEach((rollCodeItem, indexRollCodeItem) => {
                        if (rollCodeItem === document.querySelector('#branch-type').value) {
                             document.querySelector('.roll-code').innerHTML = dataItem.rollCode[index].roll[indexRollCodeItem];
                            }
                        });
                    }
            });
         });
         if(document.querySelector('#select-branch-type'))
         document.querySelector('#select-branch-type').remove();
    }
);

document.querySelector('.js-room-columns')
    .addEventListener('change', (Event) => {
        const noOfColumns = document.querySelector('.js-room-columns').value;
        const noOfRows = document.querySelector('.js-room-rows')
            .value;
        const noOfStudents = document.querySelector('.js-inserting-value').value;
        if (noOfColumns <= 0 || noOfRows <= 0) {
            document.querySelector('.invalid-input-room-container')
                .classList.add('js-invalid-input');
            return;
        } else {
            document.querySelector('.invalid-input-room-container')
                .classList.remove('js-invalid-input');
        }
        document.querySelector('.js-required-rooms')
            .value = Math.ceil( noOfStudents / (noOfRows * noOfColumns));      
    }
);

document.querySelector('.js-room-rows')
    .addEventListener('change', () => {
        const noOfColumns = document.querySelector('.js-room-columns').value;
        const noOfRows = document.querySelector('.js-room-rows')
            .value;
        const noOfStudents = document.querySelector('.js-inserting-value').value;
        if (noOfColumns <= 0 || noOfRows <= 0) {
            document.querySelector('.invalid-input-room-container')
                .classList.add('js-invalid-input');
            return;
        } else {
            document.querySelector('.invalid-input-room-container')
                .classList.remove('js-invalid-input');
        }
        document.querySelector('.js-required-rooms')
            .value = Math.ceil( noOfStudents / (noOfRows * noOfColumns)); 
    }
);

function generatingRollNumbers () {
    const array = [];
    const newArray = [];
    const fromInputString = document.querySelector('.js-from-input').value;
    let toInputString = document.querySelector('.js-to-input').value;
    const fromInput = Number(document.querySelector('.js-from-input').value);
    const toInput = Number(document.querySelector('.js-to-input').value);
    if((fromInputString.length > 2) || (toInputString.length > 2)){
        return;
    }
    if(!toInput) {
        toInputString = toInputString[0].toUpperCase() + toInputString[1];
    }
    if (!toInput){
        numberedGeneratedRolls(fromInput, 99, array);
        alphaNumberedGenerateRolls(toInputString, array);
    } else {
        numberedGeneratedRolls(fromInput, toInput, array);
    }
    return array;
}

function numberedGeneratedRolls (fromInput, toInput, array) {
    const rollCodeString = document.querySelector('.roll-code').innerText;
    for(let i = fromInput; i <= toInput; i++){
        if(i < 10)
            array.push({
                subjectId : document.querySelector('#subject').value,
                generatedId: `${document.querySelector('#branch').value}`,
                rollNo : `${rollCodeString}0${i}`
            });
        else
            array.push({
                subjectId : document.querySelector('#subject').value,
                generatedId: `${document.querySelector('#branch').value}`,
                rollNo : `${rollCodeString}${i}`
            });
    }
}

function alphaNumberedGenerateRolls (toInputString, array) {
    const rollCodeString = document.querySelector('.roll-code').innerText;
    for (let i = 65; i <= toInputString.charCodeAt(0); i++){
        for (let j = 0; j < 10; j++) {
            if( (i === toInputString.charCodeAt(0)) && (j > Number(toInputString[1])))
                break;
            array.push({
                subjectId : document.querySelector('#subject').value,
                generatedId: `${document.querySelector('#branch').value}`,
                rollNo : `${rollCodeString}${String.fromCharCode(i)+j}`
            });
        }
    }
}

function calculatingTotalNumberOfStudents (arr) {
    let noOfStudents = 0;
    arr.forEach((arrItem) => {
        arrItem.forEach((arrayItem) => {
            noOfStudents += 1;
        });
    });
    document.querySelector('.js-inserting-value')
        .value = noOfStudents;
}

document.querySelector('.generate-button')
    .addEventListener('click', () => {
        localStorage.setItem('rows-columns-object',JSON.stringify({
            rows : document.querySelector('.js-room-rows').value,
            columns: document.querySelector('.js-room-columns').value
        }))
        arranging(arr);
    }
);

function invalidTimeInterval () {
    document.querySelector('.invalid-input')
        .classList.add('js-invalid-input');
    setTimeout(() => {
        document.querySelector('.invalid-input')
            .classList.remove('js-invalid-input');
    }, 5000);
}