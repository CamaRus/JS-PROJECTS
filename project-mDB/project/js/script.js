/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

/* const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const adv = document.querySelectorAll('.promo__adv img'),
    poster = document.querySelector('.promo__bg'),
    genre = poster.querySelector('.promo__genre'),
    movieList = document.querySelector('.promo__interactive-list');

adv.forEach(item => {
    item.remove();
});

genre.textContent = 'драма';

poster.style.backgroundImage = 'url("img/bg.jpg")';

movieList.innerHTML = "";

movieDB.movies.sort();

movieDB.movies.forEach((film, i) => {
    movieList.innerHTML += `<li class="promo__interactive-item">${i + 1} ${film}<div class="delete"></div></li>`
}); */


/* Задания на урок (33):

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

// Возьмите свой код из предыдущей практики

document.addEventListener('DOMContentLoaded', () => { //callback - функция
    //addEventListener - обработчик событий
    //DOMContentLoaded - когда дом-структура будет загружена, сработает код
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => {
        //submit - отслеживаем отправку формы
        //event - объект события
        event.preventDefault(); //отмена стандартного поведения браузера
        //при нажатии кнопки "отправить" страница не будет переагружаться

        let newFilm = addInput.value;
        const favorite = checkbox.checked; //если стоит галочка в поле "Сделать любимым"

        if (newFilm) { //если непустая строка

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`; //обрезаем строку
            }

            if (favorite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm); //добавляем фильм в массив
            sortArr(movieDB.movies); //сортируем

            createMovieList(movieDB.movies, movieList); //создаём новый список
        }

        addForm.reset(); //сброс формы

    });
    

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    deleteAdv(adv);
    
    
    
    const makeChanges = () => {
        genre.textContent = 'драма';
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };
    
    makeChanges();

    const sortArr = (arr) => { //arr - массив
        arr.sort;
    };


    movieDB.movies.sort();
    

    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `<li class="promo__interactive-item">${i + 1} ${film}<div class="delete"></div></li>`
        });

        //удаляем фильм из списка
        document.querySelectorAll('.delete').forEach((btn, i) => { //одно и то же событие на все селекторы с классом .delete, btn - каждая кнопка, i - номер элемента
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1); //удаляем элемент из массива

                createMovieList(films, parent); //рекурсия для перестроения после удаления

            })
        })

    }

    createMovieList(movieDB.movies, movieList);
});
