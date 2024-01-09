import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM a86syed.User WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMovies', (req, res) => {
	let sql = "SELECT * FROM movies";
	let connection = mysql.createConnection(config); 

	connection.query(sql, (error, results) => { 
		if (error) { 
			return console.error(error.message);
		}
		res.send({express : JSON.stringify(results)});
	});
	connection.end();
});

app.post('/api/addReview', (req, res) => {
	let userID = req.body.userID;
    let movieID = req.body.movieID;
    let reviewTitle = req.body.reviewTitle;
    let reviewContent = req.body.reviewContent;
    let reviewScore = req.body.reviewScore;

    let sql = `INSERT INTO a86syed.Review(userID, movieID, reviewTitle, reviewContent, reviewScore) VALUES (${userID}, ${movieID}, "${reviewTitle}", "${reviewContent}", ${reviewScore});`
    let connection = mysql.createConnection(config);

    connection.query(sql, (error, results) => {
        if (error) {
            res.send(error);
        }
        res.send({express: JSON.stringify(results)});
    });
    connection.end();
});

app.post('/api/findMovie', (req, res) => {
	let connection = mysql.createConnection(config);
	let movieSearchTerm = req.body.movieSearchTerm;
	let actorSearchTerm = req.body.actorSearchTerm;
	let directorSearchTerm = req.body.directorSearchTerm;

	let sql = `SELECT DISTINCT m.name AS movie_name, CONCAT(d.first_name, \' \', d.last_name) AS director_name, r.reviewContent AS review_content, r.reviewScore AS review_score
				FROM movies AS m
				INNER JOIN movies_directors AS md ON m.id = md.movie_id
				INNER JOIN directors AS d ON md.director_id = d.id
				INNER JOIN roles AS ro ON m.id = ro.movie_id
				INNER JOIN actors AS a ON ro.actor_id = a.id
				LEFT JOIN Review AS r ON m.id = r.movieID`;

	let data = [];

	if (movieSearchTerm){
		sql += ` WHERE m.name = ?`;
		data.push(movieSearchTerm);
	}
	if (actorSearchTerm){
		if (data.length > 0) {
			sql += ' AND CONCAT(a.first_name, \' \', a.last_name) = ?';
		} 
		else {
			sql += ` WHERE CONCAT(a.first_name, \' \', a.last_name) = ?`;
		}
		data.push(actorSearchTerm);
	}
	if (directorSearchTerm){
		if (data.length > 0) {
			sql += ' AND CONCAT(d.first_name, \' \', d.last_name) = ?';
		}
		else {
			sql += ` WHERE CONCAT(d.first_name, \' \', d.last_name) = ?`;
		}
		data.push(directorSearchTerm );
	}

	sql += ';';

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();

});

app.post('/api/addEntry', (req, res) => {
    let movie_name = req.body.movie_name;
    let director_name = req.body.director_name;
    let genre = req.body.genre;

    let sql = `INSERT INTO a86syed.watch_list(movie_name, director_name, genre) VALUES ("${movie_name}", "${director_name}", "${genre}");`
    let connection = mysql.createConnection(config);

    connection.query(sql, (error, results) => {
        if (error) {
            res.send(error);
        }
        res.send({express: JSON.stringify(results)});
    });
    connection.end();
});

app.post('/api/getDirectors', (req, res) => {
	let sql = "SELECT DISTINCT director_name FROM watch_list";
	let connection = mysql.createConnection(config); 

	connection.query(sql, (error, results) => { 
		if (error) { 
			return console.error(error.message);
		}
		res.send({express : JSON.stringify(results)});
	});
	connection.end();
});

app.post('/api/toggleList', (req, res) => {
	let connection = mysql.createConnection(config);
    let director_name = req.body.director_name;
    let genre = req.body.genre;

	let sql = `SELECT movie_name, director_name FROM watch_list`;

	let data = [];

	if (director_name){
		sql += ` WHERE director_name = ?`;
		data.push(director_name);
	}
	if (genre){
		if (data.length > 0) {
			sql += ' AND genre = ?';
		} 
		else {
			sql += ` WHERE genre = ?`;
		}
		data.push(genre);
	}

	sql += ';';

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();

});

app.listen(port, () => console.log(`Listening on port ${port}`));