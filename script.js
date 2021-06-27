initiate();



function initiate() {

	var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) { 
           if (xmlhttp.status == 200) {
           		var result = JSON.parse(xmlhttp.responseText);
                console.log(result[0].name);
			    var tr = '<tr>';
			    for(var i = 0; i < result.length; i++){
			    	tr += '<td>' + (i + 1) + '</td>';
			    	tr += '<td>' + result[i].name + '</td>';
			    	tr += '<td>' + result[i].email + '</td>';
			    	tr += '<td><button class="btn btn-primary" onclick="getUserPosts(' + result[i].id + ', \'' + result[i].name + '\')">Get User’s Posts</button></td>';
			    	tr += '</tr>';
			    }
			    document.getElementById("users-list").innerHTML = tr;
			    document.getElementById('loader').style.display = 'none';
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
    xmlhttp.send();
}


function getUserPosts(user_id, name){

	document.getElementById('loader').style.display = 'block';
	document.getElementById('users-table').style.display = 'none';
	document.getElementById('posts-table').style.display = 'block';

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) { 
           if (xmlhttp.status == 200) {
           		var result = JSON.parse(xmlhttp.responseText);
                console.log(result[0].name);
			    var tr = '<tr>';
			    for (var i = 0; i < result.length; i++) {
			    	tr +=  '<td>' + (i + 1) + '</td>';
			    	tr += '<td>' + result[i].title + '<br/>' + result[i].body + '</td>';
			    	tr += '</tr>';
			    }
			    document.getElementById('posts-list').innerHTML = tr;
			    document.getElementById('table-title').innerHTML = name + '\'s posts';
			    document.getElementById('loader').style.display = 'none';
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", "https://jsonplaceholder.typicode.com/posts?userId=" + user_id, true);
    xmlhttp.send();
}