var gitform = $('#gitform'),
	gitinput = $('#gitinput'),
	gitsubmit = $('#gitsubmit');

gitform.submit(function(e){
	e.preventDefault();
	var gitId = gitinput.val(),
		apiUrl = "https://api.github.com/users/";

	$.getJSON(apiUrl + gitId)
	.done(function(data) {
		var fullname   = data.name,
			username   = '<a href="' + data.html_url +'">' + data.login + '</a>',
			aviurl     = '<img src="' + data.avatar_url +'" class="img-responsive circimg">',
			profileurl = data.html_url,
			location   = data.location,
			followersnum = data.followers,
			followingnum = data.following,
			reposnum     = data.public_repos;

		if(fullname == null){
			fullname = data.login;
		}
		if(followersnum == null){
			followersnum = 0;
		}	
		if(followingnum == null){
			followingnum = 0;
		}
		fulltext = aviurl + '<div> <span class="subheading">Name:</span> ' + fullname + '<br><span class="subheading">Username:</span> ' + username +  '<br><span class="subheading">Followers:</span> ' + followersnum +  '<br><span class="subheading">Following:</span> ' + followingnum + ' ' + '<br><span class="subheading">Repos:</span></div>';


		$.getJSON( apiUrl + gitId + '/repos')
		.done(function(data){
			fulltext = fulltext + '<ol class="repolist">';
			$.each(data, function(index){
				fulltext += '<li><a href="' +  data[index].html_url +'">' +data[index].name+ '</a></li>';
			})
			fulltext += '</ol>'
			console.log(fulltext);
			$('#gitarea').html(fulltext);	
			$("a").attr("target","_blank");
		});
	})
	.fail(function() {
		$('#gitarea').html('No data found');
	});

	gitform[0].reset();
	gitinput.blur();

	gitsubmit.addClass("focus").delay(200).queue(function(next){
		$(this).removeClass("focus");
		next();
	});
});

$.getJSON('https://api.bitbucket.org/2.0/repositories/jespern')
	.done(function(data){
		console.log(data)
		$.each(data, function(index){
			console.log(data.values[index]);
		})
	})