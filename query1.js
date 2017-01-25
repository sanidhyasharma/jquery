$(function(){


    $('#searchClick').on("click",function(){
//x        alert("hi");
    apiCall();
});
function apiCall()
{
    $('#dataTable').html('');
    var title=$('#textSearch').val();

    $.getJSON('http://www.omdbapi.com/?s='+title).then(function(response)
    {
            var data=response
          
          var columns = addAllColumnHeaders(data);

               for (var i = 0; i < data["Search"].length; i++) {
                   var row$ = $('<tr/>');
                   for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                       var cellValue = data["Search"][i][columns[colIndex]];
                       if(colIndex==4){
                           if (cellValue == null) { cellValue = ""; }
                        row$.append($('<td><img src='+data["Search"][i][columns[4]]+' alt="Image" height="300px"></td>'));
                       }
                       else
                       {
                       if (cellValue == null) { cellValue = ""; }
                       row$.append($('<td/>').html(cellValue));
                   }
                   }
                   $("#dataTable").append(row$);
               }
        
        });
}
function addAllColumnHeaders(myList) {
               var columnSet = [];
               var headerTr = $('<tr/>');

               for (var i = 0; i < myList["Search"].length; i++) {
                   var rowHash = myList["Search"][i];
                   for (var key in rowHash) {
                       if ($.inArray(key, columnSet) == -1) {
                           columnSet.push(key);
                           headerTr.append($('<th/>').html(key));
                       }
                   }
               }
               $("#dataTable").append(headerTr);

               return columnSet;
           }

});