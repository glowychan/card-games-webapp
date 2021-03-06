function createArchiveElement(archive){
	return `
	      <tr>
	        <td>${archive.gamename}</td>
	        <td>${archive.player1_username}</td>
	        <td>${archive.player2_username}</td>
	        <td>${archive.p1_finalscore}</td>
	        <td>${archive.p2_finalscore}</td>
	      </tr>`
}

const renderArchive = (data) => {
	const games = data.map(createArchiveElement)
	const html = games.reverse().join('')
	$('#archives').append(html)
}

const loadArchive = () => {
	$.get(`/profile/${ App.userId }/json`, function(data){
		renderArchive(data)
	})
}

function createGameLinkElement(gameLink){
	return `
		<div id="game-link">
	    <a href="#">GAME LINK!</a>
	  </div>`
}

const renderGameLinks = (link) => {
	const links = data.map(createGameLinkElement)
	const html = links.reverse().join('')
	$('#game-link').append(html)
}

const loadLinks = () => {
	$.get(`/profile/${ App.userId }/json`, function(links){
		renderGameLinks(links)
	})
}

$(function(){
  loadArchive()
})