import React, {Component} from 'react'

import Carousel from './Carousel'

class History extends Component {

	componentWillMount() {
		const { translations: { fact1, fact2, fact3, fact4, fact5 } } = this.props

		this.slides = [
			{ key: 1989, text: fact1, image: 'static/images/1989.jpg' },
			{ key: 1995, text: fact2, image: 'static/images/1989.jpg' },
			{ key: 2001, text: fact3, image: 'static/images/1989.jpg' },
			{ key: 2006, text: fact4, image: 'static/images/1989.jpg' },
			{ key: 2013, text: fact5, image: 'static/images/1989.jpg' },
		]
	}

	render() {
		const { translations: { heading } } = this.props

		return (
			<div className={`History`}>
				<h2 className="heading">{heading}</h2>
				<Carousel slides={this.slides} hasCounter="1" />
			</div>
		)
	}
}

export default History