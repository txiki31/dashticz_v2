
blocktypes = {}
blocktypes.SubType = {}
blocktypes.SubType['Visibility'] = { icon: 'fa fa-eye', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Electric'] = { icon: 'fa fa-plug', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Lux'] = { icon: 'fa fa-sun-o', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Barometer'] = { icon: 'wi wi-barometer', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Gas'] = { icon: 'fa fa-fire', title: lang.gas_usagetoday, value: '<CounterToday>' }
blocktypes.SubType['Sound Level'] = { icon: 'fa fa-volume-up', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Distance'] = { icon: 'fa fa-eye', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Alert'] = { icon: 'fa fa-warning', title: '<Data>', value: '<Name>' }
blocktypes.SubType['Percentage'] = { icon: 'fa fa-percent', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Text'] = { icon: 'fa fa-file', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Counter Incremental'] = { icon: 'fa fa-bolt', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Solar Radiation'] = { icon: 'fa fa-sun-o', title: '<Name>', value: '<Data>' }
blocktypes.SubType['Thermostat Mode'] = { icon: 'fa fa-thermometer-half', title: '<Name>', value: '<Data>' }

blocktypes.SensorUnit = {}
blocktypes.SensorUnit['Fertility'] = { icon: 'fa fa-flask', title: '<Name>', value: '<Data>' }

blocktypes.Type = {}
blocktypes.Type['Rain'] = { icon: 'fa fa-tint', title: '<Name>', value: '<Rain>mm' }
blocktypes.Type['Wind'] = { icon: 'wi wi-wind-direction', title: lang.wind, value: '' }
blocktypes.Type['Temp'] = { icon: 'fa fa-thermometer-half', title: '<Name>', value: '<Temp>'+_TEMP_SYMBOL }
blocktypes.Type['Air Quality'] = { image: 'air.png', title: '<Name>', value: '<Data>' }
blocktypes.Type['UV'] = { icon: 'fa fa-sun-o', title: '<Name>', value: '<Data>' }

blocktypes.HardwareType = {}
blocktypes.HardwareType['Motherboard sensors'] = { icon: 'fa fa-desktop', title: '<Name>', value: '<Data>' }
blocktypes.HardwareType['PVOutput (Input)'] = { icon: 'fa fa-sun-o', title: '<Name>', value: '<CounterToday>' }

blocktypes.HardwareName = {}
blocktypes.HardwareName['Rain expected'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }

blocktypes.Name = {}
blocktypes.Name['Rain Expected'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }
blocktypes.Name['Rain expected'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }
blocktypes.Name['Regen mm/uur'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }
blocktypes.Name['Regen verwacht'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }
blocktypes.Name['Regen Verwacht'] = { icon: 'fa fa-tint', title: '<Data>', value: '<Name>' }

blocktypes.Name['Ping'] = { icon: 'fa fa-arrows-v', title: '<Name>', value: '<Data>' }
blocktypes.Name['Upload'] = { icon: 'fa fa-upload', title: '<Name>', value: '<Data>' }
blocktypes.Name['Download'] = { icon: 'fa fa-download', title: '<Name>', value: '<Data>' }

blocktypes.Name['Maanfase'] = { icon: 'fa fa-moon-o', title: '<Data>', value: '<Name>' }
blocktypes.Name['Moon phase'] = { icon: 'fa fa-moon-o', title: '<Data>', value: '<Name>' }
blocktypes.Name['Mondphase'] = { icon: 'fa fa-moon-o', title: '<Data>', value: '<Name>' }


blocktypes = getExtendedBlockTypes(blocktypes);


function getBlock(cols,c,columndiv,standby){
	if(typeof(cols)!=='undefined'){
		if(!standby) $('div.screen'+s+' .row').append('<div class="col-sm-'+cols['width']+' col-xs-12 sortable col'+c+'"></div>');
		for(b in cols['blocks']){
			var width=12;
			if(typeof(blocks[cols['blocks'][b]])!=='undefined' && typeof(blocks[cols['blocks'][b]]['width'])!=='undefined') width = blocks[cols['blocks'][b]]['width'];
			else if(typeof(cols['blocks'][b])!=='undefined' && typeof(cols['blocks'][b]['width'])!=='undefined') width = cols['blocks'][b]['width'];

			var blocktype='';
			if(typeof(blocks[cols['blocks'][b]])!=='undefined' && typeof(blocks[cols['blocks'][b]]['type'])!=='undefined') blocktype = blocks[cols['blocks'][b]]['type'];

			if(blocktype=='blocktitle'){
				var key = 'UNKNOWN';
				if(typeof(blocks[cols['blocks'][b]]['key'])!=='undefined') key=blocks[cols['blocks'][b]]['key'];
				
				$(columndiv).append('<div data-id="'+key+'" class="col-xs-12 mh titlegroups transbg"><h3>'+blocks[cols['blocks'][b]]['title']+'</h3></div>');
			}
			else if(cols['blocks'][b]=='weather'){
				if(typeof(loadWeatherFull)!=='function') $.ajax({url: 'js/weather.js', async: false,dataType: "script"});
				$(columndiv).append('<div data-id="weather" class="block_'+cols['blocks'][b]+' containsweatherfull"></div>');
				if(_APIKEY_WUNDERGROUND!=="" && _WEATHER_CITY!=="") loadWeatherFull(_WEATHER_CITY,_WEATHER_COUNTRY,$('.weatherfull'));
			}
			else if(cols['blocks'][b]=='currentweather' || cols['blocks'][b]=='currentweather_big'){
				if(typeof(loadWeather)!=='function') $.ajax({url: 'js/weather.js', async: false,dataType: "script"});
				var cl = '';
				if(cols['blocks'][b]=='currentweather_big') $(columndiv).append('<div data-id="currentweather_big" class="mh transbg big block_'+cols['blocks'][b]+' col-xs-'+width+' containsweather"><div class="col-xs-1"><div class="weather" id="weather"></div></div><div class="col-xs-11"><span class="title weatherdegrees" id="weatherdegrees"></span> <span class="weatherloc" id="weatherloc"></span></div></div>');
				else $(columndiv).append('<div data-id="currentweather" class="mh transbg block_'+cols['blocks'][b]+' col-xs-'+width+' containsweather"><div class="col-xs-4"><div class="weather" id="weather"></div></div><div class="col-xs-8"><strong class="title weatherdegrees" id="weatherdegrees"></strong><br /><span class="weatherloc" id="weatherloc"></span></div></div>');
				if(_APIKEY_WUNDERGROUND!=="" && _WEATHER_CITY!=="") loadWeather(_WEATHER_CITY,_WEATHER_COUNTRY);
			}
			else if(cols['blocks'][b]=='train'){
				if(typeof(getTrainInfo)!=='function') $.ajax({url: 'js/ns.js', async: false,dataType: "script"});
				$(columndiv).append('<div data-id="train" class="train"></div>');
				getTrainInfo();
			}
			else if(cols['blocks'][b]=='traffic'){
				if(typeof(getTraffic)!=='function') $.ajax({url: 'js/traffic.js', async: false,dataType: "script"});
				$(columndiv).append('<div data-id="traffic" class="traffic"></div>');
				getTraffic();
			}
			else if(cols['blocks'][b]=='trafficmap'){
				$(columndiv).append('<div data-id="trafficmap" class="mh transbg block_trafficmap col-xs-12"><div id="trafficm" class="trafficmap"></div></div>');
			}
			else if(typeof(cols['blocks'][b])=='object' && typeof(cols['blocks'][b]['latitude'])!=='undefined'){
				var random = getRandomInt(1,100000);
				$(columndiv).append(loadMaps(random,cols['blocks'][b]));
			}
			else if(cols['blocks'][b]=='news'){
				if(typeof(getNews)!=='function') $.ajax({url: 'js/news.js', async: false,dataType: "script"});
				$(columndiv).append('<div data-id="news" class="news"></div>');
				getNews('news',_NEWS_RSSFEED);
			}
			else if(typeof(cols['blocks'][b])=='string' && cols['blocks'][b].substring(0,5)=='news_'){
				if(typeof(getNews)!=='function') $.ajax({url: 'js/news.js', async: false,dataType: "script"});
				$(columndiv).append('<div class="'+cols['blocks'][b]+'"></div>');
				getNews(cols['blocks'][b],blocks[cols['blocks'][b]]['feed']);
			}
			else if(cols['blocks'][b]=='clock'){
				$(columndiv).append('<div data-id="clock" class="transbg block_'+cols['blocks'][b]+' col-xs-'+width+' text-center"><h1 class="clock"></h1><h4 class="weekday"></h4><h4 class="date"></h4></div>');
			}
			else if(cols['blocks'][b]=='stationclock'){
				$(columndiv).append('<div data-id="clock" class="transbg block_'+cols['blocks'][b]+' col-xs-'+width+' text-center"><canvas id="clock" width="150" height="150">Your browser is unfortunately not supported.</canvas></div>');
				if(typeof(StationClock)!=='function') $.ajax({url: 'vendor/stationclock.js', async: false,dataType: "script"});
				
				var clock = new StationClock("clock");
				  clock.body = StationClock.RoundBody;
				  clock.dial = StationClock.GermanStrokeDial;
				  clock.hourHand = StationClock.PointedHourHand;
				  clock.minuteHand = StationClock.PointedMinuteHand;
				  if(_HIDE_SECONDS_IN_STATIONCLOCK==true)  clock.secondHand = false;
				 else {
						  clock.secondHand = StationClock.HoleShapedSecondHand;
						if(typeof(_CLOCK_BOSS)=='undefined') clock.boss = StationClock.NoBoss;
						else if(_CLOCK_BOSS=='RedBoss') clock.boss = StationClock.RedBoss;
					}
				
				  clock.minuteHandBehavoir = StationClock.BouncingMinuteHand;
				  clock.secondHandBehavoir = StationClock.OverhastySecondHand;

				  window.setInterval(function() { clock.draw() }, 50);
			}
			else if(cols['blocks'][b]=='sunrise'){
				$(columndiv).append('<div data-id="sunrise" class="block_'+cols['blocks'][b]+' col-xs-'+width+' transbg text-center sunriseholder"><em class="wi wi-sunrise"></em><span class="sunrise"></span><em class="wi wi-sunset"></em><span class="sunset"></span></div>');
			}
			else if(typeof(cols['blocks'][b])=='object' && typeof(cols['blocks'][b]['isimage'])!=='undefined'){
				var random = getRandomInt(1,100000);
				$(columndiv).append(loadImage(random,cols['blocks'][b]));
			}
			else if(cols['blocks'][b]=='horizon'){
				var html ='<div data-id="horizon" class="containshorizon">';
						html+='<div class="col-xs-4 transbg hover text-center" onclick="ziggoRemote(\'E0x07\')">';
							html+='<em class="fa fa-chevron-left fa-small"></em>';
						html+='</div>';
						html+='<div class="col-xs-4 transbg hover text-center" onclick="ziggoRemote(\'E4x00\')">';
							html+='<em class="fa fa-pause fa-small"></em>';
						html+='</div>';
						html+='<div class="col-xs-4 transbg hover text-center" onclick="ziggoRemote(\'E0x06\')">';
							html+='<em class="fa fa-chevron-right fa-small"></em>';
						html+='</div>';
					html+='</div>';
				$(columndiv).append(html);
			}
			else if(cols['blocks'][b]=='icalendar'){
				var random = getRandomInt(1,100000);
				var html ='<div class="transbg containsicalendar containsicalendar'+random+'"><div class="col-xs-'+width+' transbg"></div></div>';
				$(columndiv).append(html);	
				addCalendar($('.containsicalendar'+random),_ICALENDAR_URL);
			}
			else if(cols['blocks'][b]=='streamplayer'){
				var random = getRandomInt(1,100000);
				var html ='<div data-id="streamplayer" class="transbg containsstreamplayer'+random+'">';
						html+='<div class="col-xs-12 transbg smalltitle"><h3></h3></div>';
						html+='<audio class="audio1" preload="none"></audio>';
						html+='<div class="col-xs-4 transbg hover text-center btnPrev">';
							html+='<em class="fa fa-chevron-left fa-small"></em>';
						html+='</div>';
						html+='<div class="col-xs-4 transbg hover text-center playStream">';
							html+='<em class="fa fa-play fa-small stateicon"></em>';
						html+='</div>';
						html+='<div class="col-xs-4 transbg hover text-center btnNext">';
							html+='<em class="fa fa-chevron-right fa-small"></em>';
						html+='</div>';
					html+='</div>';
				$(columndiv).append(html);

				addStreamPlayer('.containsstreamplayer'+random);					
			}
			else if(typeof(cols['blocks'][b])=='object'){
				var random = getRandomInt(1,100000);
				var key = 'UNKNOWN';
				if(typeof(cols['blocks'][b]['key'])!=='undefined') key=cols['blocks'][b]['key'];
				
				if(typeof(cols['blocks'][b]['icalurl'])!=='undefined' || typeof(cols['blocks'][b]['calendars'])!=='undefined'){
					var html ='';
					if(typeof(cols['blocks'][b]['title'])!=='undefined') html+='<div class="col-xs-'+width+' mh titlegroups transbg"><h3>'+cols['blocks'][b]['title']+'</h3></div>';
					html+='<div data-id="calendars.'+key+'" class="transbg containsicalendar containsicalendar'+random+'"><div class="col-xs-'+width+' transbg"></div></div>';
					$(columndiv).append(html);	
					addCalendar($('.containsicalendar'+random),cols['blocks'][b]);

				}
				else if(typeof(cols['blocks'][b]['trashapp'])!=='undefined') $(columndiv).append(loadTrash(random,cols['blocks'][b]));
				else if(typeof(cols['blocks'][b]['frameurl'])!=='undefined') $(columndiv).append(loadFrame(random,cols['blocks'][b]));
				else if(typeof(cols['blocks'][b]['station'])!=='undefined') $(columndiv).append(loadPublicTransport(random,cols['blocks'][b]));
				else $(columndiv).append(loadButton(b,cols['blocks'][b]));
			}
			else {
				$(columndiv).append('<div data-id="'+cols['blocks'][b]+'" class="mh transbg block_'+cols['blocks'][b]+'"></div>');
			}
		}
	}
}

function getStateBlock(id,icon,title,value,device){
	
	if(device['SubType']=='Percentage' || device['SubType']=='Custom Sensor' || device['TypeImg']=='counter' || device['Type']=='Temp' || device['Type']=='Wind' || device['Type']=='Rain' || device['Type']== 'Temp + Humidity' || device['Type']== 'Temp + Humidity + Baro'){
		getButtonGraphs(device);
		if($('.block_'+device['idx']).length>0){
			$('.block_'+device['idx']).addClass('hover');
			$('.block_'+device['idx']).attr('data-toggle','modal');
			$('.block_'+device['idx']).attr('data-target','#opengraph'+device['idx']);
		}
		if($('.block_'+device['idx']+'_1').length>0){
			$('.block_'+device['idx']+'_1').addClass('hover');
			$('.block_'+device['idx']+'_1').attr('data-toggle','modal');
			$('.block_'+device['idx']+'_1').attr('data-target','#opengraph'+device['idx']);
		}
		if($('.block_'+device['idx']+'_2').length>0){
			$('.block_'+device['idx']+'_2').addClass('hover');
			$('.block_'+device['idx']+'_2').attr('data-toggle','modal');
			$('.block_'+device['idx']+'_2').attr('data-target','#opengraph'+device['idx']);
		}
	}
	
	triggerChange(device['idx'],value);
	
	var stateBlock ='<div class="col-xs-4 col-icon">';
		stateBlock+='<em class="'+icon+'"></em>';
	stateBlock+='</div>';
	stateBlock+='<div class="col-xs-8 col-data">';
		
		if(typeof(blocks[device['idx']])!=='undefined' && typeof(blocks[device['idx']]['switch'])!=='undefined' && blocks[device['idx']]['switch']==true){
			stateBlock+='<strong class="title">'+title+'</strong><br />';
			stateBlock+='<span>'+value+'</span>';
		}
		else {
			stateBlock+='<strong class="title">'+value+'</strong><br />';
			stateBlock+='<span>'+title+'</span>';

		}
	
	stateBlock+='</div>';
	return stateBlock;
}


function getStatusBlock(device,block){
	
	var value = block.value;
	var title = block.title;
	
	for(d in device) {
		value = value.replace('<'+d+'>',device[d]);
		title = title.replace('<'+d+'>',device[d]);
	}
						
	if(device['SubType']=='Percentage' || device['SubType']=='Custom Sensor' || device['TypeImg']=='counter' || device['Type']=='Temp' || device['Type']=='Wind' || device['Type']=='Rain' || device['Type']== 'Temp + Humidity' || device['Type']== 'Temp + Humidity + Baro'){
		getButtonGraphs(device);
		if($('.block_'+device['idx']).length>0){
			$('.block_'+device['idx']).addClass('hover');
			$('.block_'+device['idx']).attr('data-toggle','modal');
			$('.block_'+device['idx']).attr('data-target','#opengraph'+device['idx']);
		}
		if($('.block_'+device['idx']+'_1').length>0){
			$('.block_'+device['idx']+'_1').addClass('hover');
			$('.block_'+device['idx']+'_1').attr('data-toggle','modal');
			$('.block_'+device['idx']+'_1').attr('data-target','#opengraph'+device['idx']);
		}
		if($('.block_'+device['idx']+'_2').length>0){
			$('.block_'+device['idx']+'_2').addClass('hover');
			$('.block_'+device['idx']+'_2').attr('data-toggle','modal');
			$('.block_'+device['idx']+'_2').attr('data-target','#opengraph'+device['idx']);
		}
		
	}
	
	var attr='';
	if(typeof(device['Direction'])!=='undefined' && typeof(device['DirectionStr'])!=='undefined'){
		attr+=' style="-webkit-transform: rotate('+device['Direction']+'deg);-moz-transform: rotate('+device['Direction']+'deg);-ms-transform: rotate('+device['Direction']+'deg);-o-transform: rotate('+device['Direction']+'deg); transform: rotate('+device['Direction']+'deg);"';
		//start alteration
		if (_USE_BEAUFORT ==true){
			value = Beaufort(device['Speed'])+', '; 
		} else {
			value = device['Speed']+' m/s, '; 
		}
		value+=device['Direction']+'&deg ';
		if (_TRANSLATE_SPEED==true){
			value+=TranslateDirection(device['DirectionStr'])
		} else {
			value+=device['DirectionStr'];
		}
		//end alteration
	}
	
	triggerChange(device['idx'],device['Status']);
	
	var stateBlock ='<div class="col-xs-4 col-icon">';
		if(typeof(blocks[device['idx']])!=='undefined' && typeof(blocks[device['idx']]['icon'])!=='undefined'){
			stateBlock+='<em class="fa '+blocks[device['idx']]['icon']+'"'+attr+'></em>';
		}
		else if(typeof(blocks[device['idx']])!=='undefined' && typeof(blocks[device['idx']]['image'])!=='undefined'){
			stateBlock+='<img src="img/'+blocks[device['idx']]['image']+'"'+attr+' class="icon" />';
		}
		else {
			if(typeof(block.image)!=='undefined') stateBlock+='<img src="img/'+block.image+'"'+attr+' class="icon" />';
			else stateBlock+='<em class="'+block.icon+'"'+attr+'></em>';
		}
	stateBlock+='</div>';
	stateBlock+='<div class="col-xs-8 col-data">';
		if(typeof(blocks[device['idx']])!=='undefined' && typeof(blocks[device['idx']]['switch'])!=='undefined' && blocks[device['idx']]['switch']==true){
			stateBlock+='<strong class="title">'+title+'</strong><br />';
			stateBlock+='<span>'+value+'</span>';
		}
		else {
			stateBlock+='<strong class="title">'+value+'</strong><br />';
			stateBlock+='<span>'+title+'</span>';
		}
		if((_SHOW_LASTUPDATE && (typeof(blocks[device['idx']])=='undefined' || typeof(blocks[device['idx']]['hide_lastupdate'])=='undefined' || blocks[device['idx']]['hide_lastupdate']===false)) || 
		  (!_SHOW_LASTUPDATE && (typeof(blocks[device['idx']])!=='undefined' && typeof(blocks[device['idx']]['show_lastupdate'])!=='undefined' && blocks[device['idx']]['show_lastupdate']==true)) 
		  ){
			stateBlock+='<br /><span class="lastupdate">'+moment(device['LastUpdate']).format(_LASTUPDATE_FORMAT)+'</span>';
		}
	stateBlock+='</div>';
	return stateBlock;
}


function iconORimage(idx,defaulticon,defaultimage,classnames,attr,colwidth,attrcol){
	if(typeof(colwidth)=='undefined') colwidth=4;
	if(typeof(attrcol)=='undefined') attrcol='';
	var icon = '<div class="col-xs-'+colwidth+' col-icon" '+attrcol+'>';
	if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['icon'])!=='undefined'){
		icon+='<em class="fa '+blocks[idx]['icon']+' '+classnames+'" '+attr+'></em>';
	}
	else if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['image'])!=='undefined'){
		icon+='<img src="img/'+blocks[idx]['image']+'" class="'+classnames+'" '+attr+' />';
	}
	else if(defaulticon!=='') icon+='<em class="fa '+defaulticon+' '+classnames+'" '+attr+'></em>';
	else if(defaultimage!=='') icon+='<img src="img/'+defaultimage+'" class="'+classnames+'" '+attr+' />';
	
	icon+='</div>';
	return icon;
}

function getBlockData(device,idx,ontxt,offtxt){
	triggerChange(device['idx'],device['Status']);
	
	var data='<div class="col-xs-8 col-data">';
	if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['hide_data'])!=='undefined' && blocks[idx]['hide_data']==true){
		data+='<strong class="title">'+device['Name']+'</strong>';
	}
	else if(typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['switch'])!=='undefined' && blocks[idx]['switch']==true){
		if(device['Status']=='Off' || device['Status']=='Closed' || device['Status']=='Normal') data+='<strong class="title">'+offtxt+'</strong><br />';
		else data+='<strong class="title">'+ontxt+'</strong><br />';
		data+='<span class="state">'+device['Name']+'</span>';
	}
	else {
		data+='<strong class="title">'+device['Name']+'</strong><br />';
		if(device['Status']=='Off' || device['Status']=='Closed' || device['Status']=='Normal') data+='<span class="state">'+offtxt+'</span>';
		else data+='<span class="state">'+ontxt+'</span>';
	}
	if((_SHOW_LASTUPDATE && (typeof(blocks[idx])=='undefined' || typeof(blocks[idx]['hide_lastupdate'])=='undefined' || blocks[idx]['hide_lastupdate']===false)) || 
	  (!_SHOW_LASTUPDATE && (typeof(blocks[idx])!=='undefined' && typeof(blocks[idx]['show_lastupdate'])!=='undefined' && blocks[idx]['show_lastupdate']==true)) 
	  ){
		data+='<br /><span class="lastupdate">'+moment(device['LastUpdate']).format(_LASTUPDATE_FORMAT)+'</span>';
	}
	data+='</div>';
	return data;
}
function TranslateDirection(directionstr){
   directionstr='direction_'+directionstr;
   return lang[directionstr];
}

function Beaufort(tmp) {
   if (tmp >= 0 && tmp <= 0,2) {
      bft = "0 Bft";
   }
   if (tmp >= 0.3 && tmp <= 1.5) {
      bft = "1 Bft";
   }
   if (tmp >= 1.6 && tmp <= 3.3) {
      bft = "2 Bft";
   }
   if (tmp >= 3.4 && tmp <= 5.4) {
      bft = "3 Bft";
   }
   if (tmp >= 5.5 && tmp <= 7.9) {
      bft = "4 Bft";
   }
   if (tmp >= 8.0 && tmp <= 10.7) {
      bft = "5 Bft";
   }
   if (tmp >= 10.8 && tmp <= 13.8) {
      bft = "6 Bft";
   }
   if (tmp >= 13.9 && tmp <= 17.1) {
      bft = "7 Bft";
   }
   if (tmp >= 17.2 && tmp <= 20.7) {
      bft = "8 Bft";
   }
   if (tmp >= 20.8 && tmp <= 24.4) {
      bft = "9 Bft";
   }
   if (tmp >= 24.5 && tmp <= 28.4) {
      bft = "10 Bft";
   }
   if (tmp >= 28.5 && tmp <= 32.6) {
      bft = "11 Bft";
   }
   if (tmp >= 32.7) {
      bft = "12 Bft";
   }
   return bft
}
