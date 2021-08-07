
const modalWrapper = document.querySelector('.modal-wrapper'); 
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');

const tableUsers = document.querySelector('.table-users');



let id;

/* <td>${doc.data().phone}</td>
      <td>${doc.data().email}</td> */
// Create element and render users
const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.id}'>
      <td>${doc.data().ProductID}</td>
      <td>${doc.data().ProductName}</td>
      <td>${doc.data().CategoryName }</td>
      <td>${doc.data().CategoryID}</td>
    
      <td>
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-delete">Delete</button>
      </td>
    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);

  // Click edit user
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener('click', () => {
    editModal.classList.add('modal-show');

    id = doc.id;
    editModalForm.ProductID.value = doc.data().ProductID;
    editModalForm.ProductName.value = doc.data().ProductName;
    editModalForm.CategoryName.value = doc.data().CategoryName;
    editModalForm.CategoryID.value = doc.data().CategoryID;
    // editModalForm.phone.value = doc.data().phone;
    // editModalForm.email.value = doc.data().email;

  });

  //Click delete user
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    db.collection('users').doc(`${doc.id}`).delete().then(() => {
      console.log('Document succesfully deleted!');
    }).catch(err => {
      console.log('Error removing document', err);
    });
  });

}

// Click add user button
btnAdd.addEventListener('click', () => {
  addModal.classList.add('modal-show');

  addModalForm.ProductID.value = '';
  addModalForm.ProductName.value = '';
  addModalForm.CategoryName.value = '';
  addModalForm.CategoryID.value = '';
  // addModalForm.phone.value = '';
  // addModalForm.email.value = '';
});

// User click anyware outside the modal
window.addEventListener('click', e => {
  if(e.target === addModal) {
    addModal.classList.remove('modal-show');
  }
  if(e.target === editModal) {
    editModal.classList.remove('modal-show');
  }
});

// Get all users
// db.collection('users').get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     renderUser(doc);
//   })
// });

// Real time listener
db.collection('users').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})

// Click submit in add modal
addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('users').add({
    ProductID: addModalForm.ProductID.value,
    ProductName: addModalForm.ProductName.value,
    CategoryName: addModalForm.CategoryName.value,
    CategoryID: addModalForm.CategoryID.value,
    // phone: addModalForm.phone.value,
    // email: addModalForm.email.value,
  });
  modalWrapper.classList.remove('modal-show');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('users').doc(id).update({
    ProductID: editModalForm.ProductID.value,
    ProductName: editModalForm.ProductName.value,
    CategoryName: editModalForm.CategoryName.value,
    CategoryID: addModalForm.CategoryID.value,
    // phone: editModalForm.phone.value,
    // email: editModalForm.email.value,
  });
  editModal.classList.remove('modal-show');
  
});


// search event code
function searchFun() {
  let filter = document.getElementById('myInput').value.toUpperCase(); // taking input to uppercase that if search with lower to upper it will as usaul show the filter
  
  let  myTable = document.getElementById('myTable');
  
  let tr = myTable.getElementsByTagName('tr');
  
  for(var i = 0; i<tr.length;i++){
    let td = tr[i].getElementsByTagName('td')[2];
  
    if (td){
      let  textvalue = td.textContent || td.innerHTML;
  
      if(textvalue.toUpperCase().indexOf(filter)> -1 ){
        tr[i].style.display = "";
      }else{
        tr[i].style.display = "none";
      }
    }
  }
  
  }



  //for the category part
  filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }
}

function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}


// dropdown category
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



