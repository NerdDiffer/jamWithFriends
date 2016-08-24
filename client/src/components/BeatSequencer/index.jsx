import React, { Component } from 'react';
import { Transport } from 'tone';
import Sequence from './Sequence';
import PlayStopButton from './PlayStopButton';
import AddSequenceButton from './AddSequenceButton';
import TempoSlider from './TempoSlider';
import SaveSequencesButton from './SaveSequencesButton'

/**
 * logic of:
 * - changing BPM
 * - beat grouping
 * - pass sounds to sequence
 */
class BeatSequencer extends Component {
  constructor(props) {
    super(props);

    const bpm = 120;
    Transport.bpm.value = bpm;

    this.state = {
      bpm,
      isPlaying: false,
      sequences: [<Sequence isPlaying={false} />]
    };

    this.togglePlaying = this.togglePlaying.bind(this);
    this.changeBPM = this.changeBPM.bind(this);
    this.addSequence = this.addSequence.bind(this);
    this.removeSequence = this.removeSequence.bind(this);
    this.saveSequences = this.saveSequences.bind(this);
  }

  togglePlaying() {
    this.setState({
      isPlaying: !this.state.isPlaying
    });

    if (Transport.state !== 'started') {
      Transport.start();
    } else {
      Transport.stop();
    }
  }

  changeBPM(_event, value) {
    this.setState({ bpm: value });
    Transport.bpm.value = value;
  }

  addSequence() {
    const sequences = this.state.sequences;
    const newSequence = <Sequence isPlaying={false} />;

    this.setState({
      sequences: sequences.concat([newSequence])
    });
  }

  removeSequence(index) {
    const sequences = this.state.sequences;

    const newSequences= [
      ...sequences.slice(0, index),
      ...sequences.slice(index + 1)
    ];

    this.setState({
      sequences: newSequences
    });
  }

  saveSequences() {
    const refs = this.refs;

    const save = (sequence, index) => {
      const ref = refs[`index-${index}`];
      const saved = ref.save();
      saved.index = index;
      return saved;
    };
    const serializedSequences = [];
    var i = 0;

    let serializedSequence;

    for (var key in refs) {
      serializedSequence = save(refs[key], i);
      serializedSequences.push(serializedSequence);
      i += 1;
    }

    console.log(serializedSequences);
    const body = JSON.stringify({ sequences: serializedSequences });
    //console.log(body);
    return fetch('http://localhost:3000/api/beats', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: body
    })
    .then(response => { return response.json(); console.log(response.json()); })
    .then(json => { console.log(json) })
    .catch(err => { console.error(err) });
  }

  render() {
    const removeSequence = this.removeSequence;
    const renderSequences = () => {
      const sequences = this.state.sequences;
      const isPlaying = this.state.isPlaying;

      return sequences.map((sequence, index) => {
        const removeThisSequence = removeSequence.bind(null, index);

        return (
          <Sequence
            isPlaying={isPlaying}
            key={index}
            handleClick={removeThisSequence}
            ref={`index-${index}`}
          />
        );
      });
    };

    return (
      <div className="beatSequencer">
        <div className="controls">
          <h2>Controls</h2>
          <PlayStopButton
            isPlaying={this.state.isPlaying}
            handleClick={this.togglePlaying}
          />
          <SaveSequencesButton
            handleClick={this.saveSequences}
          />
          <TempoSlider
            bpm={this.state.bpm}
            changeBPM={this.changeBPM}
          />
          Tempo: { this.state.bpm } bpm
        </div>
        <hr />
        <div className="sequences">
          <h2>Sequences</h2>
          { renderSequences() }
          <AddSequenceButton handleClick={this.addSequence} />
        </div>
      </div>
    );
  }
}

export default BeatSequencer;
