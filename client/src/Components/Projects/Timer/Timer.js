import React from "react"

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            counterOn: false,
            breakOn: false,
            curDisplay: 25,
            curType: 'Session',
            curSecondes: 0,
            curMinutes: 25
        }
        this.incrementBreak = this.incrementBreak.bind(this);
        this.incrementSession = this.incrementSession.bind(this);
        this.decrementBreak = this.decrementBreak.bind(this);
        this.decrementSession = this.decrementSession.bind(this);
        this.resetSession = this.resetSession.bind(this);
        this.handleOnOff = this.handleOnOff.bind(this);
        this.timer = this.timer.bind(this);
        this.audio = React.createRef();
    }

    timer() {
        const {breakLength, sessionLength, curSecondes, curMinutes, curType} = this.state;
        let newSecondes;
        let newMinutes;
        let newTypes;
        if (curSecondes === 0) {
            newSecondes = 59;
            if (curMinutes === 0) {
                this.audio.current.play();
                newTypes = curType === 'Session' ? 'Break' : 'Session';
                newMinutes = curType === 'Session' ? breakLength - 1 : sessionLength - 1;
            } else {
                newTypes = curType;
                newMinutes = curMinutes - 1;
            }
        } else {
            newSecondes = curSecondes - 1;
            newMinutes = curMinutes;
            newTypes = curType;
        }
        this.setState({
            curType: newTypes,
            curSecondes: newSecondes,
            curMinutes: newMinutes
        })
    }

    incrementBreak() {
        const {breakLength} = this.state;
        this.setState({
            breakLength: breakLength + 1 > 60 ? breakLength : breakLength + 1,
        })
    }

    incrementSession() {
        const {sessionLength} = this.state;
        let newSessionLength = sessionLength + 1 > 60 ? sessionLength : sessionLength + 1;
        this.setState({
            sessionLength: newSessionLength,
            curMinutes: newSessionLength
        })
    }

    decrementBreak() {
        const {breakLength} = this.state;
        this.setState({
            breakLength: breakLength - 1 < 1 ? breakLength : breakLength - 1
        })
    }

    decrementSession() {
        const {sessionLength} = this.state;
        let newSessionLength = sessionLength - 1 < 1 ? sessionLength : sessionLength - 1;
        this.setState({
            sessionLength: newSessionLength,
            curMinutes: newSessionLength
        })
    }

    resetSession() {
        clearInterval(this.interval);
        if (!this.audio.current.paused) {
            this.audio.current.pause();
            this.audio.current.currentTime = 0;
        }
        this.setState({
            breakLength: 5,
            sessionLength: 25,
            counterOn: false,
            curDisplay: 25,
            curType: 'Session',
            curSecondes: 0,
            curMinutes: 25
        })
    }

    handleOnOff() {
        const {counterOn, curDisplay} = this.state;
        this.setState({
            counterOn: !counterOn
        })
        if (counterOn) {
            clearInterval(this.interval)
        } else {
            this.interval = setInterval(this.timer, 1000)
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const newMinutes = this.state.curMinutes.toString().length < 2 ? "0".concat(this.state.curMinutes.toString()) : this.state.curMinutes.toString();
        const newSecondes = this.state.curSecondes.toString().length < 2 ? "0".concat(this.state.curSecondes.toString()) : this.state.curSecondes.toString();
        return (
            <div id="timer" className="project">
                {/*<div className="page-container">*/}
                <h1> TIMER </h1>
                <div className="body">
                    <section className="display">
                        <h2>{this.state.curType}</h2>
                        <div className="screen">
                            {newMinutes}:{newSecondes}
                        </div>
                        <div className="display-footer">
                            {this.state.counterOn ?
                                <span onClick={this.handleOnOff}>&#61;</span>
                                :
                                <span onClick={this.handleOnOff}>⟳</span>}
                            <span className="reset" onClick={this.resetSession}>
                                &#10226;
                            </span>
                        </div>
                    </section>
                    <section className="setting break">
                        <h3>Break Length</h3>
                        <div className="setting-footer">
                            <span className="sign" onClick={this.decrementBreak}>
                                &#8249;
                            </span>
                            <em className="value">
                                {this.state.breakLength}
                            </em>
                            <span className="sign" onClick={this.incrementBreak}>
                                &#8250;
                            </span>
                        </div>
                    </section>
                    <section className="setting session">
                        <h3>Session Length</h3>
                        <div className="setting-footer">
                            <span className="sign" onClick={this.decrementSession}>
                                &#8249;
                            </span>
                            <em className="value">
                                {this.state.sessionLength}
                            </em>
                            <span className="sign" onClick={this.incrementSession}>
                                &#8250;
                            </span>
                        </div>
                    </section>
                </div>
                <audio id="beep"
                       preload="auto"
                       src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                       ref={this.audio}/>
            </div>
        );
    }
}

export default Timer;
