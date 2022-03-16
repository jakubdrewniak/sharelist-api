console.log('POC script init')

const socket = io()

const payloadField = 'POC test field'

socket.emit('join', { payloadField }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})