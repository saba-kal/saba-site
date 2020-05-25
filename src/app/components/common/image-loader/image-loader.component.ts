import { Component, Input } from '@angular/core';

@Component({
	selector: 'image-loader',
	templateUrl: './image-loader.component.html',
	styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent {

	@Input('source') source: string;
	@Input('alt') alt: string;
	@Input() loadingAnimationSrc: string = 'assets/load-masks/loading-animation.svg';

	isLoaded: boolean = false;

	onImageLoad() {
		this.isLoaded = true;
	}
}
