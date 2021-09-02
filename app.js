let title,task;
let btn = document.querySelector(".forms-btn")
let edit = document.querySelector('.edity')
let editIndex = document.querySelector("#hidden")
let listArray = []


function updateList() {
    let lists = document.querySelector('.lists');
    listArray = JSON.parse(localStorage.getItem('list'))
    let list = '';
    if(listArray !== null) {
        if(listArray.length == 0) {
            list = `
            <img src="assets/doodle.svg" class="doodle" alt="doodle">
            `
        }else {
            listArray.forEach((e,index) => {
                list += `
                <div class="list">
                    <h1 class="title">${e[0]}</h1>
                    <h2 class="task">${e[1]}</h2>
                    <img src="assets/edit.svg" alt="edit" onclick="editItem(${index})" class="edit">
                    <img src="assets/delete.svg" alt="delete" onclick="removeItem(${index})" class="delete">
                </div>
                `
            });
        }
        
    }else {
        list = `
        <img src="assets/doodle.svg" class="doodle" alt="doodle">
        `
    }
    
    lists.innerHTML = list;
}

function removeItem(index) {
    console.log(`Deleting ${index} element`);
    listArray = JSON.parse(localStorage.getItem('list'))
    listArray.splice(index,1)
    localStorage.setItem('list',JSON.stringify(listArray))
    updateList()
}

function editItem(index) {
    listArray = JSON.parse(localStorage.getItem('list'))
    editList = listArray[index]
    editIndex.value = index;
    console.log(editIndex.value)
    document.querySelector(".forms-title").value = editList[0];
    document.querySelector(".forms-task").value = editList[1];
    document.querySelector(".addy").style.display = "none";
    edit.style.display = "block";
}

btn.addEventListener("click",()=>{
    title = document.querySelector(".forms-title").value;
    task = document.querySelector(".forms-task").value;
    if (localStorage.getItem('list')===null) {
        listArray = [];
        listArray.push([title.value,task.value]);
        localStorage.setItem('list',JSON.stringify(listArray))
    }else {
        listArray = JSON.parse(localStorage.getItem('list'))
        listArray.push([title,task]);
        localStorage.setItem('list',JSON.stringify(listArray))
    }
    document.querySelector(".forms-title").value = '';
    document.querySelector(".forms-task").value = '';
    updateList();
})

edit.addEventListener("click",()=> {
    listArray = JSON.parse(localStorage.getItem('list'))
    title = document.querySelector(".forms-title").value;
    task = document.querySelector(".forms-task").value;
    editList = listArray[editIndex.value]
    editList[0] = title;
    editList[1] = task;
    localStorage.setItem('list',JSON.stringify(listArray))
    document.querySelector(".forms-title").value = '';
    document.querySelector(".forms-task").value = '';
    updateList()
})

document.addEventListener("load",updateList())