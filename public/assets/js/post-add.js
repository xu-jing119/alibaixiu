//获取服务器端的分类数据
$.ajax({
    url:'/categories',
    type:'get',
    success:function(result){
      //  console.log(result);
        var html = template('postadd-tpl',{data:result})
        $("#category").html(html)
    }
})
//实现文件上传
$('#feature').on('change',function(){
    var formData = new FormData()
    formData.append('cover',this.files[0])
    $.ajax({
        url:'/upload',
        type:'post',
        data:formData,
        contentType: false,
        processData: false,
        success:function(result){
            console.log(result);
            $('#thumbnail').val(result[0].cover)
        }
    })
})
//当添加文章表单提交的时候
$("#addForm").on('submit',function(){
    var formData = $(this).serialize()
    console.log(formData);
    
    $.ajax({
        type:'post',
        url:'/posts',
        data:formData,
        success:function(){
           // console.log(result);
            location.href = '/admin/posts.html'
        }
    })
    return false
})
//文章编辑功能
function getUrlParam(name){
  var query =location.search.substr(1).split('&')
  //console.log(query);
  
 for(var i = 0; i <query.length; i++){
   var temp =  query[i].split('=')
   if(temp[0] == name){
    return temp[1]
   }
  //如果没有对应的name 那就返回一个任意数  这里设置为-1
   return -1
 }
    
}
console.log(getUrlParam('id'))
// 当找得到id时 证明进入修改模式
var id = getUrlParam('id')
if(id != -1){
    $.ajax({
        type:'put',
        url:'/posts/' +id,
        success:function(result){
            $.ajax({
                url:'/categories',
                type:'get',
                success:function(category){
                   console.log(category)
                   result.categories = category
                   console.log(result)
                   var html = template('modifyTpl',result)
                   $('#father').html(html)
                }
            }) 
        }
    }) 
}  
//当提交修改内容时
$("#father").on('submit','#modifyForm',function(){
    var formData = $(this).serialize()
   var id = $(this).attr('data-id')
$.ajax({
    type:'put',
    url:'/posts/' + id,
    data:formData,
    success:function(){
        location.href = '/admin/posts.html'
    }
})
    return false
})








