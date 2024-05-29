
function SortProduct(products) {
    let j = 0

    for (let i = 0; i < products.length; i++) {
        let product_max = 0
        for (let i = 0; i < products.length; i++) {
            if (products[i]["price"] > products[product_max]["price"]) {
                product_max = i
            }
        }
        products[product_max]["number"] = "cart" + j
        products.splice(product_max, 1)
        j++
    }

    return products;
}


let templateCode =
    `
<div>
    <div class="uk-card uk-card-default uk-card-body">
        <h3 class="uk-card-title">
            {{title}}
        </h3>
        <img src="{{img}}">
        <p>
            {{description}}
        </p>
        <footer class="uk-flex uk-flex-between">
            <div id="{{number}}" class="uk-text-large uk-text-bold">
                {{price}} голосов
            </div>
            <button class="uk-button uk-button-danger CART" data-price="{{price}}" data-title="{{title}}"><span uk-icon="heart"></span></button>
        </footer>
    </div>
</div>
`
let template = Handlebars.compile(templateCode)
let productsContainer = document.querySelector('#productsContainer');
console.log(productsContainer.value)
// Замени хранилища на свои, если хочешь
let PRODUCTS_URL = `https://studyprograms.informatics.ru/api/jsonstorage/?id=ef28732b07bcc12dea23819fb9762ef6`;
class Target {
    constructor(text) {
        this.text = text;
    }
    draw() {
        let li = document.createElement('li')
        li.innerHTML = this.text["comment"]
        comments.append(li)
    }
}


// ВЫВОД СПИСКА ТОВАРОВ
// создаем объект запроса для получения списка товаров
let xhrLoadProd = new XMLHttpRequest();
// настраиваем на отправку методом GET на url, возвращающий json-массив товаров
xhrLoadProd.open('GET', PRODUCTS_URL, true);
xhrLoadProd.send();

xhrLoadProd.addEventListener('readystatechange', function () {
    if (xhrLoadProd.readyState == 4 && xhrLoadProd.status == 200) {

        let products = JSON.parse(xhr.responseText);
        let sortedProducts = SortProduct(products);

        // Дальше код отрисовки карточек товаров
        container.innerHTML = '';
        for (let i = 0; i < sortedProducts.length; i++) {
            // container.innerHTML += ....
        }

        // let productsArr = JSON.parse(xhrLoadProd.responseText);
        // console.log(productsArr)
        buttons = document.querySelectorAll('.CART');
        for (let i = 0; i < 5; i++) {
            buttons[i].addEventListener("click", function () {
                console.log(productsArr[i])
                let product = {
                    title: buttons[i].dataset.title,
                    price: buttons[i].dataset.price
                }
                productsArr[i]["price"] += 1;
                buttons[i].dataset.price = productsArr[i]["price"];
                let obgect = document.querySelector('#cart' + String(i))
                obgect.innerHTML = String(productsArr[i]["price"]) + " голосов"
                localStorage.setItem("product", product)
                let xhrSender = new XMLHttpRequest();
                xhrSender.open('PUT', PRODUCTS_URL, true);
                xhrSender.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                let data = JSON.stringify(productsArr);
                xhrSender.send(data);
            })
        }
    }
});

let xhr3 = new XMLHttpRequest();
xhr3.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=e24cf4b8bac5a224dd898ef6662afb3b', true);
xhr3.send();
xhr3.addEventListener('readystatechange', function () {
    if (xhr3.readyState == 4 && xhr3.status == 200) {
        let ordersArr = JSON.parse(xhr3.responseText);
        for (let order of ordersArr) {
            let textcoment = new Target(order)
            textcoment.draw()
        }
    }
});


btn.addEventListener('click', function () {
    // получаем текущий список заявок
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=e24cf4b8bac5a224dd898ef6662afb3b', true);
    xhr.send();
    let newOrder = {
        comment: commaentText.value
    }
    xhr.addEventListener('readystatechange', function () {
        // если запрос завершен и завершен без ошибок, то...
        if (xhr.readyState == 4 && xhr.status == 200) {
            // преобразуем JSON-ответ в массив
            let ordersArr = JSON.parse(xhr.responseText);
            ordersArr.push(newOrder);
            let textcoment = new Target(newOrder)
            textcoment.draw()

            // формируем новый запрос. Здесь мы будем обновлять содержимое JSON на сервере
            let xhrSender = new XMLHttpRequest();
            // для обновления требуется метод PUT
            xhrSender.open('PUT', 'https://studyprograms.informatics.ru/api/jsonstorage/?id=e24cf4b8bac5a224dd898ef6662afb3b', true);

            // добавляем заголовок к запросу. Данный заголовок обязателен для отправки JSON PUT-запросом
            xhrSender.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            // отправляем запрос с обновленным массивом заявок на сервер, чтобы он его сохранил
            let data = JSON.stringify(ordersArr);
            xhrSender.send(data);
        }
    });
});
