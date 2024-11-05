// Class to represent the user
class User {
    constructor(name, sobreNome, email, rua, cep, bairro, cidade, estado, numero, complemento) {
        this.name = name;           // User's first name
        this.sobreNome = sobreNome; // User's last name
        this.email = email;         // User's email address
        this.rua = rua;             // User's street address
        this.cep = cep;             // User's postal code (CEP)
        this.bairro = bairro;       // User's neighborhood
        this.cidade = cidade;       // User's city
        this.estado = estado;       // User's state
        this.numero = numero;       // User's house number
        this.complemento = complemento; // Additional address information
    }
}

// User Manager class
class UserManager {
    constructor() {
        this.users = [];            // Array to store users
        this.editIndex = null;      // Index of the user being edited
    }

    // Function to add or update a user
    addUser() {
        const user = this.getUserData(); // Retrieve user data from the form
        if (this.editIndex === null) {
            this.users.push(user); // Add new user
        } else {
            this.users[this.editIndex] = user; // Update existing user
            this.editIndex = null; // Reset edit index
            document.getElementById("submit-btn").textContent = "Cadastrar"; // Reset button text
        }
        this.updateUserList(); // Update the displayed user list
        this.clearForm(); // Clear the form fields
    }

    // Function to capture the data from the form
    getUserData() {
        return new User(
            document.getElementById("name").value,
            document.getElementById("sobreNome").value,
            document.getElementById("email").value,
            document.getElementById("rua").value,
            document.getElementById("cep").value,
            document.getElementById("bairro").value,
            document.getElementById("cidade").value,
            document.getElementById("estado").value,
            document.getElementById("numero").value,
            document.getElementById("complemento").value
        );
    }

    // Function to clear the form
    clearForm() {
        document.getElementById("user-form").reset(); // Reset the form fields
    }

    // Function to update the user list
    updateUserList() {
        const userList = document.getElementById("user-list"); // Get the user list element
        userList.innerHTML = ""; // Clear the current list
        this.users.forEach((user, index) => {
            const listItem = document.createElement("li"); // Create a new list item
            listItem.innerHTML = `
                <strong>${user.name} ${user.sobreNome}</strong> - ${user.email} <br>
                ${user.rua}, ${user.numero}, ${user.complemento} - ${user.bairro}, ${user.cidade}, ${user.estado} <br>
                <button class="btn-edit" onclick="userManager.editUser(${index})">Editar</button>
                <button class="btn-delete"  onclick="if(confirm('Tem certeza que deseja deletar este usuário?')) userManager.deleteUser(${index})">Deletar</button>
            `;
            userList.appendChild(listItem); // Add the list item to the user list
        });
    }

    // Function to edit a user
    editUser(index) {
        const user = this.users[index]; // Retrieve the user data by index
        document.getElementById("name").value = user.name; // Fill the "First Name" field
        document.getElementById("sobreNome").value = user.sobreNome; // Fill the "Last Name" field
        document.getElementById("email").value = user.email; // Fill the "Email" field
        document.getElementById("rua").value = user.rua; // Fill the "Street" field
        document.getElementById("cep").value = user.cep; // Fill the "Postal Code" field
        document.getElementById("bairro").value = user.bairro; // Fill the "Neighborhood" field
        document.getElementById("cidade").value = user.cidade; // Fill the "City" field
        document.getElementById("estado").value = user.estado; // Fill the "State" field
        document.getElementById("numero").value = user.numero; // Fill the "House Number" field
        document.getElementById("complemento").value = user.complemento; // Fill the "Additional Info" field

        this.editIndex = index; // Set the index of the user being edited
        document.getElementById("submit-btn").textContent = "Atualizar"; // Change button text to "Update"
    }

    // Function to delete a user
    deleteUser(index) {
        this.users.splice(index, 1); // Remove the user from the array
        this.updateUserList(); // Update the displayed user list
    }
}

// Function to get address by postal code (CEP)
async function getAddressByCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove all non-numeric characters from the CEP input field.

    // Check if the CEP has 8 digits.
    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) throw new Error('Erro na API');
            const data = await response.json();
            
            if (!data.erro) {
                // Fill the form fields with the address data returned by the API.
                document.getElementById('rua').value = data.logradouro; // Fill the "Street" field.
                document.getElementById('bairro').value = data.bairro; // Fill the "Neighborhood" field.
                document.getElementById('cidade').value = data.localidade; // Fill the "City" field.
                document.getElementById('estado').value = data.uf; // Fill the "State" field.
            } else {
                // Show an alert if the CEP is not found.
                alert('CEP não encontrado!'); // Notify the user that the CEP was not found.
            }
        } catch (error) {
            alert('Erro ao buscar o CEP: ' + error.message); // Notify the user of an API error.
        }
    } else {
        // Show an alert if the CEP is invalid (not 8 digits).
        alert('CEP inválido!'); // Notify the user that the CEP is invalid.
    }
}


// Create an instance of UserManager
const userManager = new UserManager();
