/**
 * Demo credentials for the sign-in screen.
 *
 * THIS IS A FAÇADE, NOT SECURITY. The site is a static export with no server,
 * so these strings ship inside the JavaScript bundle: anyone who opens the
 * browser's developer tools can read them, and anyone who clears the gate flag
 * in session storage walks straight past the screen. It exists to set the scene
 * for the demo. Real access control needs a backend — see the README.
 */
export const DEMO_USERNAME = "puig";
export const DEMO_PASSWORD = "puig2026";

/** Where the unlocked flag lives. Session storage, so a new tab asks again. */
export const ACCESS_KEY = "sales-passport:access";
