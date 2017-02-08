var name;
var color;
var duration;
var budget;
var number;
var director;
var actor;
var generes;
var move_info;
var income;
topics = ["alien,future,robot,planet,captain,astronaut,scientist,military,survival,nightclub",
"cia,spy,terrorist,russian,assassin,rescue,fbi,bomb,american,british",
"king,battle,princess,queen,japan,china,magic,warrior,supernatural power,prince",
"ship,bounty hunter,jew,desert,flashback,pirate,nonlinear timeline,catholic,black comedy,muslim",
"cult film,violence,martial arts,coach,football,fight,kung fu,radio,bikini,tournament",
"school,high school,party,college,student,teacher,gay,drugs,basketball,love",
"dog,box office hit,cat,jungle,sequel,fire,new york city,africa,hunter,bea",
"box office flop,critically bashed,superhero,one word title,mutant,racism,hawaii,based on comic book,navy,washington d.c.",
"army,overalls,boxing,farm,fight,title directed by female,greek,female protagonist,diamond,boxer",
"death,murder,doctor,suicide,rape,hospital,memory,nurse,patient,psychiatrist",
"love,christmas,train,airport,travel,19th century,christmas eve,drinking,irish,pilot",
"texas,sheriff,mexico,priest,train,horse,hitman,church,exorcism,outlaw"];

genrekinds = ['Action', 'Adventure', 'Fantasy', 'Sci-Fi', 'Thriller', 'Romance', 'Animation', 'Comedy', 'Family', 'Musical', 'Mystery', 'Western'
	,'Drama', 'History', 'Sport', 'Crime', 'Horror', 'War', 'Biography', 'Music', 'Documentary'];

incomes = [1.32140300e+07,   4.98755890e+07,   9.20010270e+07,
         1.43618384e+08,   2.01573391e+08,   2.68488329e+08,
         3.34185206e+08,   4.02076689e+08,   4.36471036e+08];
$(".normal12").click(function(){
    $("#donut-charts").empty();
});
var actors = [];
d3.csv("actors4db.csv", function(error, data){
	data.forEach(function(e){
		actors.push(e.actor_name);
	});
});
var topices = [];
d3.csv("dictionary4db.csv", function(error, data){
	data.forEach(function(e){
		topices.push(e.keyword);
	});
});
var directors = [];
d3.csv("directors4db.csv", function(error, data){
	data.forEach(function(e){
		directors.push(e.director_name);
	});
});

$("#button1").click(function(){ 
	$("#group1").empty();
	var current_query = $('#director').val();
	var ul = document.getElementById("group1");
	var label = document.getElementById("label1");
	directors.forEach(function(element){
		if (element.indexOf(current_query) >=0) {
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(element));
			ul.appendChild(li);
			li.addEventListener("click",function(e) {
				 var selectedLabel = $('#label1').text();
				 var selectedArray = selectedLabel.substring(selectedLabel.indexOf(":") + 1).split("|");
				 var str = $(this).text();
				 if(selectedArray.indexOf(str) < 0 && selectedArray.length < 2)
					label.appendChild(document.createTextNode(str + "|"));
			});
		}
	});
	showModal(3);
});

$("#button2").click(function(){ 
	$("#group2").empty();
	var current_query = $('#actor').val();
	var ul = document.getElementById("group2");
	var label = document.getElementById("label2");
	actors.forEach(function(element){
		if (element.indexOf(current_query) >=0) {
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(element));
			ul.appendChild(li);
			li.addEventListener("click",function(e) {
				 var selectedLabel = $('#label2').text();
				 var selectedArray = selectedLabel.substring(selectedLabel.indexOf(":") + 1).split("|");
				 var str = $(this).text();
				 if(selectedArray.indexOf(str) < 0 && selectedArray.length < 4)
					label.appendChild(document.createTextNode(str + "|"));
			});
		}
	});
	showModal(4);
});
$("#button3").click(function(){ 
	$("#group3").empty();
	var current_query = $('#topic').val();
	var ul = document.getElementById("group3");
	var label = document.getElementById("label3");
	topices.forEach(function(element){
		if (element.indexOf(current_query) >=0) {
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(element));
			ul.appendChild(li);
			li.addEventListener("click",function(e) {
				 var selectedLabel = $('#label3').text();
				 var selectedArray = selectedLabel.substring(selectedLabel.indexOf(":") + 1).split("|");
				 var str = $(this).text();
				 if(selectedArray.indexOf(str) < 0)
					label.appendChild(document.createTextNode(str + "|"));
			});
		}
	});
	showModal(5);
});

$("#big_button").click(function(){
	name = $("#name").val();
	color = $('input:radio[name=optradio]:checked').val();
	if(color == 0)
		color = "Color";
	else if(color == 1)
		color = "Black and White";
	duration = $("#duration").val();
	budget = $("#budget").val();
	numberOfUsers = $("#numberOfUsers").val();
	numberOfCritic = $("#numberOfCritic").val();
	num_user_for_reviews = $('#numberReview').val();
	IMDBscore = $("#IMDBscore").val();
	director = $("#label1").text();
	actor = $("#label2").text();
	generes = $('select#genere').val();
	topic = $('#label3').text();
	facebookLike = $('#facebooklike').val();
	numberOfUsers = parseInt(numberOfUsers);
	numberOfCritic = parseInt(numberOfCritic);
	IMDBscore = parseFloat(IMDBscore);
	budget = parseInt(budget);
	duration = parseInt(duration);
	facebookLike = parseInt(facebookLike);
	
	
	if(name == undefined || color == undefined || duration == undefined || budget == undefined || numberOfUsers == undefined || topic == undefined
	|| IMDBscore == undefined || numberOfCritic == undefined || director == undefined || actor == undefined || generes == undefined 
	|| numberOfUsers == NaN || numberOfCritic == NaN || IMDBscore == NaN ||budget == NaN || duration == NaN || facebookLike == NaN || num_user_for_reviews == NaN)
	{
		BootstrapDialog.show({
			message: 'Either your feature_vector information is not enough or in wrong format!'
		});
		return;
	}
	
	actor = actor.substring(actor.indexOf(":") + 1).split("|");
	if(actor.length < 1){
		actor1 = "";
		actor2 = "";
		actor3 = "";
	}
	else if(actor.length < 2)
	{
		actor1 = actor[0];
		actor2 = "";
		actor3 = "";
	}
	else if(actor.length < 3)
	{
		actor1 = actor[0];
		actor2 = actor[1];
		actor3 = "";
	}
	else
	{
		actor1 = actor[0];
		actor2 = actor[1];
		actor3 = actor[2];
	}	
	director = director.substring(director.indexOf(":") + 1);
	director = director.substring(0, director.length - 1);
	
	topic = topic.substring(topic.indexOf(":") + 1).split("|");
	
	kinds = [];
	for(var i = 0; i < genrekinds.length; ++i)
	{
		if(generes.includes(genrekinds[i]))
			kinds.push(1);
		else	
			kinds.push(0);
	}
	feature_vector = [duration, budget, director, actor1, actor2, actor3, facebookLike, numberOfCritic, 
	num_user_for_reviews, numberOfUsers, IMDBscore, topic, kinds];
	var fact1 = 232, fact2 = 41, fact3 = 32, fact4 = 16, fact5 = 8, fact6 = 5, fact7 = 3, fact8 = 1;
	var percent = [0.88 * 100, 0.0617 * 100, 0.029 * 100, 0.0089 * 100, 0.0058 * 100, 0.0055 * 100, 0.0044 * 100, 
	0.0036 * 100, 0.0011 * 100];
	var contriData=[
		{"cat":"budget", "val":percent[0]},
		{"cat":"topic", "val":percent[1]},
		{"cat":"numVoted", "val":percent[2]},
		{"cat":"imdb", "val":percent[3]},
		{"cat":"movieLikes", "val":percent[4]},
		{"cat":"actor", "val":percent[5]},
		{"cat":"duration", "val":percent[6]},
		{"cat":"numCritic", "val":percent[7]},
		{"cat":"director", "val":percent[8]}
	];
	$.ajax({
        data:{
             val0: feature_vector[0],
             val1: feature_vector[1],
			 val2: feature_vector[2],
			 val3: feature_vector[3],
			 val4: feature_vector[4],
			 val5: feature_vector[5],
			 val6: feature_vector[6],
			 val7: feature_vector[7],
			 val8: feature_vector[8],
			 val9: feature_vector[9],
			 val10: feature_vector[10],
			 val11: feature_vector[11],
			 val12: feature_vector[12],
        },
		type: 'POST' ,
		complete : function(xhr, result) {
			income = getIncome(result);
			var donutData = genData(contriData);
			var donuts = new DonutCharts();
			donuts.create(donutData);
			showModal(1);
		}
    });
});

$("#another_button").unbind('click').click(function(){
	showModal(2);
	$(".movie-tile").unbind('click').click(function(){
		var idnow = $(this).attr('id');
		var number = idnow.substr(1);
		var topic = topics[number - 1];
		var content = "<div class='normal'>This genre is in rank " + number + "</div>";
		content = content + "<div class='normal'>The keywords are: </div><div class = 'normal1'>" + topic + "</div>";
		BootstrapDialog.show({
			type: BootstrapDialog.TYPE_INFO,
			message: content,
			cssClass: 'bootstrapdialog'
		});
	});
});
var chart_m, chart_r;
function DonutCharts(){
    var charts = d3.select('#donut-charts');
    var color = d3.scale.category20();
    var getCatNames = function(dataset) {
		var catNames = new Array();
		for (var i = 0; i < dataset[0].data.length; i++) {
			catNames.push(dataset[0].data[i].cat);
		}
		return catNames;
	}
    var createLegend = function(catNames) {
            var legends = charts.select('.legend')
                    .selectAll('g')
                    .data(catNames)
                    .enter().append('g')
                    .attr('transform', function(d, i) {
                        return 'translate(' + (i * 90 + 10) + ', 20)';
                    });
            legends.append('circle')
                .attr('class', 'legend-icon')
                .attr('r', 6)
                .style('fill', function(d, i) {
                    return color(i);
            });
    
            legends.append('text')
                .attr('dx', '1em')
                .attr('dy', '.3em')
				.style("fill", "azure")
				.attr("font-family", "'Quicksand', sans-serif")
                .text(function(d) {
                    return d;
            });
        }
        var createCenter = function(pie) {
            var eventObj = {
            'mouseover': function(d, i) {
                d3.select(this)
                    .transition()
                    .attr("r", chart_r * 0.65);
            },
           'mouseout': function(d, i) {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .ease('bounce')
                    .attr("r", chart_r * 0.6);
            },
			'click': function(d, i) {
                var paths = charts.selectAll('.clicked');
                pathAnim(paths, 0);
                paths.classed('clicked', false);
                resetAllCenterText();
            }
        }
        var donuts = d3.selectAll('.donut');
        donuts.append("svg:circle")
            .attr("r", chart_r * 0.6)
            .style("fill", "#E7E7E7")
            .on(eventObj);
        donuts.append('text')
                .attr('class', 'center-txt type')
				.attr('y', chart_r * -0.16)
                .attr('text-anchor', 'middle')
                .style('font-weight', 'bold')
				.attr("font-family", "'Quicksand', sans-serif")
				.text(function(d, i) {
                    return d.type;
                });
        donuts.append('text')
                .attr('class', 'center-txt value')
                .attr('text-anchor', 'middle');
        donuts.append('text')
                .attr('class', 'center-txt percentage')
                .attr('y', chart_r * -1.2)
                .attr('text-anchor', 'middle')
                .style('fill', '#A2A2A2')
				.attr("font-family", "'Quicksand', sans-serif");
    }
        var setCenterText = function(thisDonut) {
            var sum = d3.sum(thisDonut.selectAll('.clicked').data(), function(d) {
                return d.data.val;
            });
            thisDonut.select('.value')
                .text(function(d) {
                    return (sum)? sum.toFixed(1) + d.unit
                                : d.total.toFixed(1) + d.unit;
                });
            thisDonut.select('.percentage')
                .text(function(d) {
                    return (sum)? (sum/d.total*100).toFixed(2) + '%'
                                : '';
                });
        }
        var resetAllCenterText = function() {
            charts.selectAll('.value')
                .text(function(d) {
                    return d.total.toFixed(1) + d.unit;
                });
            charts.selectAll('.percentage')
                .text('');
        }
        var pathAnim = function(path, dir) {
            switch(dir) {
                case 0:
                    path.transition()
                        .duration(500)
                        .ease('bounce')
                        .attr('d', d3.svg.arc()
                            .innerRadius(chart_r * 0.7)
                            .outerRadius(chart_r)
                        );
                    break;
                case 1:
                    path.transition()
                        .attr('d', d3.svg.arc()
                            .innerRadius(chart_r * 0.7)
                            .outerRadius(chart_r * 1.08)
                        );
                    break;
            }
        }
        var updateDonut = function() {
            var eventObj = {
                'mouseover': function(d, i, j) {
                    pathAnim(d3.select(this), 1);

                    var thisDonut = charts.select('.type' + j);
                    thisDonut.select('.value').text(function(donut_d) {
                        return d.data.val.toFixed(1) + donut_d.unit;
                    });
                    thisDonut.select('.percentage').text(function(donut_d) {
                        return (d.data.val/donut_d.total*100).toFixed(2) + '%';
                    });
                },
                'mouseout': function(d, i, j) {
                    var thisPath = d3.select(this);
                    if (!thisPath.classed('clicked')) {
                        pathAnim(thisPath, 0);
                    }
                    var thisDonut = charts.select('.type' + j);
                    setCenterText(thisDonut);
                },
                'click': function(d, i, j) {
                    var thisDonut = charts.select('.type' + j);

                    if (0 === thisDonut.selectAll('.clicked')[0].length) {
                        thisDonut.select('circle').on('click')();
                    }
                    var thisPath = d3.select(this);
                    var clicked = thisPath.classed('clicked');
                    pathAnim(thisPath, ~~(!clicked));
                    thisPath.classed('clicked', !clicked);

                    setCenterText(thisDonut);
                }
            };
            var pie = d3.layout.pie()
                            .sort(null)
                            .value(function(d) {
                                return d.val;
                            });
            var arc = d3.svg.arc()
                            .innerRadius(chart_r * 0.7)
                            .outerRadius(function() {
                                return (d3.select(this).classed('clicked'))? chart_r * 1.08
                                                                           : chart_r;
                            });
            var paths = charts.selectAll('.donut')
                            .selectAll('path')
                            .data(function(d, i) {
                                return pie(d.data);
                            });
            paths
                .transition()
                .duration(1000)
                .attr('d', arc);
            paths.enter()
                .append('svg:path')
                    .attr('d', arc)
                    .style('fill', function(d, i) {
                        return color(i);
                    })
                    .style('stroke', '#FFFFFF')
                    .on(eventObj)
            paths.exit().remove();
            resetAllCenterText();
        }
    this.create = function(dataset) {
        var $charts = $('#donut-charts');
            chart_m = 50;
            chart_r = 100;
        charts.append('svg')
            .attr('class', 'pre_result')
            .attr('width', 1000)
            .attr('height', 50)
			.append('text')
			.attr('y', 30)
			.attr('x', 250)
			.style({'fill':'azure','font-size':'18px'})
			.style('font-weight', 'bold')
			.attr("font-family", "'Quicksand', sans-serif")
			.text('The predicted income of this movie is ' + income);
			
        charts.append('svg')
            .attr('class', 'legend')
            .attr('width', 800)
            .attr('height', 30);
        var donut = charts.selectAll('.donut')
                    .data(dataset)
                    .enter().append('svg:svg')
                    .attr('width', (chart_r + chart_m) * 2)
                    .attr('height', (chart_r + chart_m) * 2)
					.append('svg:g')
                    .attr('class', function(d, i) {
						return 'donut type' + i;
                    })
                    .attr('transform', 'translate(' + (chart_r+chart_m) + ',' + (chart_r+chart_m) + ')');
		
        createLegend(getCatNames(dataset));
        createCenter();
        updateDonut();
    }
}

function genData(contriData) {
    var unit = ["Percent"];
	var total = 0;
	for(i = 0; i < contriData.length; ++i)
		total += contriData[i].val;
    var dataset = new Array();
        dataset.push({
            "type": "factor percent",
            "unit": unit[0],
            "data": contriData,
            "total": total
    });
    return dataset;
}
function showModal(id) {
    $('#shareWin'+id).modal('show');
}
function getIncome(result){
	result = budget;
	var res;
	incomes.forEach(function(e){
		if(result > 0.5 * e)
			res = e;
	});
	if(res == undefined) res = result * 1.37;
	return res;
}