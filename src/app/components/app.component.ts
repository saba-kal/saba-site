import { Component, Inject } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'personal-site';
	faGithub = faGithub;
}
