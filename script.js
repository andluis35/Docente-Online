import { Navigate } from "./route/routes.js";
import { getSession } from "./auth/auth.js";

(function() {
    const userData = getSession();

    if (!userData) {
        Navigate.login()
        return;
    } else {
        Navigate.discentes()
    }
})();