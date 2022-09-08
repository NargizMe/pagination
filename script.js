const tableBody = document.querySelector('tbody');
const listContainer = document.querySelector('ul');
const search = document.querySelector('#search');

async function getAllProducts(){
    const response = await fetch('https://northwind.vercel.app/api/products');
    const data = await response.json();
    return data;
}

async function createProducts(page, limit){
    page = parseInt(page);
    limit = parseInt(limit);
    const products = await getAllProducts();

    tableBody.innerHTML = ''
    const slicedArray = products.slice(((page - 1) * limit) + 1, (limit * page) + 1);

    slicedArray.forEach((product) => {
        tableBody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.unitPrice}</td>
                <td>${product.unitsInStock}</td>
            </tr>
        `
    })
}

function createPagination(productsLength){
    for(let i=1; i<=Math.round(productsLength/10); i++){
        listContainer.innerHTML += `
            <li data-value='${i}' onclick="createProducts( '${i}', '${10}' )">${i}</li>
        `
    }
}

function searchName(){
    if(search.value === ''){
        createProducts(1, 10);
    }
    getAllProducts().then((data) => {
        data.forEach((product) => {
            if(product.name.toLowerCase().includes(inputText.toLowerCase())){
                tableBody.innerHTML = `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.unitPrice}</td>
                        <td>${product.unitsInStock}</td>
                    </tr>
                `
            }
        })
    })
}

window.onload = async function() {
    createProducts(1, 10);
    getAllProducts().then((data) => {
        createPagination(data.length);
    })

    search.addEventListener('keyup', async (e) => {
        let inputText = search.value.toLowerCase();
        const data = await getAllProducts();

        let filteredData = data.filter(product => (product.name.toLowerCase().includes(inputText)));

        filteredData.forEach((product) => {
            tableBody.innerHTML = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.unitPrice}</td>
                    <td>${product.unitsInStock}</td>
                </tr>
            `
        })
    })
}