
//获取服务器端的文化列表
$.ajax({
    type:'get',
    url:'/posts',
    success:function(result){
      //  console.log(result);
        var html = template('postsTpl',result)
        $('#postsBox').html(html)
        var page = template('listTpl',result)
        $("#listBox").html(page)
    }
})
//设置日期格式
function formateDate(date){
    date = new Date(date)
return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
}
//封装分页函数
function changePage(page){
   // alert(page)
    $.ajax({
        type:'get',
        url:'/posts',
        data:{page:page},
        success:function(result){
            //console.log(result);
            var html = template('postsTpl',result)
            $('#postsBox').html(html)
            var page = template('listTpl',result)
            $("#listBox").html(page)
        }
    })
}
//筛选功能
$.ajax({
    type:'get',
    url:'/categories',
    success:function(result){
       // console.log(result);
        var html = template('tpl-post',{data:result})
        //console.log(html);
        
        $('#category').html(html)
    }
})
$('#form-list').on('submit',function(){
    var formData = $(this).serialize()
   // console.log(formData);
    
    $.ajax({
        type:'get',
        url:'/posts',
        data:formData,
        success:function(result){
            var html = template('postsTpl',result)
            $('#postsBox').html(html)
            var page = template('listTpl',result)
            $("#listBox").html(page)
        }
    })
    return false
})
//实现文章删除功能
$('#postsBox').on('click','.delete',function(){
    var id = $(this).attr('data-id')
        console.log(id);
    if(confirm('您是否确认删除该文章')){
        $.ajax({
            type:'delete',
            url:'/posts/' + id,
            success:function(result){
               // console.log(result);
                location.reload()
            }
        })
        
    }
})