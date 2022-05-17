proxy = 'http://3.87.187.229:5000';

async function checkLogin() {
    var name = localStorage.getItem('name');
    //let password = localStorage.getItem('password');
    //let isAdmin = localStorage.getItem('isAdmin');

    var body = document.getElementById("body");
    body.style.display = 'none';
    url = proxy + '/login'
    var token = document.getElementById("token");
    if (typeof token === "undefined") {
        window.location.href = 'Login.html';
    } else {
        //
        body.style.display = 'block';
        displayTweetForAnnotate();
    }
}

async function displayTweetForAnnotate() {
    //document.getElementById("submitlabels").style.display = 'block';
    var name = localStorage.getItem('name')
    const response = await fetch(proxy + '/users/assigned-tweets?thirdAnnotator=false', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            "Authorization": 'Bearer '+localStorage.getItem("token")
        }

    })
    if (response.status === 200) {
        var data = await response.json();
        // console.log(data)
        const total_tweet =data.data.tweets.length
        // console.log(datas)
        tab_1 = ``
        for (let i=0;i<total_tweet;i++){
            console.log(i,data.data.tweets[i].tweet_id)
			console.log(data.data.tweets[i].tweet_id in data.data.tweets[i].finalAnnotation)
			if ((data.data.tweets[i].tweet_id in data.data.tweets[i].finalAnnotation)===true ){
				
				console.log(data.data.tweets[i].finalAnnotation[data.data.tweets[i].tweet_id])
				if (data.data.tweets[i].finalAnnotation[data.data.tweets[i].tweet_id] === "HOF") {
                    innerhtml = `<h4><span class="badge badge-danger">HOF</span></h4>`
               } else {
					innerhtml = `<h4><span class="badge badge-success">NOT</span></h4>`
                }
                tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-primary " >
            <span class="w-90" id="main_tweet" >${data.data.tweets[i].tweet}</span><div class="btn-group" data-toggle="buttons">` + innerhtml + `</div></li>`
             
            for (comm_key in data.data.tweets[i].comments) {
                if ((data.data.tweets[i].comments[comm_key].tweet_id in data.data.tweets[i].annotations)===true ){
				
                    if (data.data.tweets[i].annotations[data.data.tweets[i].comments[comm_key].tweet_id].hasOwnProperty(name)===true){
                      console.log(data.data.tweets[i].annotations[data.data.tweets[i].comments[comm_key].tweet_id][name])
                      if (data.data.tweets[i].annotations[data.data.tweets[i].comments[comm_key].tweet_id][name] === "SHOF") {
                        innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i>
                        <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="CHOF">
                        CHOF
                      </label>
                        <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="SHOF" checked>
                        SHOF
                      </label>
                          <label class="btn btn-success form-check-label">
                        <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="NONE"> NONE
                      </label>`
                    } else if (data.data.tweets[i].annotations[data.data.tweets[i].comments[comm_key].tweet_id][name] === "CHOF") {
                      innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i>
                        <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="CHOF" checked>
                        CHOF
                      </label>
                        <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="SHOF" >
                        SHOF
                      </label>
                          <label class="btn btn-success form-check-label">
                        <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="NONE"> NONE
                      </label>`
                    }
                      else{
                        innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i>
                        <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="CHOF">
                        CHOF
                      </label>
                        <label class="btn btn-danger form-check-label mr-3">
                        <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="SHOF">
                        SHOF
                      </label>
                          <label class="btn btn-success form-check-label">
                        <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="NONE" checked> NONE
                      </label>`
                    }
                    tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-success" >
                    <span class="w-90" id="main_tweet" >${data.data.tweets[i].comments[comm_key].tweet}</span><div class="btn-group" data-toggle="buttons">` + innerhtml + `</div></li> `
                  }
                  else{
                  tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-success">
            <span class="w-90" id="main_tweet" >${data.data.tweets[i].comments[comm_key].tweet}</span>
            <div class="btn-group" data-toggle="buttons">
            <label class="btn btn-danger form-check-label mr-3">
                  <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="CHOF">
                  CHOF
                </label>    
            <label class="btn btn-danger form-check-label mr-3">
              <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="SHOF">
              SHOF
            </label>
                <label class="btn btn-success form-check-label">
              <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="NONE"> NONE
            </label>
            </div>
         </li>`}
                    
                } 
                else {
                    tab_1 += `<li class="list-group-item d-flex justify-content-between align-items-center input-group-prepend list-group-item-success">
                <span class="w-90" id="main_tweet" >${data.data.tweets[i].comments[comm_key].tweet}</span>
                <div class="btn-group" data-toggle="buttons">
                <label class="btn btn-danger form-check-label mr-3">
                  <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="CHOF">
                  CHOF
                </label>
                    <label class="btn btn-danger form-check-label mr-3">
                  <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="SHOF">
                  SHOF
                </label>
                    <label class="btn btn-success form-check-label">
                  <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${data.data.tweets[i].comments[comm_key].tweet_id}" value="NONE"> NONE
                </label>
                </div>
             </li>`
                }        

         }
         
        }
        tab_1+=`<br/>`
        
    }
         document.getElementById("main_tweet_comments").innerHTML = tab_1;
}}
        // document.getElementById('top_tweet').innerHTML = tab_1;

function logout() {
    localStorage.clear();
    window.location.href = 'Login.html';
}


async function addLabel(id,tid, label) {
    console.log(id + ' ' + label)
    $.ajax({
        type: 'POST',
        url: proxy + '/tweets/submit',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem("token"),
            'Content-type': 'application/json'
        },
        data: JSON.stringify({
				"main_tweet_id": id,
				"tweet_id": tid,
				"label": label
			}),
        async: true,
        success: function(response) {
            myparent = $('[name=' + id + ']').parent().parent();
            //console.log(myparent)
            if (label == "SHOF") {
              innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i> <label class="btn btn-danger form-check-label mr-3">
          <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${id}" value="SHOF" checked>
          SHOF
        </label>
        <label class="btn btn-danger form-check-label mr-3">
          <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${id}" value="CHOF">
          CHOF
        </label>
            <label class="btn btn-success form-check-label">
          <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${id}" value="NONE"> NONE
        </label>`
          } else if (label == "CHOF"){
            innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i> <label class="btn btn-danger form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${id}" value="SHOF" >
            SHOF
          </label>
          <label class="btn btn-danger form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${id}" value="CHOF" checked>
            CHOF
          </label>
              <label class="btn btn-success form-check-label">
            <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${id}" value="NONE"> NONE
          </label>`
          }
          else{
            innerhtml = `<i class="mr-3 fa fa-check" aria-hidden="true"></i> <label class="btn btn-danger form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${id}" value="SHOF" >
            SHOF
          </label>
          <label class="btn btn-danger form-check-label mr-3">
            <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${id}" value="CHOF" >
            CHOF
          </label>
              <label class="btn btn-success form-check-label">
            <input class="form-check-input" onchange="addLabel(this.name,this.name,this.value)" type="radio" name="${id}" value="NONE" checked> NONE
          </label>`
          }
            myparent.html(innerhtml)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('error');
        }
    });
}  
