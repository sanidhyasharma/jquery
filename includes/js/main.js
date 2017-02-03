
$(document).ready(function(){
	loadData();
});//end ready document

function loadData(){

	var $table1=$('#table');
	var $inputtype=$('#inputtype').val(); 


	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/data?_start=0&_end=40',
		
		dataType:'JSON',
		success: function(data){
			$.each(data,function(i,data1) {

				$table1.append('<tr>'+'<td >'+data1.id+'</td>'+'<td class="nr0">'+data1.name+'</td>'+'<td class="nr1">'+data1.email+'</td>'+'<td class="nr2">'+data1.phone+'</td>'+'<td> <button id="add" data-target="#update_table" data-toggle="modal"><span class="glyphicon glyphicon-pencil" data-id='+data1.id+'> </span></button> <button class="remove" data-id='+data1.id+'><span class="glyphicon glyphicon-trash"> </span></button>'+'</td>'+'</tr>');
			});

		}
             }); //end ajax
}

$('#search').click(function(){
	var $table1=$('#table');
	var $inputtype=$('#inputtype').val(); 
	var tbody=$table1.find("tbody");
       		$.ajax({
       	type:'GET',
       	url:'http://localhost:3000/data/'+$inputtype,
       	dataType:'JSON',
       	success:function(data)
       	{
       		console.log(data);
       		tbody.empty();
       		$table1.append('<tr>'+'<td>'+data.id+'</td>'+'<td class="nr0">'+data.name+'</td>'+'<td class="nr1">'+data.email+'</td>'+'<td class="nr2">'+data.phone+'</td>'+'<td><button data-target="#update_table" data-toggle="modal"><span class="glyphicon glyphicon-pencil" data-id='+data.id+'> </span></button> <button class="remove" data-id='+data.id+'><span class="glyphicon glyphicon-trash"> </span></button></td>'+'</tr>');
       	},
       	error:function()
       	{
       		alert("ID not found");
       	}	        
       });
   });


$('#add-details').click(function(){
	/*	$('#myModal').hide();*/
	var $table1=$('#table');
	var tbody=$table1.find("tbody");


	var details={
		
		name:$('#inputName').val(),
		email:$('#inputEmail').val(),
		phone:$('#inputPhone').val()
	};
	function isValidEmailAddress(emailAddress) {
		console.log("email check");
		var pattern =(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
		return pattern.test(emailAddress);
	}
	var flag=isValidEmailAddress(details.email);

	if(details.name.length==0)
	{
		alert("Name cant be empty");
		loadData();
	}

	else if(!(details.name.match(/^[a-zA-Z]+$/)))
	{
		console.log("yes");
		alert("Name syntax error");
		loadData();
	}
	else if(details.phone.length==0) 
	{
		alert("Phone no cant be empty");
		loadData();
	}

	else if(isNaN(details.phone))
	{
		alert("Phone no must of type integer");
		loadData();
	}

	else if(details.phone.length!=10)
	{
		alert("Phone no must be of length 10");
		loadData();
	}


	else if(details.email.length==0)
	{
		alert("Email cant be empty");
		loadData();
	}

	else if(!(flag)){
		alert("Wrong Email syntax");
		loadData();
	}

	else {
		$.ajax({
			type:'Post',
			url:'http://localhost:3000/data/',
			data:details,
			success:function(data1){
				tbody.empty();
				$table1.append('<tr>'+'<td >'+data1.id+'</td>'+'<td class="nr0">'+data1.name+'</td>'+'<td class="nr1">'+data1.email+'</td>'+'<td class="nr2">'+data1.phone+'</td>'+'<td> <button id="add" data-target="#myModal" data-toggle="modal"><span class="glyphicon glyphicon-pencil" data-id='+data1.id+'> </span></button> <button class="remove" data-id='+data1.id+'><span class="glyphicon glyphicon-trash"> </span></button>'+'</td>'+'</tr>');
				alert("value added successfully");
			}

		});

	}
});




var $table1=$('#table');
$table1.delegate('.remove','click',function(){
	var $tr = $(this).closest('tr');

	$.ajax({
		type:'DELETE',
		url: 'http://localhost:3000/data/'+$(this).attr('data-id'),
		success:function(){
			$tr.hide();
			alert("data deleted successfully");
		}
	});

});




var $id;
var $update_table=$('#update_table');

$table1.delegate('.glyphicon-pencil','click',function(){
	/*var tbody=$table1.find("tbody");*/

	$id=$(this).attr('data-id');
	var $tr = $(this).closest('tr');
	console.log("hello update using glyphicon-pencil");
	$.ajax({
		type:'GET',
		url: 'http://localhost:3000/data/'+$(this).attr('data-id'),
		success:function(){
			/*tbody.empty();*/
			$('#update_table').show();
			$('#name_update').val($tr.find(".nr0") .text());
			$('#email_update').val($tr.find(".nr1") .text());
			$('#phone_update').val($tr.find(".nr2").text());

		}
	});	
});





$('#toupdate').click(function(){
	$('#update_table').hide();
	var tbody=$table1.find("tbody"); 
	var update_add={
		name: $('#name_update').val(),
		email: $('#email_update').val(),
		phone: $('#phone_update').val()
	};

	function isValidEmailAddress(emailAddress) {
		console.log("email check");
		var pattern =(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
		return pattern.test(emailAddress);
	}
	var flag=isValidEmailAddress(update_add.email);
	console.log(flag);
	console.log("hello update");
	if(update_add.phone.length==0) 
	{
		alert("Phone no cant be empty");
		loadData();
	}

	else if(isNaN(update_add.phone))
	{
		alert("Phone no must of type integer");
		loadData();
	}

	else if(update_add.phone.length!=10)
	{
		alert("Phone no must be of length 10");
		loadData();
	}

	else if(update_add.name.length==0)
	{
		alert("Name cant be empty");
		loadData();
	}

	else if(!(update_add.name.match(/^[a-zA-Z]+$/)))
	{

		alert("Name syntax error");
		loadData();
	}



	else if(update_add.email.length==0)
	{
		alert("Email cant be empty");
		loadData();
	}

	else if(!(flag)){
		alert("Wrong Email syntax");
		loadData();
	}

	else{
		$.ajax({

			type:'PATCH',
url: 'http://localhost:3000/data/'+$id,
data: update_add,
success:function(data1){
	tbody.empty();
	    alert("data updated successfully");
	$table1.append('<tr>'+'<td >'+data1.id+'</td>'+'<td class="nr0">'+data1.name+'</td>'+'<td class="nr1">'+data1.email+'</td>'+'<td class="nr2">'+data1.phone+'</td>'+'<td> <button id="add" data-target="#update_table" data-toggle="modal"><span class="glyphicon glyphicon-pencil" data-id='+data1.id+'> </span></button> <button class="remove" data-id='+data1.id+'><span class="glyphicon glyphicon-trash"> </span></button>'+'</td>'+'</tr>');
    
}

});
	}
});

$('#tocancel').click(function(){
	console.log("hello cancel");
	loadData();
});
/*$(function(){*/


	var start=0;
	var end =40;
	$(window).scroll(function()
	{
		if($(window).scrollTop() == $(document).height() - $(window).height())
		{
			$('div#loadmoreajaxloader').show();
			$.ajax({

				url: 'http://localhost:3000/data?_start='+(start+40)+'&_end='+(end+40),
     //http://localhost:3000/db?_start=0&_end=10
     success: function(html)
     {
     	start = start+40;
     	end = end+40;

     	if(html)
     	{
     		$("#postswrapper").append(html);
     		$(html).each(function(index,html)

     		{

     			$table1.append('<tr>'+'<td >'+html.id+'</td>'+'<td class="nr0">'+html.name+'</td>'+'<td class="nr1">'+html.email+'</td>'+'<td class="nr2">'+html.phone+'</td>'+'<td> <button  ><span class="glyphicon glyphicon-pencil" data-id='+html.id+'> </span></button> <button class="remove" data-id='+html.id+'><span class="glyphicon glyphicon-trash"> </span></button>'+'</td>'+'</tr>');

     		});


     		$('div#loadmoreajaxloader').hide();
     	}else
     	{
     		$('div#loadmoreajaxloader').html('<center>No more posts to show.</center>');
     	}
     }
 });
		}
	});



