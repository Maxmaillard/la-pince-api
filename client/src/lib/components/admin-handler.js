const API_URL = "http://localhost:3000/api";

async function loadUsers() {
    const token = localStorage.getItem('token');
    const target = document.getElementById('user-list-target');

    try {
        const response = await fetch(`${API_URL}/users`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Accès refusé");

        const users = await response.json();
        
        target.innerHTML = users.map(user => `
            <tr id="user-row-${user.id_user}">
                <td>${user.id_user}</td>
                <td>${user.last_name || ''} ${user.first_name || ''}</td>
                <td>${user.email}</td>
                <td id="role-badge-${user.id_user}"><strong>${user.role}</strong></td>
                <td>
                    <button class="btn-role" onclick="updateRole(${user.id_user}, '${user.role}')">
                        Passer en ${user.role === 'admin' ? 'User' : 'Admin'}
                    </button>

                    ${user.role !== 'admin' ? 
                        `<button class="btn-delete-admin" onclick="deleteUser(${user.id_user})">Supprimer</button>` 
                        : '<span style="color:gray">Protégé</span>'}
                </td>
            </tr>
        `).join('');

    } catch (error) {
        console.error(error);
        target.innerHTML = `<tr><td colspan="5" style="color:red">Erreur : ${error.message}</td></tr>`;
    }
}

// FONCTION POUR CHANGER LE ROLE
window.updateRole = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!confirm(`Changer le rôle vers ${newRole} ?`)) return;

    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/users/${id}/role`, {
            method: 'PATCH',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: newRole })
        });

        if (response.ok) {
            alert("Rôle mis à jour !");
            loadUsers(); // On recharge pour rafraîchir les badges et boutons
        } else {
            alert("Erreur lors de la modification du rôle");
        }
    } catch (error) {
        console.error(error);
    }
};

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

document.addEventListener('DOMContentLoaded', loadUsers);