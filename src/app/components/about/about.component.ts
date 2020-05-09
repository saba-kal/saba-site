import { Component } from '@angular/core';

@Component({
	selector: 'about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent {

	skills: string[] = [
		'C#', '.NET', 'JavaScript', 'TypeScript', 'Angular 2+', 'PostgreSQL', 'HTML', 'CSS', 'Unity',
	];

	experiences: Experience[] = [
		{
			company: 'TherapyNotes LLC',
			role: 'Software Developer Co-op',
			date: 'Sep. 2018 - Present',
			description: [
				`Worked in a team to support, maintain, and develop new features for 
				TherapyNotes: an online EHR, practice management, and billing software 
				designed for mental health professionals.`,
				`Researched and documented the technology behind various features of 
				TherapyNotes to aid in implementing new features.`,
				`Developed an internal web application for managing application 
				configuration settings in different environments using Angular 7, 
				.NET Core 2, and Windows Authentication.`
			]
		},
		{
			company: 'Maxeta Technologies',
			role: 'Software Engineer Co-op',
			date: 'Sep. 2017 - Mar. 2018',
			description: [
				`Developed modern web applications using Angular, Ext JS, and .NET Core 2`,
				`Designed and implemented automated testing using TestComplete`,
				`Researched and developed emerging technologies such as Angular 6, Entity 
				Framework, and Unit of Work design patterns`
			]
		}
	];
}

interface Experience {
	company: string,
	role: string,
	date: string,
	description: string[]
}