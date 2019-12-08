// 文章评论功能
$.ajax({
    type:'get',
    url:'/comments',
    success:function(result){
        console.log(result);
        var html = template('commentsTpl',result)
        console.log(html);
        $('#commentsBox').html(html)
        var page = template('pageTpl',result)
        $('#pageBox').html(page)
    }
})
//设置日期格式
function formateDate(date){
    date = new Date(date)
return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
}
//实现分页
function changePage(page){
    $.ajax({
        type:'get',
        url:'/comments',
        data:{page:page},
        success:function(result){
           // console.log(result);
            var html = template('commentsTpl',result)
           // console.log(html);
            $('#commentsBox').html(html)
            var page = template('pageTpl',result)
            $('#pageBox').html(page)
        }
    })
}
//当点击审核按钮时
$('#commentsBox').on('click','.status',function(){
    var status = $(this).attr('data-status')
    var id = $(this).attr('data-id')
    $.ajax({
        type:'put',
        url:'/comments/'+id,
        data:{
            state: status == 0 ? 1 : 0
        },
        success:function(){
           location.reload()
            
        }
    })
})

//当点击删除按钮时
$('#commentsBox').on('click','.delete',function(){
    var id = $(this).attr('data-id')
    $.ajax({
        type:'delete',
        url:'/comments/' + id,
        success:function(result){
            location.reload()
            
        }
    })

})

