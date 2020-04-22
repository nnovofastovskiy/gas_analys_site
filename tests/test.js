window.onload = function (){
    // let tags = document.querySelectorAll(".tag");
    let search = document.querySelector(".search");
    let popup = document.querySelector(".popup");
  
    search.addEventListener('focus', popup_display);
    search.addEventListener('blur', popup_none);
    function popup_display() {
        popup.classList.add("display");
    }
  
    function popup_none() {
        popup.classList.remove("display");
    }
  
    let tags = document.querySelectorAll(".tag");
    for (tag of tags){
        tag.addEventListener('click', tag_input);
    }

    // .forEach(function (item, i ,arr){
    //     item.addEventListener('click', tag_input);
    // });
  
    function tag_input() {
      search.value += "#" + this.innerHTML + " ";
      // this.classList.add("tag_disable");
      // this.classList.remove("tag");
      // this.removeEventListener('click', tag_input);
    }
  
  
    //-------------------------- news creator-------------------------------------
    // edit_panel
    let edit_panel = document.querySelector(".edit_panel");
    let edit_panel__move = document.querySelector(".edit_panel__move");
  
    let edit_panel_x = 0,   // положение панели редактирования по Х
    edit_panel_y = 0,       // положение панели редактирования по У
    edit_panel_w = 0,       // ширина панели редактирования в рх
    move_start_x = 0,       // координата начала перемещения по Х
    move_start_y = 0,       // координата начала перемещения по У
    movable = false;        // флаг перемещения
  
    edit_panel__move.addEventListener('mousedown', movestart);  // по нажатию левой кнопки начало перемещения
    edit_panel__move.addEventListener('mouseup', moveend);      // по отпусканию левой кнопки конец перечещения
    window.addEventListener('mousemove', move);                 // перемещение мыши в окне
  
    edit_panel_x = edit_panel.getBoundingClientRect().left;     // чтение коорлинаты панели редактирования по Х
    edit_panel_w = edit_panel.getBoundingClientRect().width;    // чтение координаты панели редактирования по У
  
    if (edit_panel_x < edit_panel_w + 10)    // если координата по Х меньше ширины панели
        edit_panel.style.left = "0px";  // то не двигать панель
    else                                                            // иначе
        edit_panel.style.left = edit_panel_x - edit_panel_w - 10 +"px";  // сдвинуть панель влево на ширину панели
  
    function movestart(){
      movable = true;               // установка флага перемещения панели
      move_start_x = event.clientX; // запомнить координату начала перемещения по Х
      move_start_y = event.clientY; // запомнить координату начала перемещения по У
      edit_panel_x = edit_panel.getBoundingClientRect().left;   // запомнить исходное положение панели редактирования по Х
      edit_panel_y = edit_panel.getBoundingClientRect().top;    // запомнить исходное положение панели редактирования по У
    }
  
    function moveend(){
      movable = false;  // сброс флага перемещения панели
    }
  
    function move (){
      if (movable) {    // если флаг перемещения установлен
        edit_panel.style.left = (edit_panel_x - (move_start_x - event.clientX)) + "px"; // сдвинуть панель редактирования по Х
        edit_panel.style.top = (edit_panel_y - (move_start_y - event.clientY)) + "px";  // сдвинуть панель редактирования по У
      }
    }



    // news fields
    let news_field = document.querySelector(".news_field");   // поле с новостью
    document.querySelectorAll(".edit_panel__button").forEach(function (item, i ,arr){   // для всех кнопок в панели редактирования
        item.addEventListener('click', add_block);                                      // по клику выполнять add_block
    });

    function add_block(){
        let focused_item = document.querySelector(".news__item:focus");     // то получить элемент, на котором стоит фокус
        if (this.name == "delete_block"){                                       // если нажата "удалить блок"
            if (focused_item == null){              // если нет блока с фокусом
                alert("Выбери блок для удаления")   // предупреждение
            }
            else {                      // иначе
                focused_item.remove();  // удалить блок с фокусом
                let old_div = document.querySelector(".news__div"); // получить скрытый блок для блока с фокусом
                if (old_div != null){   // если он есть
                    if (old_div.previousElementSibling != null) // если есть предыдущий блок
                        old_div.previousElementSibling.focus(); // то уставновить на него фокус
                    old_div.remove();   // то удалить его
                }
            }
        }
        else if (this.name == "up_block"){
            if (focused_item == null)
                alert("Блок не выбран");
            else {
                let parent_elem = focused_item.parentElement;
                let prev_elem = focused_item.previousElementSibling;
                if (prev_elem != null){
                    parent_elem.insertBefore(focused_item, prev_elem);
                }
                focused_item.focus();
                // console.log(prev_elem);
            }
        }
        else if (this.name == "down_block"){
            if (focused_item == null)
                alert("Блок не выбран");
            else {
                let parent_elem = focused_item.parentElement;
                let next_elem = focused_item.nextElementSibling.nextElementSibling;
                parent_elem.insertBefore(focused_item, next_elem);
                focused_item.focus();
                // console.log(focused_item);
            }
        }
        else if (this.name == "video"){
            let new_iframe = document.createElement("iframe");
            // new_iframe.src = 
        }
        else {                                                      // если нажата одна из кнопок добавления блока
            let new_textarea = document.createElement('textarea');  // то создать новый блок textarea
            new_textarea.classList = "news__item news__" + this.name;   // с классом взятым из имени кнопки (h3, h4, p)
            // new_textarea.innerText = "Блок " + this.name;               // с текстом взятым из имени кнопки (h3, h4, p)
            if (this.name == "h3")
                new_textarea.placeholder = "Заголовок";
            else if (this.name == "h4")
                new_textarea.placeholder = "Подзаголовок";
            else if (this.name == "p")
                new_textarea.placeholder = "Парграф";
            news_field.append(new_textarea);                            // вставить новый блок textarea в поле новости
            new_textarea.addEventListener('focus', new_div);            // добавить прослушку на фокус нового блока textarea
            new_textarea.addEventListener('input', write);              // добавить прослушку на ввод текста в новый блок textarea
            new_textarea.focus();
        }
    }

    function new_div(){
        let old_div = document.querySelector(".news__div");             // получить старый скрытый блок
        if (old_div != null){   // если он получен
            old_div.remove();   // то удалить его
        }
        // console.log(this.classList[this.classList.length - 1]);
        let main_class = this.classList[this.classList.length - 1]; // получить класс для нового скрытого блока (последний в списке классов блока textarea с фокусом)
        let new_div = document.createElement('div');    // создать новый скрытый блок
        new_div.classList = "news__div " + main_class;  // с собственным классом и таким же классом как у teaxtarea с фокусом
        new_div.innerText = this.value; // новому скрытому блоку присвоить значение текста teaxtarea с фокусом
        news_field.append(new_div);     // вставить новый скрытый блок в поле новости
    }
    

    function write(){   // при вводе в textarea
        let news_div = document.querySelector(".news__div");    // получить скрытый блок
        let value = this.value; // получить текст из textarea
        let new_value = "";     // новая строка для записи
        //------- фильтрация от нескольких пробелов подряд -------//
        for (let i in value){
            if (new_value.endsWith(" ") &&  value[i] == " "){ // если новая строка заканчивается на пробел и следующий символ тоже пробел,
            }                                                 // то ничего не делать
            else                        // иначе
                new_value += value[i];  // добавить следующий символ в новую строку
        }

        this.value = new_value; // переписать текст в textarea
        if ((this.value.endsWith("\n")) | (this.value.endsWith("\n "))) // если нажат enter или enter и пробел 
            news_div.innerText = new_value + "\n";  // то в конец строки добавить \n (чтобы не было пустой строки)
        else                                // иначе
            news_div.innerText = new_value; // вставить новый текст в скрытый блок
        
        let div_height = news_div.getBoundingClientRect().height;   // получить высоту скрытого блока
        // console.log(div_height);
        if (div_height > 0){                        // если высота больше 0
            this.style.height = div_height + "px";  // то присвоить такую же высоту для textarea
        }
        else {                          // иначе
            this.style.height = null;   // сбросить стиль высоты для textarea
        }
    }
  
    
    
  } //onload