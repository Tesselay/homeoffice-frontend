import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../environments/env';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.fetchPosts();
	}

	private fetchPosts() {
		this.http.get(`${env.apiUrl}/greeting`).subscribe(posts => {
			console.log(posts);
		})
	}

}
