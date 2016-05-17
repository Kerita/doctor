$(function(){




	// 加载的时候隐藏模态框————模态框里面是咨询时患者要填的表单
	$('#myModal').modal('hide');

	// 模态框提交
	$("#modalSubmit").click(function(){

		if($("#username").val() === ""){
			alert("请填写姓名！");
		}
		else if($("#phone").val() === ""){
			alert("请填写手机号码!");
		}
		else if($("#illContent").val() === ""){
			alert("请填写病情描述！");
		}
		else{
			// 提交数据，隐藏模态框
			$('#myModal').modal('hide');
		}


	});


	// 上拉刷新
    // 第几次加载
    var counter = 0;
    // 每次加载数量
    var num = 3;
    // 这一次加载的点和结束点
    var pageStart = 0,pageEnd = 0;

    // dropload
    $('.container').dropload({
        scrollArea : window,
        loadDownFn : function(me){
            $.ajax({
                type: 'GET',
                url: 'json/doctor.json',
                dataType: 'json',
                success: function(data){
                    var result = '';
                    counter++;
                    pageEnd = num * counter;
                    pageStart = pageEnd - num;

                    for(var i = pageStart; i < pageEnd; i++){

                        loadData(data.lists[i]);



                    if((i + 1) >= data.lists.length){
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                            break;
                        }
                    }

                    // 利用弹出框在按钮顶部显示个人简介
                    $("[data-toggle='popover']").popover();

                        // 每次数据加载完，必须重置
                        me.resetload();

                    },
                    error: function(xhr, type){

                        alert("ajax error:"+type);
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });




        }
    });

});



// 加载数据到页面，元素绑定事件
function loadData(list){

    var  result = '<tr> <td><img src="'+list.url+'" class="img-responsive">'+'</td> <td>'+list.name+'</td> <td>'+list.level+'</td>  <td><button type="button" class="btn btn-info" title="个人简介" data-container="body" data-toggle="popover" data-placement="top" data-content="'+list.introduce+'">阅读</button></td> <td class="favorite star_sliver"></td> <td><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal">咨询</button></td></tr>';


    $('tbody').append(result);

    $('tbody td.favorite').last().click(function(){
        if($(this).hasClass("star_sliver")){
            $(this).addClass("star_gold").removeClass("star_sliver");
        }
        else if($(this).hasClass("star_gold")){
            $(this).addClass("star_sliver").removeClass("star_gold");
        }
    });


}
