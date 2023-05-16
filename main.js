var newform = document.querySelector("#newform");
var username = document.querySelector("#username");
var email = document.querySelector("#email");
var submit = document.querySelector("#submit");
var adduser = document.querySelector("#adduser"); 
var dataneeded = new Map();

newform.addEventListener('submit', submitForm);
adduser.addEventListener('click', deleteUser);


function submitForm(e)
{
    e.preventDefault();

   axios.post("https://crudcrud.com/api/5d6376aa1f7f4b03b1b402992f0ab677/registration", {
    user: username.value,
    email: email.value
   })
   .then(res => console.log(res))
   .catch(err => console.log(err));

}

window.addEventListener('DOMContentLoaded', () => {

        const response =   axios.get('https://crudcrud.com/api/5d6376aa1f7f4b03b1b402992f0ab677/registration')
        .then(response =>{
        
    
        for(var i=0; i<response.data.length; i++)
        {
            dataneeded.set(response.data[i].email, response.data[i]._id);
            var li = document.createElement('li');
            var btn = document.createElement('button');
            var edit = document.createElement('button');
            var txt = document.createTextNode(response.data[i].email);
            edit.className = 'edit';
            var edittext = document.createTextNode('edit');
            edit.appendChild(edittext);
            btn.className = 'btn btn-danger btn-sm delete' ;
            var text = document.createTextNode('X');

            btn.appendChild(text);
    


            li.appendChild(txt);
            li.appendChild(btn);
            li.appendChild(edit);

            adduser.appendChild(li);
        }

        console.log(dataneeded);
        
        
    })
    .catch(err => console.log(err))

})

function deleteUser(e)
{
    var li = e.target.parentElement;
    var txt = li.innerHTML;
    
    var usern = "";

    for(var i=0; i<txt.length; i++)
    {
        if(txt.charAt(i) == '<')
        {
            break;
        }
        else{
                usern = usern + txt.charAt(i);
        }
    }

    console.log(dataneeded.get(usern));

    axios.delete(`https://crudcrud.com/api/5d6376aa1f7f4b03b1b402992f0ab677/registration/${dataneeded.get(usern)}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}