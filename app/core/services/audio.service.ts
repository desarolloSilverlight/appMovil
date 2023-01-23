import {Injectable, EventEmitter} from '@angular/core'
import {TNSPlayer} from 'nativescript-audio-player';

@Injectable()

export class AudioService {
  public _player: TNSPlayer;
  playEvent = new EventEmitter<any>()

  constructor() {
  }

  playAudio(audioFilePath): Promise<boolean> {
    this._player = new TNSPlayer();
    return new Promise<boolean>((resolve, reject) => {
      this._player.initFromFile({
        audioFile: audioFilePath,
        loop: false,
      }).then(() => {
        this._player.play();
        this.playEvent.emit('playing audio');
        return resolve(true);
      }).catch(e => {
        reject(e);
      })
    })

  }

  pausePlayer() {
    try {
      this.playEvent.emit(false);
      this._player.pause()
    } catch (e) {
      console.log(e);
    }

  }

  isAudioPlaying() {
    if (this._player) {
      return this._player.isAudioPlaying();
    } else {
      return false;
    }

  }

  play() {
    try {
      this.playEvent.emit(true)
      this._player.play();
    } catch (e) {
      console.log(e);
    }

  }
}
