//for form sub
document.getElementById('my-form').addEventListener('submit',saveData);
function saveData(e){
    //get form values
    var sitename = document.getElementById("sitename").value;
    var siteurl = document.getElementById("siteurl").value;
   if(!sitename || !siteurl){
       alert("Fill Site Name and Site Url");
       return false;
   }

    //Object for Storing sites data
    var bookmark ={
        name:sitename,
        url:siteurl
    }

    if(localStorage.getItem("bookmarks")===null){
        // init array
        var bookmarks = [] ;
        // add to array
        bookmarks.push(bookmark);

        // setting to local storage

        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    }else{
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
        fetchBookmarks();
    }
    document.getElementById('my-form').reset();

}
function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url===url){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    fetchBookmarks();
}
function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    console.log(bookmarks);
    var outputResult = document.getElementById("bookoutput");
    outputResult.innerHTML="";
    for(var i=0;i<bookmarks.length;i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        outputResult.innerHTML +='<div class="container">' +
                                   '<div class="card p-3 mb-3">' +
                                    '<h3 class="pl-4">'+name+
                                    '<a class="btn btn-primary ml-3" target="_blank" href="'+url+'">visit</a> ' +
                                    '<a class="btn btn-danger ml-3"  href="#" onclick="deleteBookmark(\''+url+'\')">delete</a> ' +
                                    '</h3>'+
                                    '</div>'+
                                    '</div>';
    }
}