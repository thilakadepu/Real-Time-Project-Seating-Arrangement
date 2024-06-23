export function arranging (arr) {

    const randomArr = [];
    let i = 0;
    console.log(arr);

    const newArr = makeOneArray (arr);
    let students = noOfStudents(arr);

    if (arr.length === 1) {
        const singleArr = [];
        newArr.forEach(() => {
            let r = randomNumber(newArr.length - 1);
            singleArr.push(newArr[r]);
        });
        console.log(singleArr);
        localStorage.setItem('random',JSON.stringify(singleArr));
    } else { 
        
        while (students > 0){
            let r = randomNumber(newArr.length - 1);
        
            if (i > 0 && (randomArr[i - 1].subjectId === newArr[r].subjectId)) {
                r = randomNumber(newArr.length - 1);
                continue;
            }
        
            if (allSame(newArr)) {
                console.log('Same');
                console.log(newArr);
                mergingArray (randomArr,newArr);
                break;
            }
        
            randomArr.push(newArr[r]);
            newArr.splice(r,1)
            i++;
            students--;
        }

        console.log(randomArr);
    }


    function mergingArray (randomArr, newArr) {
        // let bound = Math.round((randomArr.length/newArr.length) - 1);
        // if (bound <= 0)
        //     bound =  1;
        // console.log(bound);
        // const mergeArr = [];
        // mergeArr.push(randomArr[0]);
        // let index = 1;
        // let indexRemaining = 0;
        // for (let i = 1; i < randomArr.length + newArr.length; i++){
        //     if(i % bound === 0 && (newArr.length > 0)){
        //         mergeArr.push(newArr[indexRemaining]);
        //         indexRemaining++;
        //     }
        //     else {
        //         mergeArr.push(randomArr[index])
        //         index++;
        //     }

        // }
        // console.log(mergeArr);

        let bound = Math.round((randomArr.length/newArr.length) - 1);
        if (bound <= 0)
            bound =  1;
        console.log(bound);
        const mergeArr = [];
        let i = 0;
        while ( (randomArr.length > 0) || (newArr.length > 0)) {
            if (i % bound === 0) {
                if (newArr.length > 0){
                    mergeArr.push(newArr[0]);
                    newArr.splice(0,1)
                }
            }

            if (randomArr.length > 0) {
                mergeArr.push(randomArr[0]);
                randomArr.splice(0,1);
            }
            i ++;
        }

        console.log(mergeArr);
        localStorage.setItem('random',JSON.stringify(mergeArr));

    }
    
    function allSame (newArr) {
        let item = newArr[0].subjectId;
        for(let i = 1; i < newArr.length; i++) {
            if (item === newArr[i].subjectId){
                
            } else {
                return false;
            }
        }
        return true;
    }

    function randomNumber (bound) {
        let random;
        do {
            random = Math.round(Math.random() * (bound + 1));
        } while (random > bound);
        return random;
    }

    function noOfStudents (arr) {
        let count = 0;
        arr.forEach ((arrItem)=> {
            count += arrItem.length;
        });
        return count;
    }

    function makeOneArray (arr) {
        const newArr = [];
        arr.forEach ((arrItem) => {
            arrItem.forEach( (smallItem) => {
                newArr.push(smallItem);
            })
        });
        return newArr;
    }

}