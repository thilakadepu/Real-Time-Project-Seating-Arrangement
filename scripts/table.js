const tableData = [];

export function renderTableHTML () {
    document.querySelector('tbody')
        .innerHTML += `
        <tr>
            <td>1</td>
            <td>${branchOptionText}</td>
            <td>${yearOptionText}</td>
            <td>${branchTypeOptionText}</td>
            <td>${subjectOptionText}</td>
            <td>${getRollDetailsFromInput()} 
            </td>
            <td>${getRollDetailsToInput()}</td>
        </tr>
        `
    ; 
    tableData.push({
        branch: branchOptionText,
        year: yearOptionText,
        branchType: branchTypeOptionText,
        subject: subjectOptionText,
        fromRollNumber: getRollDetailsFromInput(),
        toRollNumber: getRollDetailsToInput()
    });
    console.log(tableData);
}

const branchMenu = document.querySelector('#branch');
let branchOptionText;

branchMenu.onchange = function () {
    const optionValue = this.value;
    const index = this.selectedIndex;
    branchOptionText = this.options[index].innerText;
};


const yearMenu = document.querySelector('#year');
let yearOptionText;

yearMenu.onchange = function () {
    const optionValue = this.value;
    const index = this.selectedIndex;
    yearOptionText = this.options[index].innerText;
};

const branchTypeMenu = document.querySelector('#branch-type');
let branchTypeOptionText;

branchTypeMenu.onchange = function () {
    const optionValue = this.value;
    const index = this.selectedIndex;
    branchTypeOptionText = this.options[index].innerText;
};

const subjectMenu = document.querySelector('#subject');
let subjectOptionText;

subjectMenu.onchange = function () {
    const optionValue = this.value;
    const index = this.selectedIndex;
    subjectOptionText = this.options[index].innerText;
};

function getRollDetailsFromInput () {
    const fromValue = document.querySelector('.js-from-input').value;
    const rollCode = document.querySelector('.roll-code').innerText;
    let tableFromValue;
    
    tableFromValue = rollCode + adjustingZero(fromValue);
    
    return  tableFromValue;
}

function getRollDetailsToInput () {
    const toValue = document.querySelector('.js-to-input').value;
    const rollCode = document.querySelector('.roll-code').innerText;
    let tableToValue;

    if (Number(toValue)) {
        tableToValue = rollCode + adjustingZero(Number(toValue));
    
        return tableToValue;
    }

    tableToValue = rollCode + adjustingZero(toValue);

    return tableToValue;
}

function adjustingZero (number) {
    if (number < 10) 
        return '0' + number ;
    return number;
}