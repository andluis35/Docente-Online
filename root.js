import { Navigate } from "./route/routes.js";
import { getSession } from "./auth/auth.js";

(function() {
    const usuarioLogado = getSession();

    if (!usuarioLogado) {
        Navigate.login()
        return;
    } else {
        Navigate.home()
    }
})();