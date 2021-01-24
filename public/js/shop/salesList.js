
$('#mainTable').editableTableWidget().numericInputExample().find('td:first').focus();
$('#editable-datatable').editableTableWidget().numericInputExample().find('td:first').focus();
$(function () {
    $('#editable-datatable').DataTable();
});


function addServices(name, price) {

    document.getElementById('ex').value = 1;
    let len = document.getElementById('sLen').value;
    document.getElementById('sLen').value = parseInt(len) + 1;
    len = parseInt(len) + 1;
    document.getElementById('extra').innerHTML += ` <input type="hidden" name="serviceName"
                                    value="${name}">
                                <input type="hidden" id="${name}${len}" name="servicePrice"
                                    value=${price}>
                                <tr id=${len}>
                                    <td>${name}</td>
                                    
                                    <td class="font-500">$${price}</td>
                                    <td class="text-center">

                                        <div class="action-btn"> 
                                            <a onclick="deleteEmp('${len}','${name}${len}')"
                                            class="text-dark  ml-2"><i
                                            class="mdi mdi-delete font-20"></i></a>
                                        </div>

                                    </td>
                                </tr>`
    calculateTotal();
    // addTips()

}

function setOffer(value) {

    let arr = value.split(' ')
    document.getElementById('offerDiscount').innerHTML = arr[0];
    document.getElementById('token').value = arr[1];
    calculateTotal();
}

function calculateTotal() {
    let taskArray = new Array();
    $("input[name=servicePrice]").each(function () {
        taskArray.push($(this).val());
    });

    let total = 0
    for (i = 0; i < taskArray.length; i++) {
        total += parseInt(taskArray[i]);
    }

    document.getElementById('subTotal').innerHTML = total
    // let total = document.getElementById('total').innerHTML  ;
    let tips = document.getElementById('tipsAmount').value;
    let dis = document.getElementById('subTotalDiscount').value;
    let offer = document.getElementById('offerDiscount').innerHTML;

    if (dis == "") {
        dis = 0;
    }
    document.getElementById('total').innerHTML = total - parseFloat(dis) - parseFloat(offer) + parseFloat(tips)

    //addTips();
}

function deleteEmp(val, id) {
    //console.log("asdfasfd", val)
    document.getElementById(id).value = 0;
    document.getElementById(val).remove();
    calculateTotal();
}

function subTotalDiscountFun() {
    let sub = document.getElementById('subTotal').innerHTML;
    //console.log(sub)

    let subDiscount = document.getElementById('subTotalDiscount').value;
    if (subDiscount == '') {
        subDiscount = 0
    }
    if (sub == '') {
        sub = 0
    }
    // console.log(sub,subDiscount)
    document.getElementById('total').innerHTML = parseFloat(sub) - parseFloat(subDiscount)
    calculateTotal()
    //addTips()
}

function addTips() {
    let tipsPrecentage = document.getElementById('tipsAmountPercentage').value;
    let sub = document.getElementById('subTotal').innerHTML;
    let subDiscount = document.getElementById('subTotalDiscount').value;
    if (subDiscount == '') {
        subDiscount = 0
    }
    if (tipsPrecentage == '') {
        tipsPrecentage = 0
    }
    sub = parseFloat(sub) - parseFloat(subDiscount);
    // console.log("Sub: ",sub)
    let percetage = (sub * parseFloat(tipsPrecentage)) / 100

    document.getElementById('tipsAmount').value = percetage;
    calculateTotal();

}
