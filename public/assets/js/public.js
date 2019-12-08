//设置日期格式
function formateDate(date){
    date = new Date(date)
return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
}

//获取随机推荐
$.ajax({
    type:'get',
    url:'/posts/recommend',
    success:function(resp){
        var htmlStr = `
        {{each data}}
        <li>
            <a href="javascript:;">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.meta.comments}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
          </li>
          {{/each}}
        `
        var html = template.render(htmlStr,{data:resp})

        $('#recommendBox').html(html)
    }
})
//获取最新评论
$.ajax({
    type:'get',
    url:'/comments/lasted',
    success:function(resp){
        console.log(resp);
        var htmlStr = `
        {{each data}}
        <li>
        <a href="javascript:;">
          <div class="avatar">
            <img src="{{$value.author.avatar}}" alt="">
          </div>
          <div class="txt">
            <p>
              <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
            </p>
            <p>{{$value.content}}</p>
          </div>
        </a>
      </li>
        {{/each}}
        `
        var html = template.render(htmlStr,{data:resp})
        $('#commentBox').html(html)
    }
})