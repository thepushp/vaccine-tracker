
function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}


/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/

// autocomplete(document.getElementById("district"), countries);
var today = new Date();
var dd = today.getDate();

var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}

if (mm < 10) {
  mm = '0' + mm;
}
today = dd + '-' + mm + '-' + yyyy;

var realdata = [];
var stat_name = [];
var dist_name = [];
var center_name = [];
var realdist = [];
var realcenter = [];
var stid = [];
var did = [];
var age45 = -1;
var age18 = -1;
var mage = 1;
var vacc1 = "";
var vacc2 = "";
var vacc3 = "";
var mvacc = 1;
var fee1 = "";
var fee2 = "";
var mfee = 1;
var alarmx = document.getElementById("myAudio");

function select1() {
  var el1 = document.getElementById("filter_item1");
  el1.classList.toggle("aftertoggle");
  if (age18 == -1) {
    age18 = 18;
  }
  else {
    age18 = -1;
  }
  if (age18 == -1 && age45 == -1)
    mage = 1;
  else
    mage = 0;
    cardtmp = "";
  myvaccine();
  //  console.log(age18);
}
function select2() {
  var el2 = document.getElementById("filter_item2");
  el2.classList.toggle("aftertoggle");
  if (age45 == -1) {
    age45 = 45;
  }
  else {
    age45 = -1;
  }
  if (age18 == -1 && age45 == -1)
    mage = 1;
  else
    mage = 0;
    cardtmp = "";
    myvaccine();
  //  console.log(age45);
}
function select3() {
  var el1 = document.getElementById("filter_item3");
  el1.classList.toggle("aftertoggle");
  if (vacc1 == "") {
    vacc1 = "COVISHIELD";
  }
  else {
    vacc1 = "";
  }
  if (vacc1 == "" && vacc2 == "" && vacc3 == "")
    mvacc = 1;
  else
    mvacc = 0;
    cardtmp = "";
    myvaccine();
  //  console.log(vacc1);
}
function select4() {
  var el1 = document.getElementById("filter_item4");
  el1.classList.toggle("aftertoggle");
  if (vacc2 == "") {
    vacc2 = "COVAXIN";
  }
  else {
    vacc2 = "";
  }
  if (vacc1 == "" && vacc2 == "" && vacc3 == "")
    mvacc = 1;
  else
    mvacc = 0;
    cardtmp = "";
    myvaccine();
  //  console.log(vacc2);
}
function select5() {
  var el1 = document.getElementById("filter_item5");
  el1.classList.toggle("aftertoggle");
  if (vacc3 == "") {
    vacc3 = "SPUTNIK V";
  }
  else {
    vacc3 = "";
  }
  if (vacc1 == "" && vacc2 == "" && vacc3 == "")
    mvacc = 1;
  else
    mvacc = 0;
  //  console.log(vacc3);
  cardtmp = "";
  myvaccine();
}
function select6() {
  var el6 = document.getElementById("filter_item6");
  el6.classList.toggle("aftertoggle");
  if (fee1 == "") {
    fee1 = "Free";
  }
  else {
    fee1 = "";
  }
  if (fee1 == "" && fee2 == "")
    mfee = 1;
  else
    mfee = 0;
  //  console.log(fee1);
  cardtmp = "";
  myvaccine();
}
function select7() {
  var el7 = document.getElementById("filter_item7");
  el7.classList.toggle("aftertoggle");
  if (fee2 == "") {
    fee2 = "Paid";
  }
  else {
    fee2 = "";
  }
  if (fee1 == "" && fee2 == "")
    mfee = 1;
  else
    mfee = 0;
  //  console.log(fee2);
  cardtmp = "";
  myvaccine();
}



const statedata = async () => {
  const api = "https://cdn-api.co-vin.in/api/v2/admin/location/states";

  try {
    let data = await fetch(api);
    realdata = await data.json();
    // console.log(realdata)
  }
  catch (err) { }
  for (var i = 0; i < 37; i++) {
    stat_name.push(realdata.states[i].state_name);
    stid.push(realdata.states[i].state_id)
  }
  autocomplete(document.getElementById("state"), stat_name);

  // mydist();
  // console.log(stat_name)

};
statedata();

function mydist() {
  dist_name = [];
  did = [];
  var inputdata = document.getElementById("state");
  var tmp_id = -1;
  for (var i = 0; i < 37; i++)
    if (inputdata.value == stat_name[i]) {
      tmp_id = stid[i];
      break;
    }
  if (tmp_id == -1 && inputdata.value != "") {
    inputdata.value = "";
    alert("State Name is not valid")
  }
  else {
    realdist = [];

    const districtdata = async () => {
      const api2 = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${tmp_id}`;

      try {
        let dist = await fetch(api2);
        realdist = await dist.json();
        // console.log(realdist)
      }
      catch (err) { }
      for (var i = 0; i < realdist.districts.length; i++) {
        dist_name.push(realdist.districts[i].district_name);
        did.push(realdist.districts[i].district_id);
      }
      autocomplete(document.getElementById("district"), dist_name);
    }
    districtdata();

  }
  // console.log(inputdata);
}


function myvaccine() {
  // myStopFunction();
  var inputdist = document.getElementById("district");
  var tmp_did = -1;
  // alert(dist_name.length)
  for (var i = 0; i < dist_name.length; i++) {
    // alert(inputdist.value);
    if (inputdist.value == dist_name[i]) {
      tmp_did = did[i];
      break;
    }
  }
  if (tmp_did == -1 && inputdist.value != "") {
    inputdist.value = "";
    alert("District Name is not valid")
  }
  else {
    realcenter = [];

    const vaccinecenter = async () => {
      center_name = [];
      const dmy = document.getElementById("Vaccination_date").value;
      // alert(dmy)
      if (dmy != "") {
        today = dmy.substring(8, 10) + dmy.substring(4, 7) + '-' + dmy.substring(0, 4);
        // alert(today);
      }
      // console.log(today)
      const api3 = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${tmp_did}&date=${today}`;

      try {
        let dist = await fetch(api3);
        realcenter = await dist.json();
        // console.log(realcenter)
      }
      catch (err) { }
      for (var i = 0; i < realcenter.sessions.length; i++) {
        center_name.push(realcenter.sessions[i]);
        // console.log(center_name.length);
        // did.push(realcenter.sessions[i].district_id);
      }
      cardtmp = "";
      populate();
    }
    vaccinecenter();
    // setInterval(function(){alert("Hello")},3000);
    setInterval(vaccinecenter, 30000);
    // vaccinecenter();

    //to populate the cards

    // alert(center_name.length)
  }
  // console.log(inputdist);

  // document.getElementById("center").innerText=center_name[0].available_capacity_dose2;
}
function myStopFunction() {
  window.location.reload();
}


var cardtmp = "";


// console.log("hello hi byeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
function populate() {
  cardtmp = "";
  for (var i = 0; i < center_name.length; i++) {
    if (center_name[i].available_capacity > 0){
      if (((center_name[i].min_age_limit == age18 || center_name[i].min_age_limit == age45) || mage == 1)
        && ((center_name[i].vaccine == vacc1 || center_name[i].vaccine == vacc2 || center_name[i].vaccine == vacc3) || mvacc == 1)
        && ((center_name[i].fee_type == fee1 || center_name[i].fee_type == fee2) || mfee == 1)) {
        alarmx.play();
        // console.log(age18);
        cardtmp += `<div class="row" id="rowa">
                    <div class="card">
                  
                    <div class="card__side card__side--back">
                      <div class="card__cover">
                      <h4 class="card__heading">
                        <span class="card__heading-span">${center_name[i].name}</span>
                        <p class="">VACCINE AVAILABLE</p>
                      </h4>
                      </div>
                      <div class="card__details">
                      <ul>
                        <li>Date:${center_name[i].date}</li>
                        <li>available_capacity_dose1: ${center_name[i].available_capacity_dose1}</li>
                        <li>available_capacity_dose2: ${center_name[i].available_capacity_dose2}</li>
                        <li>min_age_limit: ${center_name[i].min_age_limit}</li>
                        <li>Vaccine: ${center_name[i].vaccine}</li>
                        <li>${center_name[i].fee_type}</li>
                        <li><b>Stay Home Stay Safe!</b></li>
                      </ul>
                      </div>
                    </div>
                  
                    <div class="card__side card__side--front">
                      <div class="card__theme">
                      <div class="card__theme-box">
                        <p class="card__subject">VACCINE AVAILABLE</p>
                        <p class="card__title">Hurry Up!</p>
                        <p>${center_name[i].name},${center_name[i].address},${center_name[i].block_name},${center_name[i].pincode}</p>
                      </div>
                      </div>
                    </div>
                  
                    </div>
                  </div>`;
      }
    }

  }
  if(cardtmp.length==0)
    alarmx.pause();

  let noteelm = document.getElementById("notes");
  if (noteelm.length != 0)
    noteelm.innerHTML = cardtmp;
  else {
    noteelm.innerHTML = `No notes found use "Add Note" section to add a note`;
  }

}
