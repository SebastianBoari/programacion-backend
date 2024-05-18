document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')

    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const username = document.getElementById('username').value

        try {
            const response = await fetch('/chat/setusername', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username })
            })

            if (response.ok) {
                window.location.href = '/chat'

            } else {
                console.error('Failed to set username')

            }
        } catch (error) {
            console.error('Error setting username:', error)
        }
    })
})
