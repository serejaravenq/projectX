$(document).ready(function () {
    $('#button').click(function () {
        createToDoItem()
    });

    $('input[name=task]').keypress(function(event) {
        if (event.keyCode == 13) createToDoItem()


    });

    $("body").on('change', '#todo > li > .checkbox', function() {
        var search = ($(this).closest("li").attr('id'));
        (this.checked) ? $(this).parent().attr('active', 'false') : $(this).parent().attr('active', 'true')

        for( var key in total) {
            if(key == search)total[key].active = $(this).closest('li').attr('active');
        }

        showItems(true)
    });

    $('.toogle').click(function() {
        $('.toogle').removeClass('change');
        $(this).addClass('change');
        showItems(true);
    });


    $("body").on('click', '.pages > a', function () {
        $('.pages a').removeClass('active');
        $(this).addClass('active');

         showItems(true)
    });

    $('#off').click(function() {
        for (var i = 0; i <total.length; i++) {
            total[i].active = 'true';
        }

        showItems(true)
    });

    $('#del').click(function() {
        for (var i = 0; i < total.length; i++) {
            if(total[i].active == 'false') {
                total.splice(i, 1);
                i--;
            }
        }

        showItems()
    });

     $("body").on('click', '#todo .close', function () {
         var search = $(this).closest("li");
         total.splice(search, 1);
        showItems()

     });

    // //click on checked or unchecked
    $('#on').click(function() {
        for(var i = 0; i < total.length; i++) {
            total[i].active = 'false';
        }

        showItems()
    });

    // //dblclick for edit


    /*$( "#todo > li" ).bind( "dblclick", function() {
        alert( "User clicked on 'foo.'" );

    });*/

    $("ul").on('dblclick','li > p', function() {
        var search = $(this);
        var oldText =  '';
        $('input.edit').each(function () {
            $(this).replaceWith("<p class='title'>" +$(this).val()+ "</p>")


        });
        $(this).replaceWith("<input class='edit' value=" + $(this).text() + ">");
        /*$( "li > p" ).each(function( index ) {
            console.log( index + ": " + $( this ).text() );
            console.log(search);
            if ($(this).text() == search.text()) {

            }
        });*/
       /* //console.log($('input.edit'));
        */
           // $('input.edit').replaceWith("<p class='title'>" + $(this).text() + "</p>");
            //$(this).replaceWith("<input class='edit' value=" + $(this).text() + ">");


        // );
       //
      //  oldText = currentText;
       // $('this').text(oldContent);
    });

    //
       /* $('p').removeClass('edit');
        $(this).addClass('edit');
       if($(this).hasClass('edit')) {

           // $('li').find("<input>").replaceWith('p');
       }
*/




           // $('li').find('<input>').replaceWith('p');





        //$('.edit > input').dblclick(function() {


       // })
       // $(this).off();



/*   $("ul").bind('dblclick', function() {
        alert('you clicked me!');
    });

// Method two:
    $("ul").delegate("ul > li", "dblclick", function(){

    });

        $('li').dblclick(editItem())*/
});

var total = [];
var count_items = 5;
var count_pages = 1;
var id = 0;

function editItem() {
    console.log('hello');
}

function  counter(temp) {
    var complete = 0;
    var uncomplete = 0;

    for (var i = 0; i < temp.length; i++) {
        if(temp[i].active == 'true') {
            uncomplete++
        } else {
            complete++
        }

    }

    $('body').find('.uncomplete > span').text(uncomplete);
    $('body').find('.complete > span').text(complete);

    return temp;
}

function createToDoItem() {
    var idevent = $('body').find('.change').attr('id');
    if (!$('input[name=task]').val().trim()) {
        alert('Введите значение');
        return false;
    }

    event.preventDefault();
    total.push({id:id, title: $("input[name=task]").val(), active: 'true' });
    id++;
    $('input[name=task]').val('');
    showItems(true)
}

function addPage(arrayLenght, activePage, last) {

    var listPage  = '';
    var myPages = $('.pages');

    count_pages =  Math.ceil(arrayLenght / count_items);

    if (activePage > count_pages || last) {
        activePage = count_pages;
    }

    for (var i = 1; i <= count_pages; i++) {
        var className = (activePage == i) ? 'active' : '';
        listPage += "<a href='#' id=" + i + " class='" + className + "'>" + i + "</a>";
    }

    myPages.html(listPage);

    return activePage;
}

function showItems(last) {         // var basket[] - local array , temp[] - filtered array
    var idevent = $('.toogle.change').attr('id') || 'all';
    var page = $('.pages > a.active').attr('id');
    var listitems = '';
    var temp = total;
    var startIdx;
    var endIdx;
    var slice = [];

    counter(temp)

    if(idevent == 'checked') {
        temp = total.filter(function(i) {
            return i.active == 'false';
        });
    } else if (idevent == 'unchecked') {
        temp = total.filter(function(i) {
            return i.active == 'true';
        });
    }

    page = addPage(temp.length, page, last);

    startIdx = count_items * (page-1);
    endIdx = startIdx + count_items;
    slice = temp.slice(startIdx, endIdx);

    for (var i = 0; i < slice.length; i++) {
        if (i == count_items) break;
        listitems += "<li id=" + slice[i].id + " class='list__item clearfix' active=" + slice[i].active + ">" + "<input type='checkbox'  class='checkbox' " + ((slice[i].active == 'false') ? " checked />" : '>') +
            "<a href='#' class='close' aria-hidden='true'>&times;</a>" +
            "<p class='title'>" + slice[i].title + "</p>" +
            "</li>";
    }

    $('#todo').html(listitems)

}
    // if(idevent == 'all') {
    //     addPage(temp, 'all')
    //     lastPage = (count_pages - 1);
    //     startIdx = count_items * lastPage;
    //     endIdx = startIdx + count_items;
    //
    // }
    //
    // if(idevent == 'checked') {
    //     temp = total.filter(function(i) {
    //         return i.active == 'false';
    //     });
    //
    //     addPage(temp, 'checked')page-1
    //     lastPage = (count_pages - 1);
    //     //page = $('.pages > a.active').attr('id');
    //     startIdx = count_items * lastPage;
    //     endIdx = startIdx + count_items;
    //
    //
    // } else if(idevent == 'unchecked') {
    //     temp = total.filter(function(i) {
    //         return i.active == 'true';
    //     });
    //     addPage(temp, 'unchecked')
    //     lastPage = (count_pages - 1);
    //     //page = $('.pages > a.active').attr('id');
    //     startIdx = count_items * lastPage;
    //     endIdx = startIdx + count_items;
    //
    // }

   // if(page > 0) {

     //   endIdx = startIdx + count_items;
    //}else {
     //   startIdx = count_items * lastPage;
   // }
   // startIdx = count_items * page;
     //
       //




    /*startIdx = liimit * currentPage
    endIdx = startIdx + limit
    objects = results.slice(startIdx, endIdx)*/

   /* /!* startIdx = cntitems * page;
     endIdx = startIdx + cntitems;*!/
    temp = total.slice(startIdx, endIdx);
    */



/*if (temp.length < 1) {
        listitems = '';
        $('#todo').html(listitems)
        return true;
    }*/



    //var count = 0;
    //var filter = $('.toogle.change').attr('id');
    //var tempArr = result;
    /*if (filter === 'checked') {
        tempArr = result.filter(function () {
        })
    } else if (filter === 'unchecked') {
        tempArr = result.filter(function () {
        })
    }*/
    //var page = $('.pages > a.active').attr('id');

    //var startIdx = cntitems * myid;
    //var endIdx = startIdx + cntitems;
    //basket = result.slice(startIdx, endIdx);
    //showItems(basket)

   // tempArr = tempArr.slice(startIdx, endIdx);


    //console.log(listPage);


    // tempArr


    /*if (filter == 'all') {




    } else if (filter == 'unchecked') {
        addPage(result, 'unchecked')
        for (var i = 0; i < result.length; i++) {
            if (count == cntitems) break;
            if (result[i].active == 'false') continue;
            listitems += "<li id=" + result[i].id + " class='list__item clearfix' active=" + result[i].active + ">" + "<input type='checkbox'  class='checkbox' >" +
                "<a href='#' class='close' aria-hidden='true'>&times;</a>" +
                "<p class='title'>" + result[i].title + "</p>" +
                "<a href='#' class='edit'>edit</a>" +
                "<input type='text' class='textfield'>" +
                "</li>";
            count++
        }
        //addPage(cntpage for unchecked)
        $('#todo').html(listitems)

    } else if (filter == 'checked') {
        addPage(result, 'checked');
        for (var i = 0; i < result.length; i++) {
            if (count == cntitems) break;
            if (result[i].active == 'true') continue;
            listitems += "<li id=" + result[i].id + " class='list__item clearfix' active=" + result[i].active + ">" + "<input type='checkbox'  class='checkbox' " + " checked />" +
                "<a href='#' class='close' aria-hidden='true'>&times;</a>" +
                "<p class='title'>" + result[i].title + "</p>" +
                "<a href='#' class='edit'>edit</a>" +
                "<input type='text' class='textfield'>" +
                "</li>";
            count++
        }
        //
        $('#todo').html(listitems)

    }*/





/*
$(document).ready(function () {
    // //variables for counter;
    //
    // click or keypress on button

     $('#button').click(function () {

         if(createToDoItem())
            counter()

            console.log(result);
     });

     $('input[name=task]').keypress(function(event) {

        if (event.keyCode == 13) {
            if(createToDoItem())
                counter()               //main counter
            console.log(result);
         }
     });

            // ?





    // $('#unchecked').click(function() {
    //     newContent(result,'unchecked')
    // });
    //
    // $('#all').click(function() {
    //     newContent(result,'all')
    // });


                                            // если время будет, поменяю на $(elem).click(nfe)


    // //show all list, only checked or unchecked.
    //

    //






});

var id = 0;
var result = [];
var filter = 'all';
var cntitems = 5;
var idpage = 0;
var cntpage = 0;
var lastpage = 0;
//var listPage = '';




function saveItem(result,Item, id) {
    var pos = 0;

    for (var i = 0; i < result.length; i++) {
        console.log(result[i]);
        if( result[i].id == id )  {
            pos = result.indexOf(result[i]);
        }
    }

        var obj = ({id: +Item.attr('id'), title: Item.find('.textfield').val(), active:Item.attr('active') });
        result[pos] = obj;
        //return result;
}
            //fix заного рисую линки страниц



function createToDoItem() {
    if (!$('input[name=task]').val().trim()) {
        alert('Введите значение');
        return false;
    }

    event.preventDefault();
    result.push({id:id, title: $("input[name=task]").val(), active: 'true' });
    cntpage = Math.ceil((result.length) / cntitems);  //length - 1
     //return listPage = 'string'
//console.log(listPage);
       //length - 1  totalobj / totalitems on page

    id++;
    $('input[name=task]').val('');
    addPage(cntpage);
    currentContent(cntitems)

    return true;

       /!* console.log(result);
    console.log(result[id]);
       $('#todo').append(
            "<li id=" + result[id].id + " class='list__item clearfix' active='true'>" +
            "<input type='checkbox' class='checkbox'>" +
            "<a href='#' class='close' aria-hidden='true'>&times;</a>" +
            "<p class='title'>" + result[id].title  + "</p>" +
            "<a href='#' class='edit'>edit</a>" +
            "<input type='text' class='textfield'>" +
            "</li>");
        id++;
        $('input[name=task]').val('');
        return true;*!/
}

function currentContent(cntitems) {
   // var listPage =
    //var Mypages = $('.pages');
    //console.log(listPage);
    var basket = [];
    var pos = cntitems;
    var mytodo = $('#todo');
    var listitems  = '';
    console.log(result);
    if(result.length <= cntitems) {
        pos = 0;

        basket = result.slice();
        console.log(basket);
    } else {
        basket = result.slice(-pos);
    }
    //console.log(pos);
   //console.log(result);

    console.log(basket);

     for (var i = 0; i < basket.length; i++) {
         listitems += "<li id=" + basket[i].id + " class='list__item clearfix' active=" + basket[i].active + ">" + "<input type='checkbox' " + "class='checkbox' " + ((basket[i].active == 'false') ? " checked />" : '>') +
             "<a href='#' class='close' aria-hidden='true'>&times;</a>" +
             "<p class='title'>" + basket[i].title + "</p>" +
             "<a href='#' class='edit'>edit</a>" +
             "<input type='text' class='textfield'>" +
             "</li>"
     }
        /!*var total = listitems + listPage;*!/
       // console.log(listitems + listPage);
        //Mypages.html(listPage);
       mytodo.html(listitems)
}
                    //fix
function showItems(basket) {
    $('#todo').html('');
    console.log(basket);
    for(var i = 0; i < basket.length; i++) {
        if (basket[i].active == 'false') {
            $('#todo').append("<li id=" + basket[i].id + " class='list__item clearfix' active=" + basket[i].active + ">" + "<input type='checkbox'  class='checkbox' checked />" +
                "<a href='#' class='close' aria-hidden='true'>&times;</a>" +
                "<p class='title'>" + basket[i].title + "</p>" +
                "<a href='#' class='edit'>edit</a>" +
                "<input type='text' class='textfield'>" +
                "</li>");
        } else {
            $('#todo').append("<li id=" + basket[i].id + " class='list__item clearfix' active=" + basket[i].active + ">" + "<input type='checkbox' class='checkbox'>" +
                "<a href='#' class='close' aria-hidden='true'>&times;</a>" +
                "<p class='title'>" + basket[i].title + "</p>" +
                "<a href='#' class='edit'>edit</a>" +
                "<input type='text' class='textfield'>" +
                "</li>");
        }

    }

    return $('todo');
}
                    //fix


    //currentContent(lastpage)
}*/
