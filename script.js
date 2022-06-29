var words;
var count = [];
var current_count = 0;
var true_count = 0;
var false_count = 0;
var char_control;
var wpm = 0;
var word_pool = ["work", "over", "do", "feet", "why", "their", "near", "being", "off", "place", "always"];

$(document).ready(function () {

    // Keyboard add/remove class
    $(".keyboard-row").addClass("d-flex justify-content-center flex-row");
    $(".mb-3.keyboard-row").children().addClass("p-2 flex-nonfill bg-silver border");
    $(".mb-3.keyboard-row").children().addClass("p-2 flex-nonfill bg-silver border");
    $(".keyboard-row.mb-05").children().addClass("p-2 flex-fill bg-white border");
    $(".bg-silver").removeClass("bg-white");
    $(".flex-grow-1").removeClass("bg-silver");
    $(".flex-grow-1").addClass("bg-white");
    

    text_pool = word_pool;
    $.each(word_pool, function (index, value) {
        if (index == 0) {
            value = value + " ";
        } else {
            value = " " + value + " ";
        }
        word_pool[index] = value;
    });

    $.each(text_pool, function (index, value) {
        $("#random-text").append("<span id = " + index + ">" + value + "</span>");
    });


    words = $("#random-text span");
    $.each(words, function (index, value) {
        $(value).attr("id", index);
        count.push(index);
    });

});

$("#target").keydown(function (e) {
    if (e.keyCode == 32) {

        if ($.trim($("#target").val()) === $.trim($(words[current_count]).text()) && char_control == true) {
            true_count++;
        } else {
            $(words[current_count]).css({ "color": "red" });
            false_count++;
        }
        current_count++;

        $("#user-text").append("<span>" + $("#target").val() + "</span>");

        $("#target").val(null);

        if (current_count == count.length) {
            $("#result-text").append("<li>Correct Count: <span style = 'color:green;font-weight:bold;'>" + true_count + "</span></li>");
            $("#result-text").append("<li>Wrong Count: <span style = 'color:red;font-weight:bold;'>" + false_count + "</span></li>");
            $("#result-text").append("<li>Keystroke: <span style = 'color:black;font-weight:bold;'>" + wpm + "</span></li>");

            $("#target").attr("type", "hidden");
            $("#other").css({ "display": "block" });
            $("#other-2").css({ "display": "block" });
        }
    }

});

$("#target").keyup(function (e) {
    $(".btn-clicked").removeClass("btn-clicked");
    wpm++;

    if ($(words[current_count]).text().includes($("#target").val()) && $("#target").val() != " " && $("#target").val() != "") {
        $(words[current_count]).css({ "color": "green" });
        char_control = true;
    }
    else if ($(words[current_count]).text().includes($("#target").val()) == false) {
        $(words[current_count]).css({ "color": "red" });
        char_control = false;
    } else {
        $(words[current_count]).css({ "color": "blue" });
    }

});

$("#target").bind("keypress keydown", function (e) {
    $('.keyboard-row > div').each(function (key, val) {
        if ($(this).attr('keycode') == e['originalEvent']['keyCode']) {
            $(this).addClass('btn-clicked');
        }
    })
});
