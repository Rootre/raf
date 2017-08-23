import React, {Component} from 'react'

import ReactSVG from 'react-svg'
import YouTube from 'react-youtube'

import lyrics from '../karaoke-lyrics'


if (typeof window != 'undefined' && window) {
	window.originalSetInterval=window.setInterval;
	window.originalClearInterval=window.clearInterval;
	window.activeIntervals=0;

	window.setInterval=function(func,delay)
	{
		window.activeIntervals++;
		return window.originalSetInterval(func,delay);
	};

	window.clearInterval=function(intervalID)
	{
		window.activeIntervals--;
		window.originalClearInterval(intervalID);
	};
}


class Youtube extends Component {

	constructor(props) {
		super(props)

		this.state = {
			karaoke: ''
		}
	}

	_ytStateChange(e) {
		if (this.karaokeInterval) {
			clearInterval(this.karaokeInterval)
			this.karaokeInterval = 0
		}

		if (e.data === 1 && this.karaokeInterval === 0) {
			this.karaokeInterval = setInterval(this.setCurrentKaraokeTexts.bind(this), 200)
		}
	}
	_ytReady(event) {
		const { translations: { mute, loud } } = this.props

		this.youtube = event.target

		this.youtube.playVideo()
		this.youtube.mute()

		if (this.youtube.isMuted()) {
			this.mute.innerHTML = loud
		}
		else {
			this.mute.innerHTML = mute
		}
	}

	setCurrentKaraokeTexts() {
		console.log('setCurrentKaraokeTexts', this.karaokeInterval);
		if (this.youtube) {
			let currentTime = this.youtube.getCurrentTime()

			if (currentTime) {
				this.setState(prevState => ({
					karaoke: lyrics.map((lyric, i) => {
						if (currentTime >= lyric.duration.from && lyric.duration.to >= currentTime) {
							return <span key={i} style={lyric.css} className={lyric.class}>{lyric.text}</span>
						}
					}),
				}))
			}
		}
	}

	render() {
		const { translations: { mute, loud, raf } } = this.props
		const { karaoke } = this.state

		return (
			<div className="youtube">
				<div className="mute" onClick={() => {
					if (this.youtube.isMuted()) {
						this.youtube.unMute()
						this.mute.innerHTML = mute
					}
					else {
						this.youtube.mute()
						this.mute.innerHTML = loud
					}
				}}>
					<p ref={elm => this.mute = elm}>{loud}</p>
					<ReactSVG path="static/svg/mute.svg"/>
				</div>
				<div className="video">
					<p className="title left">{raf}</p>
					<p className="title right">{raf}</p>
					<p className="karaoke">{karaoke}</p>
					<YouTube
						videoId={`_eLryuBCO-M`}
						opts={{
							height: '180',
							width: '100%',
							//https://developers.google.com/youtube/player_parameters
							playerVars: {
								autoplay: 1,
								controls: 0,
								disablekb: 1,
								iv_load_policy: 3,
								loop: 1,
								modestbranding: 1,
								showinfo: 0,
							},
						}}
						onReady={this._ytReady.bind(this)}
						onStateChange={this._ytStateChange.bind(this)}
					/>
				</div>
			</div>
		)
	}
}

export default Youtube