//declaring variables
const button = document.querySelector('.button');
const deleteNotes = document.querySelectorAll('.delete');
const editNotes = document.querySelectorAll('.edit');
let container = document.querySelector('.container');

document.addEventListener('DOMContentLoaded', showItem)

//delete notes function
deleteNotes.forEach((button)=>{
      button.addEventListener('click', (e)=>{
         let target = e.target;
         let txt = '';
         if(confirm('are you sure you want to delete?')){
             target.parentElement.parentElement.remove();
         } 
      })
})

//edit notes function
editNotes.forEach((edit)=>{
    edit.addEventListener('click',()=>{
    })
})

//adding an event listener
button.addEventListener('click',()=>{
   //blur the background
   container.style.filter = 'blur(2px)';
   //show 'create note'
   let createNote = document.querySelector('.create-new-note');
   createNote.style.visibility = 'visible';
   //close modal
   let closeModal = document.querySelector('.close');
   closeModal.addEventListener('click', ()=>{
       createNote.style.visibility = 'hidden';
       container.style.filter = 'blur(0px)'
   })
})

//displaying to UI
let buttn = document.querySelector('.submit');
let noteslist = document.querySelector('.notes-list');
buttn.addEventListener('click',()=>{
    let header = document.querySelector('.header').value;
    let content = document.querySelector('#textarea').value;
    const items = document.querySelectorAll('.note');
    //creating new element
    let newdiv = document.createElement('div');
   newdiv.setAttribute('class','note')
   newdiv.innerHTML= `
   <h1 class="header-class">${header}</h1>
   <div class="content toggle">
   <p class="content-class">${content}</p>
        <button class="edit">edit</button>
        <button class="delete">delete</button>
    </div>
    </div>
   <p class="time-stamp">Last edited a few seconds ago</p>
   `;

   //add to local storage
   saveItem(newdiv.innerHTML)

    //some validation functionality
   if(header === '' || content === ''){
       let headerBorder = document.querySelector('.header');
       headerBorder.style.border = '2px solid red';
       headerBorder.placeholder = 'please fill in the input'
       
       let contentBorder = document.querySelector('#textarea');
       contentBorder.style.border = '2px solid red';
       contentBorder.placeholder = 'please fill in the content'
   }else{
    let headerBorder = document.querySelector('.header');
    headerBorder.style.border = 'none';
    
    let contentBorder = document.querySelector('#textarea');
    contentBorder.style.border = 'none';

    //append the content
    noteslist.appendChild(newdiv)
    
    //hide modal
    let createNote = document.querySelector('.create-new-note');
    createNote.style.visibility = 'hidden';
    container.style.filter = 'blur(0px)'

    //clear fields
    headerBorder.value = '';
    contentBorder.value =  '';

   }
   
   //delete notes
   const deleteNotes = document.querySelectorAll('.delete');
   deleteNotes.forEach((button)=>{
    button.addEventListener('click', (e)=>{
       let target = e.target.parentElement.parentElement;
       if(confirm('are you sure you want to delete?')){
           target.remove();
           deleteAll(target)
       } 
    })
    })

    //edit notes
    const editNotes = document.querySelectorAll('.edit');
    editNotes.forEach((edit)=>{
        edit.addEventListener('click', (e)=>{
            let target = e.target.parentElement.parentElement;
            let create = document.querySelector('.create-new-note-edit');
            let close = create.querySelector('.close');
            close.addEventListener('click', ()=>{
                    create.style.visibility = 'hidden'
            });
            create.style.visibility = 'visible';
            let headerContent = target.querySelector('.header-class').innerHTML;
            let content = target.querySelector('.content-class').innerHTML;
           //create new element for editing
           let headerEditModal = create.querySelector('.header').value = headerContent;
           let contentEditModal = create.querySelector('#textarea').value = content;
           //save edited content
           let save = create.querySelector('.submit');
           save.addEventListener('click', ()=>{
               let editedHeader = create.querySelector('.header').value;
              let editedContent = create.querySelector('#textarea').value;
              //adding to local storage
               addHeader(editedHeader);
               addContent(editedHeader);
              let headerContent = target.querySelector('.header-class').innerHTML = editedHeader;
              let content = target.querySelector('.content-class').innerHTML = editedContent;
           })
        })
    })

    //fixing the timing functonality
    let time = newdiv.querySelector('.time-stamp');
    //setting a timing functionality
     let counter = 0;
     setInterval(()=>{
      counter++;
       if(counter <= 59){
        time.innerHTML = `Last edited a few seconds ago`
      }else if(counter >= 70){
        time.innerHTML = `Last edited some minutes ago`
      } else if( counter >= 3900){
        time.innerHTML = `Last edited hours ago`
      }
    },1000);
    
    
    //toggle notes
   const notes = document.querySelectorAll('.note');
   let showContent = false;
   notes.forEach((item)=>{
    item.addEventListener('click',(e)=>{
        let target = item;
        //let add = item.querySelector('.toggle');
         //item.classList.toggle('add')
        if(!showContent){
            let content = target.querySelector('.content').style.display = 'block';
            showContent = true
        } else if(showContent){
            let content = target.querySelector('.content').style.display = 'none';
            showContent = false
        }
    })
   })
});

//add an event listener
const items = document.querySelectorAll('.note');
 let showContent = false;
items.forEach((item)=>{
    item.addEventListener('click',(e)=>{
        let target = item;
        if(!showContent){
            let content = target.querySelector('.content').style.display = 'block';
            showContent = true
        } else if(showContent){
            let content = target.querySelector('.content').style.display = 'none';
            showContent = false
        }
    })
})

//Local storage
function saveItem(item){
    let items;
    //check if there is anything in the local storage.
    if(localStorage.getItem('items') === null){
        items =[]; 
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    items.push(item)
    localStorage.setItem("items", JSON.stringify(items))
  }

  //Show notes on UI using local storage
  function showItem(item) {
    let items;
  //check if there is anything in the local storage.
  if(localStorage.getItem('items') === null){
      items =[]; 
  } else {
      items = JSON.parse(localStorage.getItem('items'))
  }

  let showContent = false;

  items.forEach((item)=>{
    let saveNote = document.createElement('div');
    saveNote.setAttribute('class','note')
    saveNote.innerHTML = item;
    let edit = saveNote.querySelector('.edit').remove();
    console.log(edit);
    noteslist.appendChild(saveNote)

    //delete note from local storage
    let deleteNote = saveNote.querySelectorAll('.delete');
    deleteNote.forEach((button)=>{
        button.addEventListener('click', (e)=>{
           let target = e.target.parentElement.parentElement;
           if(confirm('are you sure you want to delete?')){
               target.remove();
               deleteAll(target)
           } 
        })
        })
    
        //toggle notes on/off
       saveNote.addEventListener('click',(e)=>{
        let target = saveNote;
        if(!showContent){
            let content = target.querySelector('.content').style.display = 'block';
            showContent = true
        } else if(showContent){
            let content = target.querySelector('.content').style.display = 'none';
            showContent = false
        }
    })

      //fixing the timing functionality
       let time = saveNote.querySelector('.time-stamp');
      //setting a timing functionality
       let counter = 0;
       setInterval(()=>{
       counter++;
       if(counter <= 59){
         time.innerHTML = `Last edited a few minutes ago`
       }else if(counter >= 70){
       time.innerHTML = `Last edited some minutes ago`
      } else if( counter >= 3900){
       time.innerHTML = `Last edited hours ago`
      }
      },1000);

  });  
};

//delete on UI and local storage
function deleteAll(item){
    let items;
    if(localStorage.getItem('items') === null){
    items =[]; 
} else {
    items = JSON.parse(localStorage.getItem('items'))
}

  const todoIndex = item.children[0].innerText;
  items.splice(items.indexOf(todoIndex), 1);
  localStorage.setItem("items", JSON.stringify(items))
} 
