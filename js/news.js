function setSrcRss(cur){
  	$($(cur).data("target")).find('iframe').attr('src',$(cur).data("link"));
}

function getNews(divToFill,newsfeed){

	if(typeof(_NEWS_RSSFEED)!=='undefined'){
		// Some RSS feed doesn't load trough crossorigin.me or vice versa
		//$.ajax('https://crossorigin.me/'+newsfeed, {
		$.ajax(newsfeed, {
			accepts:{
				xml:"application/rss+xml"
			},
			dataType:"xml",
			success:function(data) {

				var width=12;
				if(typeof(blocks[divToFill])!=='undefined' && typeof(blocks[divToFill]['width'])!=='undefined') width=blocks[divToFill]['width'];

				var html = '<div class="col-xs-'+width+' hover transbg"><div class="col-xs-2 col-icon"><em class="fa fa-newspaper-o"></em></div><div class="col-xs-10">';
				html+='<div id="rss-styled_'+divToFill+'"><ul id="newsTicker">';

				$(data).find("item").each(function () { // or "item" or whatever suits your feed
					var el = $(this);
					html+='<li data-toggle="modal" data-toggle="modal" data-target="#rssweb" data-link="'+el.find("link").text()+'" onclick="setSrcRss(this);"><strong>'+el.find("title").text()+'</strong><br />'+el.find("description").text()+'</li>';
					
				});

				html+='</div></div></div>';
				$("div."+divToFill).replaceWith('<div class="'+divToFill+'">'+html+'</div>');

				if($('#rssweb').length==0){
					var htmlRss = '<div class="modal fade" id="rssweb" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
					  htmlRss+='<div class="modal-dialog">';
						htmlRss+='<div class="modal-content">';
						  htmlRss+='<div class="modal-header">';
							htmlRss+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
						  htmlRss+='</div>';
						  htmlRss+='<div class="modal-body">';
							  htmlRss+='<iframe sandbox="" data-popup="" width="100%" height="570" frameborder="0" allowtransparency="true"></iframe> '; 
						  htmlRss+='</div>';
						htmlRss+='</div>';
					  htmlRss+='</div>';
					htmlRss+='</div>';
					$('body').append(htmlRss);
				}	

				newsWrapper = $('#rss-styled_'+divToFill).easyTicker({
					direction: 'up',
					easing: 'lineair',
					speed: 'slow',
					interval: _SCROLL_NEWS_AFTER,
					visible: 1,
					mousePause: 0
				}).data('easyTicker');

				var maxHeight = -1;

				$('#rss-styled_'+divToFill+' li').each(function() {
					maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
				});

				$('#rss-styled_'+divToFill).parents('.transbg').height(maxHeight);
				

			}
			
		});	

		setTimeout(function(){getNews(divToFill);}, (60000*5));
	}
}