//Gloabl Varibale
localStorage.setItem("i", 0)
localStorage.setItem("j", 0)
localStorage.setItem("k", 0)
let checkboxHaircut = false;
let checkboxSalon = false;
let checkboxNailCutter = false;
let checkboxBeautySalon = false;
let mainCategoryDropDown = "";
let mon, closeMon, openMon;
let tue, closeTue, openTue;
let wed, closeWed, openWed;


function clearAll() {
  localStorage.setItem("i", 0)
  localStorage.setItem("j", 0)
  localStorage.setItem("k", 0)
}

function readFile(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var htmlPreview =
        '<img width="200" src="' + e.target.result + '" />' +
        '<p>' + input.files[0].name + '</p>';
      var wrapperZone = $(input).parent();
      var previewZone = $(input).parent().parent().find('.preview-zone');
      var boxZone = $(input).parent().parent().find('.preview-zone').find('.box').find('.box-body');

      wrapperZone.removeClass('dragover');
      previewZone.removeClass('hidden');
      boxZone.empty();
      boxZone.append(htmlPreview);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function reset(e) {
  e.wrap('<form>').closest('form').get(0).reset();
  e.unwrap();
}

$(".dropzone").change(function () {
  readFile(this);
});

$('.dropzone-wrapper').on('dragover', function (e) {
  e.preventDefault();
  e.stopPropagation();
  $(this).addClass('dragover');
});

$('.dropzone-wrapper').on('dragleave', function (e) {
  e.preventDefault();
  e.stopPropagation();
  $(this).removeClass('dragover');
});

$('.remove-preview').on('click', function () {
  var boxZone = $(this).parents('.preview-zone').find('.box-body');
  var previewZone = $(this).parents('.preview-zone');
  var dropzone = $(this).parents('.form-group').find('.dropzone');
  boxZone.empty();
  previewZone.addClass('hidden');
  reset(dropzone);
});


//Login Info Button Click
document.getElementById("loginInfobtn").onclick = function () {

  let ownerName = document.getElementById("ownerName").value;
  document.getElementById("ownerNamShow").innerHTML = "";
  document.getElementById("ownerNamShow").innerHTML = ownerName;
  document.getElementById("loginInfo").style.display = "none";
  document.getElementById("staffInfo").style.display = "block";
}

//add stuff save button click
function AddStaffMemberSave() {


  // get all data
  let staffName = document.getElementById("staffName").value;
  let staffJob = document.getElementById("staffJob").value;
  let staffPhone = document.getElementById("staffPhone").value;
  let staffEmail = document.getElementById("staffEmail").value;

  //clear all data
  document.getElementById("staffName").value = "";
  document.getElementById("staffJob").value = "";
  document.getElementById("staffPhone").value = "";
  document.getElementById("staffEmail").value = "";

  document.getElementById("staffMember").innerHTML += `<br><div class="border border-primary p-3"><label>Staff Name:</label> <input class="form-control" name=staffName` + localStorage.getItem("i") + ` value=${staffName}> 
  <label>Staff Position:</label> <input class="form-control" name=staffJob`+ localStorage.getItem("i") + ` value=${staffJob}>  
  <label>Staff Number:</label> <input class="form-control" name=staffPhone`+ localStorage.getItem("i") + ` value=${staffPhone}> 
  <label>Staff Email:</label><input class="form-control" name=staffEmail`+ localStorage.getItem("i") + ` value=${staffEmail}></div>`;

  localStorage.setItem("i", localStorage.getItem("i") + 1);
}

//Modal Title Save
function ModalTitleSave() {
  checkboxHaircut = document.getElementById("checkboxHaircut").checked;
  checkboxSalon = document.getElementById("checkboxSalon").checked
  checkboxNailCutter = document.getElementById("checkboxNailCutter").checked;
  checkboxBeautySalon = document.getElementById("checkboxBeautySalon").checked;
  mainCategoryDropDown = document.getElementById("mainCategoryDropDown").value;

}
//Set Day
function setDay() {

  mon = document.getElementById("mon").checked;
  //monday
  if (mon == true) {
    openMon = document.getElementById("openMon").value;
    closeMon = document.getElementById("closeMon").value;
  }
  //Tuesday
  if (tue == true) {
    openTue = document.getElementById("openTue").value;
    closeTue = document.getElementById("closeTue").value;
  }
  //Wednesday
  if (wed == true) {
    openWed = document.getElementById("openWed").value;
    closeWed = document.getElementById("closeWed").value;
  }
}

//show category
function showCat() {
  document.getElementById("shop-image-upload").style.display = "none";
  document.getElementById("service-price").style.display = "block";
  document.getElementById("finishDiv").style.display = "block";
  console.log(mainCategoryDropDown)
  document.getElementById("categoryNameShow").innerHTML = mainCategoryDropDown;
}
// add new category and time cost
function addNewCatandTime() {

  // get all data
  let serviceName = document.getElementById("serviceName").value;
  let hour = document.getElementById("hour").value;
  let min = document.getElementById("min").value;
  let priceType = document.getElementById("priceType").value;
  let price = document.getElementById("price").value;

  //clear all data
  document.getElementById("serviceName").value = "";
  document.getElementById("hour").value = "";
  document.getElementById("min").value = "";
  document.getElementById("priceType").value = "";
  document.getElementById("price").value = "";


  document.getElementById("categoryAdd").innerHTML += `<br> <div class="border border-secondary p-3"><h5>Service Name: </h5><input class="form-control" name=serviceName` + localStorage.getItem("j") + ` value=${serviceName}> 
                                                      <h5>Hours(H)</h5><input class="form-control" name=hour`+ localStorage.getItem("j") + ` value=${hour}>  
                                                      <h5>Minutes(min)</h5><input class="form-control" name=min`+ localStorage.getItem("j") + ` value=${min}> 
                                                      <h5>Price Type: </h5><input class="form-control" name=priceType`+ localStorage.getItem("j") + ` value=${priceType}>
                                                      <h5>Service Price($)</h5><input class="form-control" name=price`+ localStorage.getItem("j") + ` value=${price}></div> `;

  localStorage.setItem("j", localStorage.getItem("j") + 1);
}

function addNewCategory() {

  // get all data
  let addCategory = document.getElementById("addCategory").value;
  //clear all data
  document.getElementById("addCategory").value = "";

  document.getElementById("newCategoryAdd").innerHTML += `<br><input class="form-control bg-dark text-white" name=addCategory` + localStorage.getItem("k") + ` value=${addCategory}>`;
  localStorage.setItem("k", localStorage.getItem("k") + 1);
}

document.getElementById("staffInfobtn").onclick = function () {
  document.getElementById("staffInfo").style.display = "none";
  document.getElementById("shop-info").style.display = "block";
}
document.getElementById("shop-infobtn").onclick = function () {
  document.getElementById("shop-info").style.display = "none";
  document.getElementById("shop-image-upload").style.display = "block";
}





// add category

let addCategory = document.getElementById("addCategory").value;
document.getElementById("categoryAdd").innerHTML = `<div> <p>${addCategory}</p> </div>`




function timeAdd(dayId){
  document.getElementById(dayId+"NewSlot").innerHTML += `
  <div class="row"> 
  <div class="col-lg-3"></div> 
  <div class="col-lg-4 startTime">
  <select name="${dayId+1+'open'}" id="" class="form-control">
  <option value="10:00">10:00 AM</option>
  <option value="10:05">10:05 AM</option>
  <option value="10:10">10:10 AM</option>
  <option value="10:15">10:15 AM</option>
  <option value="10:20">10:20 AM</option>
</select>
</div> 
<div class="col-lg-4 endTime">
  <select name="${dayId+1+'close'}" id="" class="form-control">
  <option value="10:00">10:00 AM</option>
  <option value="10:05">10:05 AM</option>
  <option value="10:10">10:10 AM</option>
  <option value="10:15">10:15 AM</option>
  <option value="10:20">10:20 AM</option>
</select>
</div>

</div>
`
}

function closeDay(dayId){
    
  //console.log(dayId);
  if (!document.getElementById( dayId+"Checked").checked)
  {
   //hide 
    $("#"+dayId+"AddBtn").hide();
    $("#"+dayId+"EndTime").hide();
    $("#"+dayId+"StartTime").hide();
    $("#"+dayId+"NewSlot").hide();
   
    //show  
    $("#"+dayId+"Close").show();
  }
  else
  {
     //show
     $("#"+dayId+"AddBtn").show();
     $("#"+dayId+"EndTime").show();
     $("#"+dayId+"StartTime").show();
     $("#"+dayId+"NewSlot").show();
    
     //hide 
     $("#"+dayId+"Close").hide();
  }
}


function hiddenAdd() {
  //get all checkbox info
  sun = document.getElementById('sundayChecked').checked;
  mon = document.getElementById('mondayChecked').checked;
  tue = document.getElementById('tuesdayChecked').checked;
  wed = document.getElementById('wednesdayChecked').checked;
  thu = document.getElementById('thrusdayChecked').checked;
  fri = document.getElementById('fridayChecked').checked;
  sat = document.getElementById('saturdayChecked').checked;

  //set all hidden input value
  document.getElementById("sunChecked").value = sun;
  document.getElementById("monChecked").value = mon;
  document.getElementById("tueChecked").value = tue;
  document.getElementById("wedChecked").value = wed;
  document.getElementById("thuChecked").value = thu;
  document.getElementById("friChecked").value = fri;
  document.getElementById("satChecked").value = sat;
}



