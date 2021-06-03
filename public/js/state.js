function myfun() {
    var inputdata = document.getElementById("state").value;
    console.log(inputdata);
  }
  //const xx=JSON.parse("https://cdn-api.co-vin.in/api/v2/admin/location/states");
  var realdata = [];
  const getstate = async () => {
    const api = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
    var stat_name=[];
    try {
      let data = await fetch(api);
      realdata = await data.json();
      console.log(realdata.states[0].state_name)
    }
    catch (err) { }
    for (var i = 0; i < 37; i++)
      stat_name.push(realdata.states[i].state_name)
  };
  getstate();


  //console.log(realdata[0])

  $(function () {
    $('marquee').mouseover(function () {
      $(this).attr('scrollamount', 0);
    }).mouseout(function () {
      $(this).attr('scrollamount', 5);
    });
  });