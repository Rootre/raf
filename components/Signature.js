import React, { Component } from 'react'

import Carousel from './Carousel'

class Signature extends Component {

	render() {
		let { heading, translations: { carousel1, carousel2, carousel3, carousel4 } } = this.props
		let slides = [
			{ key: carousel1.key, text: carousel1.text, image: 'static/images/signature/ozweego.jpg', responsive: {
				mobile: 'static/images/signature/ozweego_m.jpg',
				tablet: 'static/images/signature/ozweego_t.jpg',
				desktop: 'static/images/signature/ozweego_d.jpg',
			} },
			{ key: carousel2.key, text: carousel2.text, image: 'static/images/signature/bunny.jpg', responsive: {
				mobile: 'static/images/signature/bunny_m.jpg',
				tablet: 'static/images/signature/bunny_t.jpg',
				desktop: 'static/images/signature/bunny_d.jpg',
			} },
			{ key: carousel3.key, text: carousel3.text, image: 'static/images/signature/perry.jpg', responsive: {
				mobile: 'static/images/signature/perry_m.jpg',
			} },
			{ key: carousel4.key, text: carousel4.text, image: 'static/images/signature/boots.jpg', responsive: {
				mobile: 'static/images/signature/boots_m.jpg',
			} },
		]

		return (
			<div className={`Signature`}>
				<h2 className="animate-heading">{heading}</h2>
				<div className="animate-content">
					<Carousel slides={slides} reversed={true} />
				</div>
			</div>
		)
	}
}

export default Signature