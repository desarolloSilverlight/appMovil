import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from '@angular/router';
import {RouterExtensions} from "nativescript-angular";
import Theme from "@nativescript/theme";
import {AudioService} from "~/core/services/audio.service";
import {Slider} from "ui/slider";

@Component({
  selector: "AudioPlayer",
  moduleId: module.id,
  templateUrl: "./audio-player.component.html",
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {
  currentDuration = '';
  segundo = 0;

  constructor(private routerExtensions: RouterExtensions, private actRoute: ActivatedRoute,
              public audioService: AudioService) {
    Theme.setMode(Theme.Light);

  }

  ngOnInit(): void {
    this.audioService.playEvent.subscribe(value => {

    });
    setInterval(() => {
      const durat: number = this.audioService._player.currentTime / 60000;
      this.currentDuration = `${Math.floor(durat)}:${Math.floor((durat % 1) * 60) < 9 ? '0' + Math.floor((durat % 1) * 60) : Math.floor((durat % 1) * 60)}`
      this.segundo = this.audioService._player.currentTime / 1000;
    }, 1000);
  }

  get duration(): string {

    const durat: number = this.audioService._player.duration / 60000;
    return `${Math.floor(durat)}:${Math.floor((durat % 1) * 60) < 9 ? '0' + Math.floor((durat % 1) * 60) : Math.floor((durat % 1) * 60)}`
  }

  get segundos() {
    return this.audioService._player.duration / 1000;
  }

  onSliderValueChange(args) {
    const slider = <Slider>args.object;
    if (this.segundo != slider.value) {
      this.audioService._player.seekTo(slider.value * 1000);
    }

  }

}
