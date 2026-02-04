/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}"],
    theme: {
        extend: {
            colors: {
                background: '#121212',
                surface: '#1E1E1E',
                primary: '#BB86FC',
                secondary: '#03DAC6',
                error: '#CF6679',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
