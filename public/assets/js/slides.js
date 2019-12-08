//实现图片上传功能
$('#image').on('change',function(){
    var formData = new FormData()
    formData.append('img',this.files[0])
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(result){
            console.log(result);
            $('#imgHidden').val(result[0].img)
        }
    })
})
//当轮播表单发生提交时
$('#slidesForm').on('submit',function(){
    var formData = $(this).serialize()
    $.ajax({
        type:'post',
        url:'/slides',
        data:formData,
        success:function(){
            location.reload()
            
        }
    })
    return false
})
//获取服务器端的轮播数据
$.ajax({
    type:'get',
    url:'/slides',
    success:function(result){
       // console.log(result);
        var html = template('slidesTpl',{data:result})
        $('#slidesBox').html(html)
    }
})
//删除轮播功能
$('#slidesBox').on('click','.delete',function(){
    var id = $(this).attr('data-id')
    if(confirm('您确定删除该条吗')){
    $.ajax({
        type:'delete',
        url:'/slides/' +id,
        success:function(){
            location.reload()
        }
    })
}
})
