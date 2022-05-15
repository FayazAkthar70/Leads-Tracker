const inputEL = document.getElementById("input-el")
const saveTabEl = document.getElementById("saveTab-el")
const formEl = document.getElementById("form-el")
const tabsEl = document.getElementById("tabs-el")
const deleteEl = document.getElementById("delete-el")
const myLeadsLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

let myLeads = []

if (myLeadsLocalStorage){
    myLeads = myLeadsLocalStorage
    renderList(myLeads)
}

function renderList(myLeads){
    let listItems = ""
    for (let index = 0; index < myLeads.length; index++) {
        const element = myLeads[index];
        listItems +=    `<li>
        <a target="_blank" href="${element}" class="list-group-item list-group-item-action"> ${element} </a>
        </li>`
    }
    tabsEl.innerHTML = listItems
}

inputEL.addEventListener("click",()=>{
    myLeads.push(formEl.value)
    renderList(myLeads)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    formEl.value = ""
})

deleteEl.addEventListener("click",()=>{
    localStorage.clear()
    myLeads = []
    renderList(myLeads)
})

saveTabEl.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        console.log(tabs)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderList(myLeads)
    })
})


