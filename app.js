const express = require('express')
const app = express()
const PORT = 5500;

//handle default get request
app.get('/', (req, res) => {
	res.json({
		message: 'We Are Anarchy'
	})
})

// handle info get request
app.get('/api', (req, res) => {
	// get query parameters
	const { slack_name, track } = req.query;

	// check given query parameters 
	if (!slack_name || !track) {
		return res.status(400).json({
			error: 'Please provide a valid slack_name and track'
		})
	}

	// get the information needed in the response
	const current_day = new Date().toLocaleString('en-US', { weekday: 'long' })
	const utc_time = new Date().toISOString().slice(0, 19) + 'Z'
	const githubFileUrl = 'https://github.com/IamKingVictor/Hng-Stage-1/blob/main/app.js'
	const githubRepoUrl = 'https://github.com/IamKingVictor/Hng-Stage-1.git'
	// send json response
	res.status(200).json({
		slack_name,
		current_day,
		utc_time,
		track,
		github_file_url: githubFileUrl,
		github_repo_url: githubRepoUrl,
		status_code: 200
	})
})

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
})