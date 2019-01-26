
class UserController {

    constructor(formId,formIdUpdate ,tableId) {
        this.formElement = document.getElementById(formId);
        this.formUpdateElement = document.getElementById(formIdUpdate);
        this.tableElement = document.getElementById(tableId);

        this.onSubmit();
        
        this.onEdit();
    }

    onEdit(){
    
        document.querySelector("#box-user-update .btn-cancel").addEventListener("click",e=>{
    
            this.showPanelCreate();
    
        });
        this.formUpdateElement.addEventListener("submit", event =>{
            
            event.preventDefault();
            
            let btn = this.formUpdateElement.querySelector("[type=submit]");
            
            btn.display = true;

            let newValuesFormUser = this.getValues(this.formUpdateElement);
            
            let index = this.formUpdateElement.dataset.trIndex;
            
            let tr = this.tableElement.rows[index];
            
            let userOld = JSON.parse(tr.dataset.user);
            
            let result = Object.assign({}, userOld, newValuesFormUser);
          
            this.getPhoto(this.formUpdateElement).then(
                (content) => {
                    if (!newValuesFormUser.photo) {
                        result._photo = userOld._photo
                    }else{
                        result._photo =content;
                    }
                    tr.dataset.user = JSON.stringify(result);

                    tr.innerHTML = `
                        <td><img src="${result._photo}" alt="User Image" class="img-circle img-sm"></td>
                        <td>${result._name}</td>
                        <td>${result._email}</td>
                        <td>${(result._admin) ? "Sim" : "Não"}</td>
                        <td>${Utils.dateFormat(result._register)}</td>
                        <td>
                            <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                            <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
                        </td>`;
                    this.addEventsTr(tr);
                    this.updateCount();


                    this.formUpdateElement.reset();
                    btn.disabled = false;
                    this.showPanelCreate();

                },
                (e) => {
                    console.error(e);
                }
            );

        });
    }
    onSubmit() {
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            let btn = this.formElement.querySelector("[type=submit]");
            btn.disabled = true;

            let values = this.getValues(this.formElement);
            if (!values) {
                return false;
            }

            this.getPhoto(this.formElement).then(
                (content) => {

                    values.photo = content;

                    this.addLine(values);
                    this.formElement.reset();
                    btn.disabled = false;
                },
                (e) => {
                    console.error(e);
                }
            );

        });
    }
    getPhoto(formElement) {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();

            let elements = [...formElement.elements].filter(item => {
                if (item.name === 'photo') {
                    return item;
                }
            });

            let file = elements[0].files[0];

            fileReader.onload = () => {

                resolve(fileReader.result);
            };

            fileReader.onerror = (e) => {
                reject(e);
            };
            if (file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve('dist/img/boxed-bg.jpg')
            }
        })

    }
    getValues(formElement) {

        let user = {};
        let isValid = true;
        [...formElement.elements].forEach((field, index) => {
            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false;

            }
            if (field.name == "gender") {
                if (field.checked) {
                    user[field.name] = field.value;
                }
            } else if (field.name == "admin") {
                user[field.name] = field.checked;
            } else {
                user[field.name] = field.value;
            }

        });
        console.log(user);

        if (!isValid) {
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
        tr.dataset.user = JSON.stringify(dataUser);
        console.log('debug',tr.dataset.user);

        tr.innerHTML = `
        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${(dataUser.admin) ? "Sim" : "Não"}</td>
        <td>${Utils.dateFormat(dataUser.register)}</td>
        <td>
            <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
        </td>`;
        
        this.addEventsTr(tr);

        this.tableElement.appendChild(tr);
        console.log(tr);
        this.updateCount();
    }

    addEventsTr(tr){
        tr.querySelector(".btn-delete").addEventListener("click", e=>{
            if(confirm("Deseja realmente excluir?")){
                tr.remove();
                this.updateCount();
            }
        });

        tr.querySelector(".btn-edit").addEventListener("click", e => {
            let jsonDateUserForm = JSON.parse(tr.dataset.user);
            //let loadDateUserForm = document.querySelector("#form-user-update");

            this.formUpdateElement.dataset.trIndex = tr.sectionRowIndex;

            for (let name in jsonDateUserForm) {
                let field = this.formUpdateElement.querySelector("[name=" + name.replace("_", "") + "]");

                if (field) {
                    //if (field.type == 'file') continue;
                    switch (field.type) {
                        case 'file':
                            continue;

                            break;
                        case 'radio':
                            field = this.formUpdateElement.querySelector("[name=" + name.replace("_", "") + "][value" + jsonDateUserForm[name] + "]");

                            break;
                        case 'checkbox':
                            field.checked = jsonDateUserForm[name];
                            break;
                        default:
                            field.value = jsonDateUserForm[name];
                    }


                }

            }
            this.formUpdateElement.querySelector(".photo").src = jsonDateUserForm._photo;
            this.showPanelUpdate();
        });
    }
    showPanelCreate(){
        document.querySelector("#box-user-create").style.display = "block";
        document.querySelector("#box-user-update").style.display = "none";

    }

    showPanelUpdate(){
        document.querySelector("#box-user-create").style.display = "none";
        document.querySelector("#box-user-update").style.display = "block";

    }
    updateCount() {
        let numberUsers = 0;
        let numberAdmin = 0;
        console.log('eeeeeeeeeeeeeeeeeeeeeee',this.tableElement.children);
        [...this.tableElement.children].forEach((tr) => {
            numberUsers++;
            let user = JSON.parse(tr.dataset.user);
            if (user._admin) numberAdmin++;
        });
        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;
    }


}