var realpin = [];
var mdata = [];
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
  runpinfinder();
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
  runpinfinder();
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
  runpinfinder();
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
  runpinfinder();
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
  runpinfinder();
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
  runpinfinder();
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
  runpinfinder();
}




function dateformatter(days) {
  var today = "";
  // var days; // Days you want to subtract
  var date = new Date();
  var last = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
  var dd = last.getDate();
  if (dd < 10)
    dd = '0' + dd;
  var mm = last.getMonth() + 1;
  if (mm < 10)
    mm = '0' + mm;
  var yyyy = last.getFullYear();
  today = dd + '-' + mm + '-' + yyyy;
  return today;
}
function pincheck(tmpin) {
  var ph = /^\d{6}$/;
  if ((parseInt(tmpin).value.match(ph))) {
    return tmpin;
  }
  else {
    alert("incorrect pin!!!");
    return false;
  }
}

var tmpdate = '';
// alert(dmy)
function runpinfinder() {
  var pinvalue = document.getElementById("pin").value;
  const dmy = document.getElementById("Vaccination_pin").value;
  tmpdate = dateformatter(0);
  if (dmy != "") {
    tmpdate = dmy.substring(8, 10) + dmy.substring(4, 7) + '-' + dmy.substring(0, 4);
    // alert(today);
  }
  const pinresult = async () => {
    const api = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pinvalue}&date=${tmpdate}`;

    try {
      let data = await fetch(api);
      realpin = await data.json();
      console.log(realpin.centers[0].fee_type)
    }
    catch (err) { }
    // for (var i = 0; i < 37; i++) {
    //   stat_name.push(realpin.states[i].state_name);
    //   stid.push(realpin.states[i].state_id)
    // }
    console.log(realpin);
    populate();

  };
  pinresult();
  setInterval(pinresult,30000);
}
function myStopFunction() {
  window.location.reload();
}
var cardtmp = '';
function populate() {
  cardtmp = "";
  console.log("ho ja bhai",realpin.centers[0].sessions[0].available_capacity)
  for (var i = 0; i < realpin.centers.length; i++)
    for (var j = 0; j < realpin.centers[i].sessions.length; j++) {
      if (realpin.centers[i].sessions[j].available_capacity > 0) {
        console.log("hua bhai run");
        if (((realpin.centers[i].sessions[j].min_age_limit == age18 || realpin.centers[i].sessions[j].min_age_limit == age45) || mage == 1)
          && ((realpin.centers[i].sessions[j].vaccine == vacc1 || realpin.centers[i].sessions[j].vaccine == vacc2 || realpin.centers[i].sessions[j].vaccine == vacc3) || mvacc == 1)
          && ((realpin.centers[i].fee_type == fee1 || realpin.centers[i].fee_type == fee2) || mfee == 1)) {
          alarmx.play();
          // console.log(age18);
          cardtmp += `<div class="row" id="rowa">
                    <div class="card">
                  
                    <div class="card__side card__side--back">
                      <div class="card__cover">
                      <h4 class="card__heading">
                        <span class="card__heading-span">${realpin.centers[i].name}</span>
                        <p class="">VACCINE AVAILABLE</p>
                      </h4>
                      </div>
                      <div class="card__details">
                      <ul>
                        <li>Date:${realpin.centers[i].sessions[j].date}</li>
                        <li>available_capacity_dose1: ${realpin.centers[i].sessions[j].available_capacity_dose1}</li>
                        <li>available_capacity_dose2: ${realpin.centers[i].sessions[j].available_capacity_dose2}</li>
                        <li>min_age_limit: ${realpin.centers[i].sessions[j].min_age_limit}</li>
                        <li>Vaccine: ${realpin.centers[i].sessions[j].vaccine}</li>
                        <li>${realpin.centers[i].fee_type}</li>
                        <li>Stay Home Stay Safe!</li>
                      </ul>
                      </div>
                    </div>
                  
                    <div class="card__side card__side--front">
                      <div class="card__theme">
                      <div class="card__theme-box">
                        <p class="card__subject">VACCINE AVAILABLE</p>
                        <p class="card__title">Hurry Up!</p>
                        <p>${realpin.centers[i].name},${realpin.centers[i].address},${realpin.centers[i].block_name},${realpin.centers[i].pincode}</p>
                      </div>
                      </div>
                    </div>
                  
                    </div>
                  </div>`;
        }
      }

    }
  if (cardtmp.length == 0)
    alarmx.pause();

  let noteelm = document.getElementById("notespin");
  if (noteelm.length != 0)
    noteelm.innerHTML = cardtmp;
  else {
    noteelm.innerHTML = `No notes found use "Add Note" section to add a note`;
  }

}




















// var date = new Date();
// for (var i = 0; i < 7; i++) {
//   date.setDate(date.getDate() + i)
//   mdata.push(dateformatter(i));

//   // for (var j = 0; j < m; j++) {

//   // }
// }
// console.log(mdata);