/* The only difference between the JS in leaf and leaf-temp is the calculateKelvin function,
 * on takes arguments the other doesn't, forest also uses calculateKelvin, but it is the
 * same as that for leaf. Should have one kinds of standard way of doing it or way of overriding the function*/
    function calculateKelvin(elem, id) {
        var k = id.split("-");
        var kl = k[0] + "-kelvin";
        var result = parseFloat(elem) + 273.15;
        var kelvin = document.getElementById(kl);
        if (isNaN(result)) {
            kelvin.innerHTML = "";
        }
        else {
            kelvin.innerHTML = result;
        }
    }
    function calculateKelvin() {
      var result = parseFloat($('base-temp').value) + 273.15;
      if(isNaN(result)) {
        $('kelvin').innerHTML = "";
      } else {
        $('kelvin').innerHTML = result;
      } 
    }


    function calculateKelvin(elem, id) {
        var temperature = elem;
        var k = id.split("-");
        var kl = k[0] + "-kelvin";
        var result = parseFloat(elem) + 273.15;
        var kelvin = document.getElementById(kl);
        if(isNaN(result)) {
              kelvin.innerHTML = "";
        }
        else {
                 kelvin.innerHTML = result;
        }
    }


    
    
    
var stations = Array();
var years = Array();

function addYears(stationName, yearlist) {
  stations.push(stationName);
  years.push(yearlist);
}

function getStationIndex(stationName) {
    for(var idx = 0; idx < stations.length; idx++)
        if (stations[idx] == stationName)
            return idx;
    return -1;
}

function updateYears(e) {
  var baseID = e.src().id.split('-')[0];
  var sel = $(baseID + "-year");
  var stationName = e.src().value;

  var selectedYear = sel.value;
  replaceChildNodes(sel, null);
  var yrs = years[getStationIndex(stationName)];
  for(var i=0; i<yrs.length; i++) {
    var year = yrs[i];
    var options = {'value':year};
    if(year == selectedYear) {
      options['selected'] = '';
   }
    appendChildNodes(sel, OPTION(options, year));
  }
}

function initYearHelper() {
  forEach(getElementsByTagAndClassName("select", "fieldstation-select"), function(elem) {
    connect(elem, "onchange", updateYears);
    var scid = elem.id.split('-')[0];
    signal(elem, 'onchange', {'source':elem, 'type':'change'});
  });
}

function toggle(e) {
  var elem = e.src();
  var parent = getFirstParentByTagAndClassName(elem, "div", "togglecontainer");
  var sibs = getElementsByTagAndClassName("*", "togglechild", parent);
  if(hasElementClass(elem, "toggle-open")) {
    removeElementClass(elem, "toggle-open");
    addElementClass(elem, "toggle-closed");
    forEach(sibs, function(sib) {
            hideElement(sib);
    });
  }
  else {
    removeElementClass(elem, "toggle-closed");
    addElementClass(elem, "toggle-open");
    forEach(sibs, function(sib) {
      showElement(sib);
    });
  }
}

function submitForm() {
    if (confirm('Navigating to the leaf level may cause you to lose scenario data. Do you want to continue?')) {
        $('scenario1-species').value = getSpeciesList().join();
        $('scenario1-form').submit();
        return true;
    }
    return false;
}
/* Replacing with Bootstrap so this is taken care of automatically and other people update/maintain it */
/*
function initNav() {
  connect("tab-leaf", "onclick", submitForm);
  forEach(getElementsByTagAndClassName("div", "toggler"), function(elem) {
          connect(elem, "onclick", toggle);
  });
}
*/


