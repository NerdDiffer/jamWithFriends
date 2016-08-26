import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import { Transport } from 'tone';
import StartStopButton from './StartStopButton';
import SampleBeats from '../../instruments/beats/jamRoom';

const Beats = {
  start: () => SampleBeats.forEach(beat => beat.start()),
  stop: () => SampleBeats.forEach(beat => beat.stop())
};

class Metronome extends Component {
  constructor(props) {
    super(props);

    const bpm = 60;
    Transport.bpm.value = bpm;

    this.state = {
      bpm,
      interval: '4n' // quarter note
    };

    this.changeBPM = this.changeBPM.bind(this);
    this.toggle = this.toggle.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  start() {
    Transport.start();
    Beats.start();
  }

  stop() {
    Transport.stop();
    Beats.stop();
  }

  changeBPM(_event, value) {
    this.setState({ bpm: value });
    Transport.bpm.value = value;
  }

  toggle() {
    if (Transport.state !== 'started') {
      this.start();
    } else {
      this.stop();
    }
  }

  render() {
    const bpm = this.state.bpm;
    const changeBPM = this.changeBPM;
    const toggle = this.toggle;

    return (
      <Paper>
        <h1>Metronome</h1>
        <Slider
          defaultValue={bpm}
          description="Change the tempo"
          min={40}
          max={240}
          step={2}
          onChange={changeBPM}
          value={61}
        />
        Tempo: { bpm } bpm
        <br />
        <StartStopButton toggle={toggle} />
      </Paper>
    );
  }
}

export default Metronome;
