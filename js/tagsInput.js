/**
 * Created by mobileteam on 8/7/17.
 * _aarifs
 */
(function ($) {
    /*
     * How to use
     * 1. Initial tagInput
     *    example :
     *    $('input[name=sr_attempts]').inputTags({
     *      setValue: ["1","2","2"], // for set
     *      getValue: true/false // default false
     *    })
     * */

    myArr = [];
    $.fn.inputTags = function (options) {
        this.defaults = {
            setValue: 'empty',
            getValue: '',
            changeMarkup: ''
        }
        options = $.extend(true, {}, this.defaults, options);
        var propName = $(this).prop('name');

        changeMarkup(propName)
        enterTag(propName)

        if (options.setValue) {
            var valValue = options.setValue;
            for (var i = 0; i < valValue.length; i++) {
                createArr(propName, valValue[i]);
            }
        } else {
            return this.defaults.setValue;
        }
        if (options.getValue === true) {
            getValue(propName)
        } else {
            return this.defaults.getValue;
        }

        return true;
    }

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    function enterTag(persadi) {
        $('.txtSearchProdAssign-' + persadi).keypress(function (e) {
            var key = e.which;
            if (key == 13)  // the enter key code
            {
                var valTag = $('.txtSearchProdAssign-' + persadi).val();
                if (valTag != '') {
                    var idTag = makeid();
                    myArr.push(valTag + '-' + idTag);

                    $('#apentest-' + persadi).append('<span class="input-group-btn" id="' + idTag + '">' +
                        '<button class="btn btn-content" type="button" name="' + idTag + '" value="' + valTag + '">' + valTag + '</button>' +
                        '</span>');

                    $('.txtSearchProdAssign-' + persadi).val('')
                    //press cancel tags

                    $('button[name="' + idTag + '"]').click(function () {
                        $('span#' + idTag + '').remove();
                        // Find and remove item from an array
                        myArr.splice(myArr.indexOf(valTag + '-' + idTag), 1);
                        setTimeout(function () {
                            getValue(persadi);
                        }, 100);
                    });

                    setTimeout(function () {
                        getValue(persadi);
                    }, 100);
                }
                return false;
            }
        });
    }

    function getValue(persadi) {
        var but = $('#apentest-' + persadi).find('button');
        var array1get = [];
        for (var i = 0; i < but.length; i++) {
            var butt = but[i];
            array1get.push(butt.value); // before the dot
        }
        $('#' + persadi).val(array1get)
    }

    function setValue(persadi) {
        if ((persadi)) {
            var myArr = [];
        }

        var array1 = [];
        var array2 = [];
        for (var i = 0; i < myArr.length; i++) {
            var split = myArr[i].split("-");  // just split once
            array1.push(split[0]); // before the dot
            array2.push(split[1]); // after the dot
        }
        $('#' + persadi).val(array1.toString());
        return array1;
    }

    function createArr(persadi, valNilai) {
        if (valNilai) {
            var nilaiVal = valNilai + '-' + makeid();
            myArr.push(nilaiVal);
            $('#apentest-' + persadi).append('<span class="input-group-btn" id="' + nilaiVal + '">' +
                '<button class="btn btn-content" type="button" name="' + nilaiVal + '" value="' + valNilai + '">' + valNilai + '</button>' +
                '</span>');
            $('button[name="' + nilaiVal + '"]').click(function () {
                $('span#' + nilaiVal + '').remove();
                myArr.splice(myArr.indexOf(nilaiVal), 1);
                setTimeout(function () {
                    getValue(persadi);
                }, 100);
            });
        }

        setTimeout(function () {
            getValue(persadi);
        }, 100);

        return false;
    }

    function automateDisable(persadi) {
        var points = $('#apentest-' + persadi).find('button').length;
        var attempts = parseInt($(this).val());
        if (points >= attempts || points === attempts) {
            $('.txtSearchProdAssign-' + persadi).attr('disabled', '');
            return true;
        } else {
            $('.txtSearchProdAssign-' + persadi).removeAttr('disabled');
            return false;
        }
    }

    function changeMarkup(persadi) {
        $('input[name=' + persadi + ']').parent().append('<br><div id="apentest-' + persadi + '" class="form-group" style="height:37px;overflow:auto;margin:0 auto;border:0px solid #d0d0d0;border-radius:3px;"></div>');
        var nameTag = $('input[name=' + persadi + ']');
        $('input[name=' + persadi + ']').parent().append('<input type="text" name="' + nameTag.attr('name') + '" id="' + nameTag.attr('name') + '" style="display: none;">');
        $('input[name=' + persadi + ']').attr('class', 'form-control txtSearchProdAssign-' + persadi);
        nameTag.removeAttr('name');
        nameTag.removeAttr('id');
    }

}(jQuery));

