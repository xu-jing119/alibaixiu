//需求一 : 实现图片上传
$('#logo').on('change',function(){
    var formData = new FormData()
    formData.append('image',this.files[0])
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData: false,
		contentType: false,
        success:function(result){
            console.log(result);
            $('#site_logo').val(result[0].image)
            $('#setImg').attr('src',result[0].image)
            
        }
    })
})
//需求二:获取表单提交信息
$('#settingForm').on('submit',function(){
    var arr = $(this).serializeArray()
    console.log(arr);
    
    var obj ={}
   arr.forEach((item)=>{
        obj[item.name] = item.value
    })
    
  console.log(obj);
  if(!obj.comment){
      obj.comment = false
  }
  if(!obj.review){
    obj.review = false
}
   $.ajax({
       type:'post',
       url:'/settings',
       data:obj,
       success:function(result){
         //  console.log(result);
         location.reload()
           
       }
   })
return false
})

// 向服务器端发送请求 索要网站设置数据  将提交的数据渲染到页面上
$.ajax({
	type: 'get',
	url: '/settings',
	success: function (response) {
		console.log(response)
		if (response) {
			// 将logo地址存储在隐藏域中
			$('#site_logo').val(response.logo)
			// 将logo显示在页面中 
			$('#setImg').attr('src', response.logo)
			// 将网站标题显示在页面中
			$('input[name="title"]').val(response.title);
			// 将是否开启评论功能显示在页面中
			$('input[name="comment"]').prop('checked', response.comment)
			// 将评论是否经过人工审核显示在页面中
            $('input[name="review"]').prop('checked', response.review)
            //将评论关键字显示在页面中
            $('input[name="keywords"').val(response.keywords)
			// 将站点关键词显示在页面中
			$('textarea[name="description"]').val(response.description)
		}
	}
})

