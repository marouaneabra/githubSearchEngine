$(document).ready(function(){
  $("#searchUser").on("keyup",function(e){
    let username=e.target.value;
    $.ajax({
      url:'https://api.github.com/users/'+username,
      data:{
        client_id:'332b455f7c0c92eeba05',
        client_secret:'f95f0611be01fe8fd8dfb591e0cea66f66f81b78'
      }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'332b455f7c0c92eeba05',
          client_secret:'f95f0611be01fe8fd8dfb591e0cea66f66f81b78'
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="well">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>
                </div>
              </div>
            </div>
            `);
        });
      });
      $(`#profile`).html(`
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">${user.name}</h3>
        </div>
        <div class="panel-body">
          <div class="row">
            <div class="col-md-3">
              <img class="thumbnail avatar" src="${user.avatar_url}">
              <a target="_blank" class="btn btn-primary btn-block" href="${user.html}">Profile on Github</a>
            </div>
            <div class="col-md-9">
            <span class="label label-default">Public Repos: ${user.public_repos}</span>
            <span class="label label-primary">Public Gists: ${user.public_gists}</span>
            <span class="label label-success">Followers: ${user.followers}</span>
            <span class="label label-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Website: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member since: ${user.created_at}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <h3 id="repos" class="page-header">All Repositories</h3>
      `);
    });
  });
});
