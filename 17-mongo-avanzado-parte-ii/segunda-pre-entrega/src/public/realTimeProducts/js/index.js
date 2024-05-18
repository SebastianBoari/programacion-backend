const socket = io()

const productsContainer = document.getElementById('products')

socket.on('products', (products) => {
    productsContainer.innerHTML = ''
    
    for (const product of products) {
        productsContainer.innerHTML += `
        <div class="card-product">
            <img src="${product.thumbnail[0]}" alt="${product.description}"/>

            <div class="card-product-content">
                <h5>${product.title}</h5>
                
                <p>${product.description}</p>
                
                <p>ID: ${product._id}</p>

                <p>Status: ${product.status ? 'public' : 'private'}</p>

                <div>
                    <a href="#" class="viewMoreButton" data-id="${product._id}">View more</a>
                    <a href="#" class="deleteButton" data-id="${product._id}" >Delete</a>
                </div>
            </div>
        </div>
        `
        const deleteButtons = document.querySelectorAll('.deleteButton')
        deleteButtons.forEach((button) => {
            const pid = button.dataset.id
            button.addEventListener('click', () => {
                socket.emit('delete', pid)
            })
        })

        const viewMoreButtons = document.querySelectorAll('.viewMoreButton')
        viewMoreButtons.forEach((button) => {
            const pid = button.dataset.id
            button.addEventListener('click', () => {
                window.location.href = `/api/products/${pid}`
            })
        })
    }
})

const formCreate = document.getElementById('form-create')
formCreate.addEventListener('submit', (event) => {
    event.preventDefault()

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const code = document.getElementById('code').value
    const price = document.getElementById('price').value
    const status = document.getElementById('status').checked
    const stock = document.getElementById('stock').value
    const category = document.getElementById('category').value
    const thumbnail = document.getElementById('thumbnail').value
    const thumbnailFormatted = thumbnail.split(',')
    
    if(!title || !description || !code || !price || !status || !stock || !category){
        alert('Missed required fields.')
        return
    }

    const newProduct = {
        title: title,
        description: description,
        code: code,
        price: price,
        status: status,
        stock: stock,
        category: category,
        thumbnail: thumbnailFormatted ? thumbnailFormatted : []
    }

    socket.emit('create', newProduct)
    
    formCreate.reset()
})


const formUpdate = document.getElementById('form-update')
formUpdate.addEventListener('submit', (event) => {
    event.preventDefault()

    const pid = parseInt(document.getElementById('pid').value)
    const field = document.getElementById('field').value
    const data = document.getElementById('data').value
    const updateStatus = document.getElementById('update-status').checked
    console.log(updateStatus)

    if(!pid || !field || !data){
        if(field !== 'status' && !data){
            alert('Missed required fields.')
            return 
        }
    }

    if(field === 'price' || field === 'stock'){
        socket.emit('update', pid, field, Number(data))

    } else if(field === 'status'){
        socket.emit('update', pid, field, updateStatus)

    } else if(field === 'title' || field === 'description' || field === 'code' || field === 'category' || field === 'thumbnail'){
        socket.emit('update', pid, field, data)

    } else {
        alert('Required field does not exists.')
        return
    }

    formUpdate.reset()
})