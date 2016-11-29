var gitform = $('#gitform'),
	gitinput = $('#gitinput'),
	gitsubmit = $('#gitsubmit');

gitform.submit(function(e){
	e.preventDefault();
	var gitId = gitinput.val();

	$.getJSON( "https://api.github.com/users/" + gitId)
	.done(function(data) {
		var fullname   = data.name,
			username   = data.login,
			aviurl     = data.avatar_url,
			profileurl = data.html_url,
			location   = data.location,
			followersnum = data.followers,
			followingnum = data.following,
			reposnum     = data.public_repos;
			fulltext = '<div>' + fullname + ' ' + username + ' ' + aviurl + ' ' + '</div>';

		$.getJSON( "https://api.github.com/users/" + gitId + '/repos')
		.done(function(data){
			fulltext = fulltext + '<ul>';
			console.log(fulltext);
			$.each(data, function(index){
				fulltext = fulltext + '<li>' +  data[index].name+ '</li>';
			})
			fulltext = fulltext + '</ul>'
			console.log(fulltext);
			$('#area').html(fulltext);	
		})
	})
	.fail(function() {
		$('#area').html('No data found');
	});

	gitform[0].reset();
	gitinput.blur();

	gitsubmit.addClass("focus").delay(200).queue(function(next){
		$(this).removeClass("focus");
		next();
	});
});