import { authService } from '../services/auth.js';

export async function checkAccess() {
    const token = localStorage.getItem('token');
    const path = window.location.pathname;
    const isAuthPage = path.includes('login.html') || path.includes('register.html');

    if (!token && !isAuthPage) {
        window.location.href = 'login.html';
        return;
    }
    if (token && isAuthPage) {
        window.location.href = 'main.html';
        return;
    }
    if (token && !isAuthPage) {
        try {
            const user = await authService.getMe();
            if (user.error) throw new Error("Invalid Token");
        } catch (err) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        }
    }
}