class UserController {
    
    constructor(formId, tableId){
        this.formElement = document.getElementById(formId);
        this.tableElement = document.getElementById(tableId);
        this.onSubmit();
    }

    onSubmit(){
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            let btn = this.formElement.querySelector("[type=submit]");
            btn.disabled = true;   

            let values = this.getValues();
            if(!values) 
            {
                return false;
            }

            this.getPhoto().then(
                (content)=>{
                    
                    values.photo = content;

                    this.addLine(values);
                    this.formElement.reset();
                    btn.disabled = false;  
                },
                (e)=>{
                    console.error(e);
                }
            );
           
        });
    }
    getPhoto(){
        return new Promise((resolve, reject)=>{
            let fileReader = new FileReader();

            let elements = [...this.formElement.elements].filter(item => {
                if (item.name === 'photo') {
                    return item;
                }
            });

            let file = elements[0].files[0];

            fileReader.onload = () => {

                resolve(fileReader.result);
            };

            fileReader.onerror =(e) =>{
                reject(e);
            };
            if(file){
            fileReader.readAsDataURL(file);
            }else{
                resolve('dist/img/boxed-bg.jpg')
            }
        })
        
    }
    getValues(){

        let user= {};
        let isValid= true;
        [...this.formElement.elements].forEach((field, index) => {
            if(['name', 'email', 'password'].indexOf(field.name) >-1 && !field.value){
                field.parentElement.classList.add('has-error');
                isValid = false;

            }
            if (field.name == "gender") {
                if (field.checked) {
                    user[field.name] = field.value;
                }
            } else if(field.name== "admin"){
                user[field.name] = field.checked;
            }else {
                user[field.name] = field.value;
            }

        });
        console.log(user);

        if (!isValid){
            return false;
        }
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.admin,
            user.photo,
            user.admin
            );
    }
   
    addLine(dataUser) {
        let tr = document.createElement('tr');
        let users = JSON.stringify(dataUser);

        tr.dataset.user = users;
        console.log('euuu', tr.dataset.user);

        console.log('euuu2', JSON.parse(tr.dataset.user));


        tr.innerHTML = `
                    <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                    <td>${dataUser.name}</td>
                    <td>${dataUser.email}</td>
                    <td>${(dataUser.admin)? 'Sim':'Não'}</td>
                    <td>${Utils.dateFormat(dataUser.register)}</td>
                    <td>
                      <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                      <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                    </td>
                  `;
        this.tableElement.appendChild(tr);

        this.updateCount(users);
    }

    updateCount(dataSet) {

        let numberUsers = 0;
        let numberAdmin = 0;
        console.log('teste');


        [...this.tableElement.children].forEach(tr => {
            console.log(dataSet);
            numberUsers++;
            console.log(JSON.parse(JSON.stringify(dataSet)));
            //console.log(JSON.parse(tr.dataset.user));
            //if (user._admin) numberAdmin++;
        });
        console.log(numberUsers);
        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admins").innerHTML = numberAdmin;
    }


}