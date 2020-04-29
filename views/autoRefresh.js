

function sortTable(table_id, sortColumn){
    var tableData = document.getElementById(table_id).getElementsByTagName('tbody').item(0);
    var rowData = tableData.getElementsByTagName('tr');            
    for(var i = 0; i < rowData.length - 1; i++){
        for(var j = 0; j < rowData.length - (i + 1); j++){
            if(Number(rowData.item(j).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, "")) < Number(rowData.item(j+1).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, ""))){
                tableData.insertBefore(rowData.item(j+1),rowData.item(j));
            }
        }
    }
}
function loadJSON(path, callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', `serve?file=${path}`, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function saevaler(){
    iziToast.show({
        theme: 'light',
        icon: 'icon-person',
        title: 'Saved',
        message: 'Your timeouts have been saved.',
        position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
        progressBarColor: '#1aae6f',
       
        onOpening: function(instance, toast){
            console.info('callback abriu!');
        },
        onClosing: function(instance, toast, closedBy){
            console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
        }
    });
 }
 function proxalert(){
     ShowAddProx();
    iziToast.show({
        theme: 'light',
        icon: 'icon-person',
        title: 'Saved',
        message: 'Your proxies have been saved.',
        position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
        progressBarColor: '#1aae6f',

        onOpening: function(instance, toast){
            console.info('callback abriu!');
        },
        onClosing: function(instance, toast, closedBy){
            console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
        }
    });
 }
 function loadJSONh(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'serve?file=helper.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function ShowAddTask(){
     if(shown == false)
     {
        document.getElementById("overlay2").setAttribute("style", "max-width: 300px;");
        shown = true;
     }
     else if(shown == true)
     {
        document.getElementsByName("tasksize")[0].innerText = '';
        document.getElementsByName("category")[0].innerText = '';
        document.getElementsByName("keywords")[0].innerText = '';
        document.getElementsByName("profile")[0].innerText = '';
        document.getElementsByName('pooky')[0].checked = false;
        document.getElementsByName('captcha')[0].checked = false;
        document.getElementsByName('taskam')[0].disabled = false;
        document.getElementById('taskadd').innerText = `Add Tasks`;
        document.getElementById('maint1').setAttribute('action', '/signup')
        document.getElementById("overlay2").setAttribute("style", "position: absolute; left: -9999px;")
        shown = false;
     }

    

 }
 function loadTXT(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'proxies.txt', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function loadTXT3(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'delay.txt', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 function loadTXT4(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'restock.txt', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 var shown = false;
 function TaskEdit(id){
loadJSON(`tasks/task${id}.json`, function(response){
    shown = true;
    var resobj = JSON.parse(response);
    document.getElementsByName("id")[0].value = id;
    document.getElementsByName("tasksize")[0].value = resobj.size;
    document.getElementsByName("category")[0].value = resobj.category;
    document.getElementsByName("keywords")[0].value = resobj.keywords;
    document.getElementsByName("profile")[0].value = resobj.profile;
    document.getElementById('taskadd').innerText = `Edit Task ${id}`;
    if(resobj.pooky){
        document.getElementsByName('pooky')[0].selectedIndex = 1;
    }else{
        document.getElementsByName('pooky')[0].selectedIndex = 0;
    }
    if(resobj.captcha){
        document.getElementsByName('captcha')[0].selectedIndex = 1;
    }else{
        document.getElementsByName('captcha')[0].selectedIndex = 0;
    }  
    document.getElementsByName('taskam')[0].disabled = true;
    document.getElementById('maint1').setAttribute('action', '/edittask')
    document.getElementById("overlay2").setAttribute("style", "max-width: 300px;");
})
    
}
function Refresh(){


}

 function ShowAddProf(){
    if(shown == false)
    {
       document.getElementById("overlay4").setAttribute("style", "max-width: 300px;");
       shown = true;
    }
    else if(shown == true)
    {
       document.getElementById("overlay4").setAttribute("style", "position: absolute; left: -9999px;")
       shown = false;
    }
    
}
 function ShowAddProx(){
    if(shown == false)
    {
        loadTXT(function(response){
            console.log(response);
            document.getElementById('proxbox').innerHTML = response;
        })
       document.getElementById("overlay3").setAttribute("style", "max-width: 300px;");
       shown = true;
    }
    else if(shown == true)
    {
       document.getElementById("overlay3").setAttribute("style", "position: absolute; left: -9999px;")
       shown = false;
    }
    
}

 function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

var newbutton = [];
var oldbtn = [];
function openForm() {
    document.getElementById("maint").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("maint").style.display = "none";
  }
    loadJSON('tasks.json', function( response) {
        loadTXT3(function(response){
            document.querySelector('#chkoutdly').value = response;
        })
        loadTXT4(function(response){
            document.querySelector('#rstkdly').value = response;
        })

        

    // Parse JSON string into object
      var actual = JSON.parse(response);
      for(var ix = 0; ix < actual.length; ix++) {

        if(actual[ix])
        {
            
            loadJSON(`tasks/task${actual[ix].sid}.json`, function( response){
                
                var actual_JSON = JSON.parse(response);
                
                oldbtn.push({id: actual_JSON.id, status: actual_JSON.status});
                var table = document.getElementById("tasktab");
                table.className ='white-text';
                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell7 = row.insertCell(4);
                //var cell8 = row.insertCell(6);
                var cell6 = row.insertCell(5);
    
                cell1.innerHTML = actual_JSON.id;
                cell2.innerHTML = actual_JSON.profile;
                cell3.innerHTML = actual_JSON.size;
                cell4.innerHTML = actual_JSON.keywords;
                cell7.innerHTML = actual_JSON.status;
                //cell8.innerHTML = actual_JSON.browser;
                cell7.setAttribute('id', "task" + actual_JSON.id)
                    var shit = document.createElement("div");
                    shit.setAttribute('class', 'd-flex align-items-center')
                    shit.setAttribute('style', 'float:left;')
                    var f = document.createElement("form");
                    f.setAttribute('method',"post");
                    f.setAttribute('action',"/startsel");
                    f.setAttribute('style', "float: left; margin: 0px;")
                    //shit.setAttribute('id', "taskbtnst" + actual_JSON.id);
                    var i = document.createElement("input"); //input element, text
                    i.setAttribute('type',"hidden");
                    i.setAttribute('name',"id");
                    i.setAttribute('value', actual_JSON.id)
                    var s = document.createElement("button"); //input element, Submit button
                    s.className = 'btn btn-primary btn-sm';
                    s.setAttribute('type', 'submit');
                    s.setAttribute('style', 'margin: 0px;margin-right: 5px; align: center;');
                    s.setAttribute('id', "taskbtnst" + actual_JSON.id)
                    s.innerHTML = '<i class="fa fa-play-circle" aria-hidden="true"></i>'
                    f.appendChild(i);
                    f.appendChild(s);
                    shit.appendChild(f);
                    cell6.appendChild(shit);
                    var sss = document.createElement("button"); //input element, Submit button
                    sss.className = 'btn btn-warning btn-sm btn-sm';
                    sss.setAttribute('style', 'margin-right: 5px; float:left;');
                    sss.setAttribute('id', "taskbtnedit" + actual_JSON.id)
                    sss.setAttribute('onclick', `TaskEdit(${actual_JSON.id})`);
                    sss.innerHTML = '<i class="fa fa-pencil-square" aria-hidden="true"></i>';
                    cell6.appendChild(sss);
                    if(actual_JSON.status != 'item not found, waiting 3 seconds' && actual_JSON.status != 'searching' && actual_JSON.status != 'grabbing items' && actual_JSON.status != 'grabbed items' && actual_JSON.status != 'submitted order' && actual_JSON.status != 'checkout error, check discord' && actual_JSON.status != 'sent to browser' && actual_JSON.status != 'captcha error, complete in browser')
                    {
                        var shit = document.createElement("div");
                        shit.setAttribute('class', 'd-flex align-items-center')
                        shit.setAttribute('style', 'float:left;')
                    var ff = document.createElement("form");
                    ff.setAttribute('method',"post");
                    ff.setAttribute('action',"/delete");
                    shit.setAttribute('id', "taskbtndel" + actual_JSON.id)
                    var ii = document.createElement("input"); //input element, text
                    ii.setAttribute('type',"hidden");
                    ii.setAttribute('name',"id");
                    ii.setAttribute('value', actual_JSON.id);
                    var ss = document.createElement("button"); //input element, Submit button
                    ss.className = 'btn btn-danger btn-sm btn-sm';
                    ss.setAttribute('type', 'submit');
                    ss.setAttribute('style', 'margin: 0px;');
                    ss.setAttribute('id', "taskbtndel" + actual_JSON.id)
                    ss.innerHTML = '<i class="fa fa-minus-square" aria-hidden="true"></i>'
                    ff.appendChild(ii);
                    ff.appendChild(ss);
                    shit.appendChild(ff);
                    cell6.appendChild(shit);
                    }
                    else
                    {
                        var shit = document.createElement("div");
                    shit.setAttribute('class', 'd-flex align-items-center')
                    shit.setAttribute('style', 'float:left;')
                        var ff = document.createElement("form");
                        ff.setAttribute('method',"post");
                        //shit.setAttribute('id', "taskbtnstop" + actual_JSON.id)
                        ff.setAttribute('action',"/stopsel");
                        
                        var ii = document.createElement("input"); //input element, text
                        ii.setAttribute('type',"hidden");
                        ii.setAttribute('name',"id");
                        ii.setAttribute('value', actual_JSON.id);
                        var iii = document.createElement("input"); //input element, text
                        iii.setAttribute('type',"hidden");
                        iii.setAttribute('name',"status");
                        iii.setAttribute('value', 'Stopped');
                        var ss = document.createElement("button"); //input element, Submit button
                        ss.className = 'btn btn-danger btn-sm btn-sm';
                        ss.setAttribute('type', 'submit');
                        ss.setAttribute('id', "taskbtnstop" + actual_JSON.id)
                        ss.setAttribute('style', 'margin: 0px;');
                        ss.innerHTML = '<i class="ni ni-button-pause"></i>'
                        ff.appendChild(ii);
                        ff.appendChild(iii);
                        ff.appendChild(ss);
                        shit.appendChild(ff);
                        cell6.appendChild(shit);
                    }
            });

        }
    

    }
    })
   loadJSONh(function(response) {
    // Parse JSON string into object
      var actual_JSON = JSON.parse(response);
      for(var ix = 0; ix < actual_JSON.profiles.length; ix++) {

        if(actual_JSON.profiles[ix] && document.getElementById("proftab"))
        {

            var table = document.getElementById("proftab");
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);

            cell1.innerHTML = actual_JSON.profiles[ix].profname;
            cell2.innerHTML = actual_JSON.profiles[ix].fname + " "+ actual_JSON.profiles[ix].lname;
            cell3.innerHTML = actual_JSON.profiles[ix].addr1 + "," + actual_JSON.profiles[ix].addr2;
            cell4.innerHTML = actual_JSON.profiles[ix].email;
            cell5.innerHTML = actual_JSON.profiles[ix].ccnum[15] + actual_JSON.profiles[ix].ccnum[16]+ actual_JSON.profiles[ix].ccnum[17]+ actual_JSON.profiles[ix].ccnum[18];
            var shit = document.createElement("div");
            shit.setAttribute('class', 'd-flex align-items-center')
        var ff = document.createElement("form");
        ff.setAttribute('method',"post");
        shit.setAttribute('id',"taskbtndel" + actual_JSON.id);
        ff.setAttribute('action',"/deleteprof");
        var ii = document.createElement("input"); //input element, text
        ii.setAttribute('type',"hidden");
        ii.setAttribute('name',"namer");
        ii.setAttribute('value', actual_JSON.profiles[ix].profname);
        var ss = document.createElement("button"); //input element, Submit button
        ss.className = 'btn btn-danger btn-sm';
        ss.setAttribute('type', 'submit');
        ss.setAttribute('id', "taskbtndel" + actual_JSON.id)
        ss.innerHTML = '<i class="fa fa-minus-square" aria-hidden="true"></i>'
        ff.appendChild(ii);
        ff.appendChild(ss);
        shit.appendChild(ff);
        cell6.appendChild(shit);
            //cell6.innerHTML = actual_JSON.profiles[ix].profname;
            //cell8.innerHTML = actual_JSON.browser;
        }
    }
        // pass the id and the <td> place you want to sort by (td counts from 0)
        sortTable('tete', 0);

   })
var initbtn = true;
var inist = true;
var round = 0;
 var mainloop = setInterval(function(){
    sortTable('tete', 0);
    loadJSON('tasks.json', function( response) {
        // Parse JSON string into object
          var actual = JSON.parse(response);

          for(var ix = 0; ix < actual.length; ix++) {
            
            if(actual[ix])
            {
                loadJSON(`tasks/task${actual[ix].sid}.json`, function( response){     
                    var actual_JSON = JSON.parse(response);
           
                    if(document.getElementById('task'+actual_JSON.id))
                {
                        for(var xxc = 0; xxc < oldbtn.length; xxc++)
                        {
                            if((oldbtn[xxc].id == actual_JSON.id) || inist == true)
                            {
                                if((oldbtn[xxc].status != actual_JSON.status) || inist == true)
                                {
                                    oldbtn[xxc].status = actual_JSON.status;
                                    var cellz = document.getElementById("task" + actual_JSON.id).parentNode.cells[5];

                                    if(document.getElementById("taskbtndel" + actual_JSON.id))
                                    {
                                        removeElement("taskbtndel" + actual_JSON.id);
                                    }
                                    if(document.getElementById("taskbtnstop" + actual_JSON.id))
                                    {
                                        removeElement("taskbtnstop" + actual_JSON.id);
                                    }
                                    if(actual_JSON.status.toLowerCase() == "stopped")
                                    {
                                        var shit = document.createElement("div");
                                        shit.setAttribute('class', 'd-flex align-items-center')
                                    var ff = document.createElement("form");
                                    ff.setAttribute('method',"post");
                                    shit.setAttribute('id',"taskbtndel" + actual_JSON.id);
                                    ff.setAttribute('action',"/delete");
                                    var ii = document.createElement("input"); //input element, text
                                    ii.setAttribute('type',"hidden");
                                    ii.setAttribute('name',"id");
                                    ii.setAttribute('value', actual_JSON.id);
                                    var ss = document.createElement("button"); //input element, Submit button
                                    ss.className = 'btn btn-danger btn-sm';
                                    ss.setAttribute('type', 'submit');
                                    ss.setAttribute('id', "taskbtndel" + actual_JSON.id)
                                    ss.innerHTML = '<i class="fa fa-minus-square" aria-hidden="true"></i>'
                                    ff.appendChild(ii);
                                    ff.appendChild(ss);
                                    shit.appendChild(ff);
                                    cellz.appendChild(shit);
                                    }
                                    else
                                    {
                                        var shit = document.createElement("div");
                                        shit.setAttribute('class', 'd-flex align-items-center')
                                        var ff = document.createElement("form");
                                        ff.setAttribute('method',"post");
                                        ff.setAttribute('action',"/stopsel");
                                        shit.setAttribute('id',"taskbtnstop" + actual_JSON.id);
                                        var ii = document.createElement("input"); //input element, text
                                        ii.setAttribute('type',"hidden");
                                        ii.setAttribute('name',"id");
                                        ii.setAttribute('value', actual_JSON.id);
                                        var iii = document.createElement("input"); //input element, text
                                        iii.setAttribute('type',"hidden");
                                        iii.setAttribute('name',"status");
                                        iii.setAttribute('value', 'Stopped');
                                        var ss = document.createElement("button"); //input element, Submit button
                                        ss.className = 'btn btn-danger btn-sm';
                                        ss.setAttribute('type', 'submit');
                                        ss.setAttribute('id', "taskbtnstop" + actual_JSON.id)
                                        ss.innerHTML = '<i class="ni ni-button-pause"></i>'
                                        ff.appendChild(ii);
                                        ff.appendChild(iii);
                                        ff.appendChild(ss);
                                        shit.appendChild(ff);
                                        cellz.appendChild(shit);
                                    }
                                
             
                                document.getElementById('task'+actual_JSON.id).className  ='white-text';
                                //document.getElementById('task'+actual_JSON.id).setAttribute("style", 'font-weight: bold;')
                                if(actual_JSON.status.toLowerCase().includes('stopped') || actual_JSON.status.toLowerCase().includes('refused'))
                                {
                                    document.getElementById('task'+actual_JSON.id).setAttribute('style', 'font-weight: bold; color: red;');
                                }
                                else if(actual_JSON.status.toLowerCase().includes('warning') ||actual_JSON.status.toLowerCase().includes('queue')||actual_JSON.status.toLowerCase().includes('order failed') ||actual_JSON.status.toLowerCase().includes('err')  )
                                {
                                    document.getElementById('task'+actual_JSON.id).setAttribute('style', 'font-weight: bold; color: orange;');
                                }
                                else if(actual_JSON.status.toLowerCase().includes('submitted') || actual_JSON.status.toLowerCase().includes('placed') || actual_JSON.status.toLowerCase().includes('Check Email') )
                                {
                                    document.getElementById('task'+actual_JSON.id).setAttribute('style', 'font-weight: bold; color: green;');
                                    iziToast.show({
                                        theme: 'light',
                                        icon: 'icon-person',
                                        title: 'LETS GO!!!',
                                        message: 'You cooked, check your email!',
                                        position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                                        progressBarColor: '#5e72e4',
                                        onOpening: function(instance, toast){
                                            console.info('callback abriu!');
                                        },
                                        onClosing: function(instance, toast, closedBy){
                                            console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
                                        }
                                    });
                                }
                                else
                                {
                                    document.getElementById('task'+actual_JSON.id).setAttribute('style', 'font-weight: bold; color: grey;');
                                }
                                document.getElementById('task'+actual_JSON.id).textContent = actual_JSON.status;
                                if((actual_JSON.status.toLowerCase() == 'stopped') || (actual_JSON.status.toLowerCase().includes('refused')))
                                {
                                    document.getElementById('taskbtnst'+ actual_JSON.id).removeAttribute('disabled');
                                    document.getElementById('taskbtndel'+ actual_JSON.id).removeAttribute('disabled');
                                }
                                else
                                {
                                    console.log('taskbtnst'+ actual_JSON.id)
                                    if(document.getElementById('taskbtnst'+ actual_JSON.id))
                                    {
                                        document.getElementById('taskbtnst'+ actual_JSON.id).setAttribute('disabled', "true");
                                    }
                                    
                                }
            
                                }
                            }

                        }
                        
                }

  
            });


                


            
    
            }
            
        }
        round++;
        if(round == 2)
        {
            inist = false;
        }
        
       })
      
 }, 66)
