function getLinks(){
    const value = JSON.parse(localStorage.getItem("links"));
    let localStorageArr =[];
    if (value !== null){
        return  localStorageArr.concat(value);
    }
    return localStorageArr
   
}

function updateLocalStorage(data, toAdd = false){
    let add = toAdd;
    let arr = [];
    console.log(add);
    if(add){
    arr = arr.concat(getLinks());
    console.log(arr)
    Array.isArray(data)?data.forEach(e=> arr.push(e)):arr.push(data);
    localStorage.setItem('links', JSON.stringify(arr));
    return
    }
    Array.isArray(data)?data.forEach(e=> arr.push(e)):arr.push(data);
    localStorage.setItem('links', JSON.stringify(arr));
}

export {updateLocalStorage,getLinks}


