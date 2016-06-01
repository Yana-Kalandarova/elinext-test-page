'use strict'
$(document).ready(function () {
    $('.datepicker').datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('setDate', new Date());
        
    var isValidTable = $('tr td:nth-child(3) input');
    var isValidChair = $('tr td:nth-child(4) input');
    
    $(isValidTable).on('blur', validateData);
    $(isValidChair).on('blur', validateData);
    $(isValidTable).on('focus', function () {
        $(this).removeClass('invalidData');
    });
    $(isValidChair).on('focus', function () {
        $(this).removeClass('invalidData');
    });
    $(isValidTable).on('blur', getAverageTable);
    $(isValidChair).on('blur', getAverageChair);
    
    function validateData() {
        var value = $(this).val();
        var regexp = /^\d+$/;        
        if(!regexp.test(value) || value < 0 || value > 100) {
            $(this).addClass('invalidData').val(null);            
        };  
    };
    
    function getAverageTable() {
        var sum = 0;
        for (var i = 0; i < $(isValidTable).length-1; i++) {        
            var cur = $(isValidTable)[i];
            var value = $(cur).val();
            if ( value === '') {
                value = 0;
            } else {
                value = value*1
            }
            sum += value;
            var average = sum/($(isValidTable).length-1);
        }
        $('.averageTable').val(average);
    };
    
    function getAverageChair() {
        var sum = 0;
        for (var i = 0; i < $(isValidChair).length-1; i++) {
            var cur = $(isValidChair)[i];
            var value = $(cur).val();
            if ( value === '') {
                value = 0;
            } else {
                value = value*1
            }
            sum += value;
            var average = sum/($(isValidChair).length-1);
        }
        $('.averageChair').val(average);
    };
    getAverageTable();
    getAverageChair();
    function disabledInput() {
        var text;
        if ($(this).hasClass('use-treatment')) {
            text = $(this).parent().next().next().next('input[type=text]');
        } else if ($(this).hasClass('stop-treatment')) {
            text = $(this).parent().next('input[type=text]');
        };        
        if(!($(this).is(':checked'))) {
            $(text).prop('disabled', true);
        } else {
            $(text).prop('disabled', false);
        }
    };
    $('input[type=checkbox]').on('click', disabledInput);  
    $('.add-row').on('click', addRow);
    function addRow() {
        $('tr').last().before(
        `<tr>
            <td>
                <input type='text' class="form-control datepicker">
            </td>
            <td>
                <input type="text" class="form-control">
            </td>
            <td>
                <input type="text" class="form-control">
            </td>
            <td>
                <input type="text" class="form-control">
            </td>
            <td>
                <label><input type="checkbox">Pt. tolerated treatment well</label><br>
                <label><input type="checkbox" class="use-treatment">Pt. c/o after use of</label>
                <label><input type=radio name="treatment-method">Scoliosis Table</label>
                <label><input type=radio name="treatment-method">Chair</label>
                <input type="text" disabled>
                <label><input type="checkbox" class="stop-treatment">Stopped treatment prematurely due to</label>
                <input type="text" disabled>
            </td>
        </tr>`
        );
        var i = $('tr').length-2;
        $('tr').last().prev().find('input[type=text]').attr('id', 'datepicker'+i);
        $('#datepicker'+i).datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('setDate', new Date());
        isValidTable = $('tr td:nth-child(3) input');
        isValidChair = $('tr td:nth-child(4) input');
        var createdRow = $('tr').last().prev();
        var isCreatedTable = $(createdRow).find('td:nth-child(3) input');
        var isCreatedChair = $(createdRow).find('td:nth-child(4) input');
        $(isCreatedTable).on('blur', validateData);
        $(isCreatedChair).on('blur', validateData);
        $(isCreatedTable).on('focus', function () {
            $(this).removeClass('invalidData');
        });
        $(isCreatedChair).on('focus', function () {
            $(this).removeClass('invalidData');
        });
        $(isCreatedTable).on('blur', getAverageTable);
        $(isCreatedChair).on('blur', getAverageChair);
        $('input[type=checkbox]').on('click', disabledInput);  
    };
});