const API_URL = "http://localhost:3000/api";

async function loadUsers() {
    const token = localStorage.getItem('token');
    const target = document.getElementById('user-list-target');

    try {
        const response = await fetch(`${API_URL}/users`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Accès refusé ou erreur serveur");

        const users = await response.json();
        
        target.innerHTML = users.map(user => `
            <tr id="user-row-${user.id_user}">
                <td>${user.id_user}</td>
                <td>${user.last_name || ''} ${user.first_name || ''}</td>
                <td>${user.email}</td>
                <td><strong>${user.role}</strong></td>
                <td>
                    ${user.role !== 'admin' ? 
                        `<button class="btn-delete-admin" onclick="deleteUser(${user.id_user})">Supprimer</button>` 
                        : '---'}
                </td>
            </tr>
        `).join('');

    } catch (error) {
        console.error(error);
        target.innerHTML = `<tr><td colspan="5" style="color:red">Erreur : ${error.message}</td></tr>`;
    }
}

// On attache la fonction au window pour qu'elle soit accessible depuis le HTML
window.deleteUser = async (id) => {
    if (!confirm("Es-tu sûr de vouloir supprimer cet utilisateur ?")) return;

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            document.getElementById(`user-row-${id}`).remove();
            alert("Utilisateur supprimé !");
        } else {
            alert("Erreur lors de la suppression");
        }
    } catch (error) {
        console.error(error);
    }
};

// Initialisation
document.addEventListener('DOMContentLoaded', loadUsers);